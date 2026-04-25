import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface LearnState {
  completedLessons: string[]
  quizScores: Record<string, number>
  lastVisited: string | null
  lastStudyDate: string | null
  streak: number
  xp: number
  markLessonCompleted: (lessonId: string, quizScore: number) => void
  isLessonCompleted: (lessonId: string) => boolean
  getModuleProgress: (moduleId: string, totalLessons: number) => number
  setLastVisited: (lessonId: string) => void
  reset: () => void
}

export const useLearnStore = create<LearnState>()(
  persist(
    (set, get) => ({
      completedLessons: [],
      quizScores: {},
      lastVisited: null,
      lastStudyDate: null,
      streak: 0,
      xp: 0,
      markLessonCompleted: (lessonId, quizScore) => set(state => {
        if (state.completedLessons.includes(lessonId)) {
          return { quizScores: { ...state.quizScores, [lessonId]: Math.max(state.quizScores[lessonId] || 0, quizScore) } }
        }
        const today = new Date().toISOString().slice(0, 10)
        const yesterday = new Date(Date.now() - 86_400_000).toISOString().slice(0, 10)
        const newStreak = state.lastStudyDate === today
          ? state.streak
          : state.lastStudyDate === yesterday ? state.streak + 1 : 1
        return {
          completedLessons: [...state.completedLessons, lessonId],
          quizScores: { ...state.quizScores, [lessonId]: quizScore },
          lastStudyDate: today,
          streak: newStreak,
          xp: state.xp + (quizScore >= 75 ? 100 : 50),
        }
      }),
      isLessonCompleted: (lessonId) => get().completedLessons.includes(lessonId),
      getModuleProgress: (moduleId, totalLessons) => {
        const done = get().completedLessons.filter(id => id.startsWith(`${moduleId}-`)).length
        return totalLessons === 0 ? 0 : Math.round((done / totalLessons) * 100)
      },
      setLastVisited: (lessonId) => set({ lastVisited: lessonId }),
      reset: () => set({ completedLessons: [], quizScores: {}, lastVisited: null, lastStudyDate: null, streak: 0, xp: 0 }),
    }),
    { name: 'eldorado_learn_progress_v1' }
  )
)
