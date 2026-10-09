import { ArrowRight } from 'lucide-react'

export function ButtonPrimary() {
  return (
    <button
      type="submit"
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition-opacity hover:opacity-90"
    >
      <ArrowRight className="h-5 w-5" />
      Entrar
    </button>
  )
}
