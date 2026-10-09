export function FormActionsRow({
  remember,
  onRememberChange,
}: {
  remember?: boolean
  onRememberChange?: (value: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted">
        <input
          type="checkbox"
          checked={remember}
          onChange={(e) => onRememberChange?.(e.target.checked)}
          className="h-4 w-4 rounded border-cardBorder bg-bgRight accent-primary"
        />
        Lembrar de mim
      </label>
      <a href="#" className="text-sm text-accent hover:underline">
        Esqueceu sua senha?
      </a>
    </div>
  )
}
