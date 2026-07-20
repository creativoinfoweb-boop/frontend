import { NextRequest, NextResponse } from 'next/server'
import { readFile } from 'fs/promises'
import path from 'path'

/**
 * Download ebook riservato — solo abbonamento attivo o trial.
 * La route Next ha precedenza sul rewrite /api → backend, quindi viene
 * servita qui: verifica lo stato abbonamento sul backend col JWT dell'utente
 * e solo allora consegna il file (che NON sta in /public).
 */

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const FILES: Record<string, { name: string; mime: string }> = {
  'crt-secrets-it.pdf': { name: 'CRT_Secrets_IT.pdf', mime: 'application/pdf' },
  'crt-secrets-en.pdf': { name: 'CRT_Secrets_EN.pdf', mime: 'application/pdf' },
  'crt-secrets-it.epub': { name: 'CRT_Secrets_IT.epub', mime: 'application/epub+zip' },
  'crt-secrets-en.epub': { name: 'CRT_Secrets_EN.epub', mime: 'application/epub+zip' },
}

export async function GET(req: NextRequest) {
  const entry = FILES[req.nextUrl.searchParams.get('file') ?? '']
  if (!entry) {
    return NextResponse.json({ detail: 'Not found' }, { status: 404 })
  }

  const auth = req.headers.get('authorization')
  if (!auth?.startsWith('Bearer ')) {
    return NextResponse.json({ detail: 'Non autenticato' }, { status: 401 })
  }

  try {
    const statusRes = await fetch(`${BACKEND_URL}/subscriptions/status`, {
      headers: { Authorization: auth },
      cache: 'no-store',
    })
    if (!statusRes.ok) {
      return NextResponse.json({ detail: 'Non autenticato' }, { status: 401 })
    }
    const sub = (await statusRes.json()) as { status?: string }
    const hasActive = sub.status === 'active' || sub.status === 'trialing'
    if (!hasActive) {
      return NextResponse.json(
        { detail: 'L\'eBook è riservato agli utenti con un piano attivo.' },
        { status: 403 },
      )
    }
  } catch {
    return NextResponse.json({ detail: 'Verifica abbonamento non riuscita' }, { status: 502 })
  }

  try {
    const buf = await readFile(path.join(process.cwd(), 'private', 'ebook', entry.name))
    return new NextResponse(new Uint8Array(buf), {
      headers: {
        'Content-Type': entry.mime,
        'Content-Disposition': `attachment; filename="${entry.name}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch {
    return NextResponse.json({ detail: 'File non disponibile' }, { status: 500 })
  }
}
