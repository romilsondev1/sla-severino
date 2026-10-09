import { BrandLogo } from '../components/login/BrandLogo'
import { HeroText } from '../components/login/HeroText'
import { BenefitsGrid } from '../components/login/BenefitsGrid'
import { FooterBrand } from '../components/login/FooterBrand'
import { LoginCard } from '../components/login/LoginCard'
import { OnlineIndicator } from '../components/login/OnlineIndicator'

export function LoginPage() {
  return (
    <div className="flex min-h-screen">
      {/* Coluna esquerda (institucional) */}
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-[#03102C] to-[#0A225C] p-16 lg:flex">
        <BrandLogo />
        <HeroText />
        <BenefitsGrid />
        <FooterBrand />
      </div>

      {/* Coluna direita (formulário) */}
      <div className="relative flex w-full items-center justify-center bg-bgRight p-6 lg:w-1/2">
        <LoginCard />
        <OnlineIndicator />
      </div>
    </div>
  )
}
