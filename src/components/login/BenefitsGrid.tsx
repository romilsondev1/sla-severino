import { Zap, ShieldCheck, Users } from 'lucide-react'

const benefits = [
  { icon: Zap, title: 'Mais agilidade', subtitle: 'no atendimento' },
  { icon: ShieldCheck, title: 'Mais controle', subtitle: 'nos processos' },
  { icon: Users, title: 'Mais eficiência', subtitle: 'para sua equipe' },
]

export function BenefitsGrid() {
  return (
    <div className="flex divide-x divide-white/10">
      {benefits.map(({ icon: Icon, title, subtitle }) => (
        <div key={title} className="flex-1 px-6 first:pl-0">
          <Icon className="mb-4 h-8 w-8 text-accent" strokeWidth={1.5} />
          <p className="text-sm font-semibold text-white">{title}</p>
          <p className="text-sm text-muted">{subtitle}</p>
        </div>
      ))}
    </div>
  )
}
