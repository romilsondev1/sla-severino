import { useState } from 'react'
import { Eye, EyeOff, type LucideIcon } from 'lucide-react'

interface InputFieldProps {
  id: string
  label: string
  placeholder: string
  type?: 'text' | 'password'
  icon: LucideIcon
  value?: string
  onChange?: (value: string) => void
}

export function InputField({
  id,
  label,
  placeholder,
  type = 'text',
  icon: Icon,
  value,
  onChange,
}: InputFieldProps) {
  const [visible, setVisible] = useState(false)
  const isPassword = type === 'password'

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm text-muted">
        {label}
      </label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
        <input
          id={id}
          type={isPassword && visible ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full rounded-lg border border-cardBorder bg-bgRight/60 py-3 pl-12 pr-12 text-sm text-white placeholder:text-muted/70 outline-none transition-colors focus:border-primary"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-white"
            aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
          >
            {visible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        )}
      </div>
    </div>
  )
}
