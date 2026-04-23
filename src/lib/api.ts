import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios'
import { useAuthStore } from '@/store/auth'

/** Human-readable message from FastAPI (`detail` string, 422 array, or network error). */
export function getApiErrorMessage(err: unknown, fallback: string): string {
  const e = err as AxiosError<{ detail?: unknown }>
  if (!e.response) {
    return e.code === 'ECONNABORTED'
      ? 'Timeout: il server non risponde.'
      : 'Connessione al server non riuscita. Verifica che il backend sia avviato.'
  }
  const d = e.response.data?.detail
  if (d == null || d === '') return fallback
  if (typeof d === 'string') return d
  if (Array.isArray(d)) {
    const parts = d.map((x: unknown) => {
      if (typeof x === 'object' && x !== null && 'msg' in x) {
        return String((x as { msg: string }).msg)
      }
      return String(x)
    })
    const s = parts.filter(Boolean).join(' ')
    return s || fallback
  }
  return fallback
}
import type {
  User,
  AuthTokens,
  ApiKey,
  ApiKeyWithSecret,
  Subscription,
  SubscriptionStatus,
  CouponValidation,
  PublicPerformance,
  UserStats,
  PendingSignal,
  AdminStats,
  SignalHistoryItem,
  AdminSignal,
} from '@/types'

// In production (Vercel HTTPS), use Next.js proxy /api to avoid mixed content blocks.
// In development (localhost), call backend directly.
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const BASE_URL = typeof window !== 'undefined' && window.location.protocol === 'https:'
  ? '/api'
  : API_URL

/**
 * JWT per il backend: prima `auth_token`, poi stato persistito Zustand (`auth-storage`),
 * infine memoria store — e riallinea localStorage così non si perde l'header dopo refresh/hydration.
 */
function resolveAuthToken(): string | null {
  if (typeof window === 'undefined') return null
  const direct = localStorage.getItem('auth_token')
  if (direct) return direct

  try {
    const raw = localStorage.getItem('auth-storage')
    if (raw) {
      const parsed = JSON.parse(raw) as { state?: { token?: string | null } }
      const zt = parsed?.state?.token
      if (typeof zt === 'string' && zt.length > 0) {
        localStorage.setItem('auth_token', zt)
        return zt
      }
    }
  } catch {
    /* ignore malformed persist */
  }

  const mem = useAuthStore.getState().token
  if (typeof mem === 'string' && mem.length > 0) {
    localStorage.setItem('auth_token', mem)
    return mem
  }
  return null
}

/** Pulisce tutti i token e reindirizza al login. */
function _forceLogout() {
  if (typeof window === 'undefined') return
  localStorage.removeItem('auth_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('auth-storage')
  // Pulizia store Zustand
  try { useAuthStore.getState().logout() } catch { /* ignore */ }
  // Reindirizza alla landing page (non al login — evita loop)
  if (!window.location.pathname.startsWith('/auth')) {
    window.location.href = '/'
  }
}

const instance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor per aggiungere il token (mai su login/register/refresh: evita JWT scaduto che confonde le richieste)
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const url = `${config.baseURL ?? ''}${config.url ?? ''}`
    const isPublicAuth =
      url.includes('/auth/login') ||
      url.includes('/auth/register') ||
      url.includes('/auth/refresh')

    if (isPublicAuth) {
      delete config.headers.Authorization
      return config
    }

    const token = resolveAuthToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  }
)

// Response interceptor per gestire errori 401
instance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean
    }

    const reqUrl = `${originalRequest.baseURL ?? ''}${originalRequest.url ?? ''}`
    const skipRefresh =
      reqUrl.includes('/auth/login') ||
      reqUrl.includes('/auth/register') ||
      reqUrl.includes('/auth/refresh')

    if (error.response?.status === 401 && !originalRequest._retry && !skipRefresh) {
      originalRequest._retry = true

      try {
        const refreshToken = localStorage.getItem('refresh_token')

        if (!refreshToken) {
          _forceLogout()
          return Promise.reject(error)
        }

        const response = await axios.post(`${BASE_URL}/auth/refresh`, {
          refresh_token: refreshToken,
        })

        const { access_token, refresh_token } = response.data as AuthTokens

        localStorage.setItem('auth_token', access_token)
        if (refresh_token) {
          localStorage.setItem('refresh_token', refresh_token)
        }
        originalRequest.headers.Authorization = `Bearer ${access_token}`

        return instance(originalRequest)
      } catch (err) {
        _forceLogout()
        return Promise.reject(err)
      }
    }

    return Promise.reject(error)
  }
)

// ─────────────────────────────────────────────────────────────────────────
// Auth API
// ─────────────────────────────────────────────────────────────────────────

export const authApi = {
  register: (email: string, password: string, full_name: string) =>
    instance.post<User>('/auth/register', { email, password, full_name }),

  login: (email: string, password: string) =>
    instance.post<AuthTokens>('/auth/login', { email, password }),

  refresh: (refresh_token: string) =>
    instance.post<AuthTokens>('/auth/refresh', { refresh_token }),

  logout: () => instance.post('/auth/logout', {}),

  me: () => instance.get<User>('/auth/me'),
}

// ─────────────────────────────────────────────────────────────────────────
// API Keys
// ─────────────────────────────────────────────────────────────────────────

export const apiKeysApi = {
  create: (label?: string) =>
    instance.post<ApiKeyWithSecret>('/api-keys/', { label }),

  list: () =>
    instance.get<{ keys: ApiKey[]; total: number }>('/api-keys/'),

  revoke: (key_id: string) =>
    instance.delete(`/api-keys/${key_id}`),
}

// ─────────────────────────────────────────────────────────────────────────
// Subscriptions
// ─────────────────────────────────────────────────────────────────────────

export const subscriptionsApi = {
  startTrial: () =>
    instance.post<SubscriptionStatus>('/subscriptions/trial/start', {}),

  getStatus: () =>
    instance.get<SubscriptionStatus>('/subscriptions/status'),

  activate: (stripe_subscription_id: string, coupon_code?: string) =>
    instance.post<Subscription>('/subscriptions/activate', {
      stripe_subscription_id,
      coupon_code,
    }),

  cancel: () =>
    instance.post('/subscriptions/cancel', {}),

  validateCoupon: (code: string) =>
    instance.post<CouponValidation>('/subscriptions/coupon/validate', { code }),

  redeemCoupon: (code: string) =>
    instance.post<{ message: string; subscription: SubscriptionStatus }>('/subscriptions/redeem', { code }),

  createCheckoutSession: (billing_plan: 'monthly' | 'yearly') =>
    instance.post<{ url: string; session_id: string; billing_plan: string }>(
      '/subscriptions/checkout/session',
      { billing_plan }
    ),

  verifyCheckout: (session_id: string) =>
    instance.post<{ activated: boolean; plan?: string; stripe_status?: string; reason?: string }>(
      '/subscriptions/checkout/verify',
      { session_id }
    ),
}

// ─────────────────────────────────────────────────────────────────────────
// Signals (Copy Trading)
// ─────────────────────────────────────────────────────────────────────────

export const signalsApi = {
  // For Client EA (X-API-Key auth)
  getPendingSignals: () =>
    instance.get<PendingSignal[]>('/signals/pending'),

  ackSignal: (execution_id: string, status: 'EXECUTED' | 'FAILED', error_msg?: string) =>
    instance.post('/signals/ack', { execution_id, status, error_msg }),

  // For web dashboard (JWT auth) — shows currently OPEN master signals
  getLiveSignals: () =>
    instance.get<any[]>('/signals/my/live'),

  // User execution history
  getHistory: (status_filter?: string, limit = 100, offset = 0) =>
    instance.get<{ history: SignalHistoryItem[]; total: number }>(
      '/signals/my/history',
      { params: { status_filter, limit, offset } }
    ),

  // User equity curve (cumulative pips from executed+closed signals)
  getEquityCurve: () =>
    instance.get<Array<{
      date: string
      cumulative_pips: number
      pips: number
      direction: string
      symbol: string
    }>>('/signals/my/equity-curve'),
}

// ─────────────────────────────────────────────────────────────────────────
// Stats
// ─────────────────────────────────────────────────────────────────────────

export const statsApi = {
  getMasterPerformance: () =>
    instance.get<PublicPerformance>('/stats/master'),

  getUserStats: () =>
    instance.get<UserStats>('/stats/user/me'),
}

// ─────────────────────────────────────────────────────────────────────────
// Admin
// ─────────────────────────────────────────────────────────────────────────

export const adminApi = {
  getStats: () =>
    instance.get<AdminStats>('/admin/stats'),

  listUsers: () =>
    instance.get('/admin/users'),

  createCoupon: (payload: any) =>
    instance.post('/admin/coupons', payload),

  listCoupons: () =>
    instance.get('/admin/coupons'),

  deleteCoupon: (coupon_id: string) =>
    instance.delete(`/admin/coupons/${coupon_id}`),

  listSignals: () =>
    instance.get<{ signals: AdminSignal[]; total: number }>('/admin/signals'),
}

// ─────────────────────────────────────────────────────────────────────────
// Market data
// ─────────────────────────────────────────────────────────────────────────

export const marketApi = {
  getGoldPrice: () =>
    instance.get<{
      symbol: string
      price: number | null
      prev_close: number
      change: number
      change_pct: number
      change_str: string
      up: boolean
      currency: string
      stale?: boolean
      error?: string
    }>('/market/gold-price'),
}

// ─────────────────────────────────────────────────────────────────────────
// Affiliates Program
// ─────────────────────────────────────────────────────────────────────────

export const affiliatesApi = {
  getDashboard: () =>
    instance.get<any>('/affiliates/me'),

  getCommissions: (page = 1, page_size = 50) =>
    instance.get<any>('/affiliates/me/commissions', { params: { page, page_size } }),

  requestPayout: () =>
    instance.post<any>('/affiliates/me/payout-request', {}),

  activateCreatorDiscount: () =>
    instance.post<any>('/affiliates/me/activate-creator-discount', {}),

  validateCode: (code: string) =>
    instance.get<any>(`/affiliates/validate/${code}`),

  registerReferral: (referral_code: string) =>
    instance.post<any>('/affiliates/referrals/register', { referral_code }),

  // Admin endpoints
  addAffiliate: (email: string) =>
    instance.post<any>('/affiliates/admin/add', { email }),

  listAffiliates: () =>
    instance.get<any>('/affiliates/admin/list'),

  getAffiliateDetail: (affiliate_id: string) =>
    instance.get<any>(`/affiliates/admin/${affiliate_id}`),

  toggleAffiliate: (affiliate_id: string, is_active: boolean) =>
    instance.patch<any>(`/affiliates/admin/${affiliate_id}/toggle`, { is_active }),

  listPayouts: () =>
    instance.get<any>('/affiliates/admin/payouts'),

  processPayout: (payout_id: string, status: 'paid' | 'rejected', notes?: string, payment_reference?: string) =>
    instance.patch<any>(`/affiliates/admin/payouts/${payout_id}/process`, {
      status,
      notes,
      payment_reference,
    }),

  listApplications: (status?: string) =>
    instance.get<any>('/affiliates/admin/applications', { params: status ? { status } : {} }),

  updateApplication: (application_id: string, status: 'approved' | 'rejected' | 'pending') =>
    instance.patch<any>(`/affiliates/admin/applications/${application_id}`, { status }),

  deleteAffiliate: (affiliate_id: string) =>
    instance.delete<any>(`/affiliates/admin/${affiliate_id}`),
}

export const api = instance
export default instance
