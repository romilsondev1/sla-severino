import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, User } from 'lucide-react'
import { TypographyHeader } from './TypographyHeader'
import { InputField } from './InputField'
import { FormActionsRow } from './FormActionsRow'
import { ButtonPrimary } from './ButtonPrimary'
import { DividerOr } from './DividerOr'
import { ButtonSecondaryGoogle } from './ButtonSecondaryGoogle'
import { FooterText } from './FooterText'
import { useAuth } from '@/hooks/useAuth'
import { ROLE_HOME } from '@/lib/permissions'
import type { Role } from '@/types/auth'

export function LoginCard() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [pendingRedirect, setPendingRedirect] = useState(false)

  useEffect(() => {
    if (pendingRedirect && user) {
      navigate(ROLE_HOME[user.role as Exclude<Role, 'admin'>], { replace: true })
    }
  }, [pendingRedirect, user, navigate])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    try {
      await login({ identifier, password, remember, provider: 'local' })
      setPendingRedirect(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar')
    }
  }

  async function handleGoogle() {
    setError(null)
    try {
      await login({ identifier: '', password: '', remember, provider: 'google' })
      setPendingRedirect(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao entrar')
    }
  }

  return (
    <div className="w-full max-w-md rounded-xl border border-cardBorder bg-card p-10">
      <TypographyHeader />
      <form onSubmit={handleSubmit} className="mt-8 space-y-5">
        <InputField
          id="email"
          label="E-mail ou usuário"
          placeholder="Digite seu e-mail ou usuário"
          icon={User}
          value={identifier}
          onChange={setIdentifier}
        />
        <InputField
          id="password"
          label="Senha"
          placeholder="Digite sua senha"
          type="password"
          icon={Lock}
          value={password}
          onChange={setPassword}
        />
        <FormActionsRow remember={remember} onRememberChange={setRemember} />
        {error && <p className="text-sm text-red-400">{error}</p>}
        <ButtonPrimary />
        <DividerOr />
        <ButtonSecondaryGoogle onClick={handleGoogle} />
      </form>
      <div className="mt-8">
        <FooterText />
      </div>
    </div>
  )
}
