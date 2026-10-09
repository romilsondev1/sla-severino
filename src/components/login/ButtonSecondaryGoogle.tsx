function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M23.5 12.27c0-.85-.08-1.66-.22-2.45H12v4.64h6.45c-.27 1.47-1.02 2.71-2.17 3.55l3.87 3c2.27-2.09 3.35-5.17 3.35-8.74Z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.96-1.07 7.95-2.92l-3.87-3c-1.08.72-2.45 1.15-4.08 1.15-3.14 0-5.8-2.12-6.75-4.97H1.25v3.1A12 12 0 0 0 12 24Z"
      />
      <path
        fill="#FBBC05"
        d="M5.25 14.26A7.2 7.2 0 0 1 4.87 12c0-.79.14-1.55.38-2.26v-3.1H1.25a12 12 0 0 0 0 10.72l4-3.1Z"
      />
      <path
        fill="#EA4335"
        d="M12 4.77c1.76 0 3.34.61 4.59 1.8l3.44-3.44A11.97 11.97 0 0 0 12 0 12 12 0 0 0 1.25 6.64l4 3.1C6.2 6.89 8.86 4.77 12 4.77Z"
      />
    </svg>
  )
}

export function ButtonSecondaryGoogle({ onClick }: { onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-center gap-3 rounded-lg border border-cardBorder bg-transparent py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
    >
      <GoogleIcon />
      Entrar com Google
    </button>
  )
}
