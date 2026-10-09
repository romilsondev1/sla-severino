# Especificação Técnica: Tela de Login - SLA Severino

## 1. Visão Geral Visual
- **Referência:** Imagem salva em `design/page-login/page-login.png`
- **Layout Geral (Desktop):** Layout dividido em duas colunas simétricas (50vw / 50vw).
  - **Coluna Esquerda (Institucional):** Fundo azul escuro com uma imagem de um condomínio estilizada em overlay azul, contendo o logotipo "SEVERINO", título principal com destaque colorido, texto de suporte, uma grade de 3 benefícios com ícones e um rodapé institucional discreto.
  - **Coluna Direita (Formulário):** Fundo azul marinho sólido e muito escuro. Centralizado na tela, há um card de login com bordas arredondadas e contorno sutil, contendo o formulário de autenticação. No canto inferior direito da tela, há um indicador de "Sistema online".

## 2. Design Tokens (Paleta de Cores e Tipografia)
- **Cres de Fundo (Backgrounds):**
  - Coluna Esquerda: Gradiente/Overlay Azul Escuro (`#03102C` a `#0A225C` aproximado) sobre imagem de arquitetura.
  - Coluna Direita (Fundo Geral): Azul quase preto (`#02091D`).
  - Card de Login: Azul escuro translúcido ou sólido (`#071533`) com borda sutil (`#102A6B`).
- **Cores de Destaque e Elementos:**
  - Azul Claro (Destaque de texto e links): `#38BDF8` (ou similar cyan/sky blue).
  - Botão Primário (Entrar): Azul Royal Vibrante (`#2563EB` ou `#3B82F6`).
  - Texto Principal: Branco (`#FFFFFF`).
  - Texto de Suporte / Placeholders / Labels: Azul acinzentado/opaco (`#94A3B8`).
  - Indicador Online: Verde Neon/Esmeralda (`#10B981`).
- **Tipografia:** Fonte moderna sem serifa (Sans-serif, ex: *Inter* ou *Roboto*).
- **Espaçamentos e Bordas:**
  - Margens e Paddings internos baseados em múltiplos de 8px (ex: padding do card de 40px).
  - Raio da Borda (Border Radius): 12px (`rounded-xl`) para o Card Principal e 8px (`rounded-lg`) para Inputs e Botões.

## 3. Desconstrução de Componentes (UI Components)

### Coluna Esquerda
- `BrandLogo`: Alinhado no topo esquerdo. Exibe o ícone quadrado amarelo/azul e o texto estilizado "SEVERINO SOLUÇÕES CONDOMINIAIS".
- `HeroText`: Título principal grande. O trecho "conecta pessoas," deve ter a cor azul claro de destaque.
- `BenefitsGrid`: Uma linha contendo 3 blocos horizontais compostos por:
  1. Ícone de Raio + Texto ("Mais agilidade no atendimento")
  2. Ícone de Escudo + Texto ("Mais controle nos processos")
  3. Ícone de Usuários + Texto ("Mais eficiência para sua equipe")
- `FooterBrand`: Texto discreto no canto inferior esquerdo com uma barra vertical azul claro à esquerda: "SLA Severino | Gestão de chamados e suporte".

### Coluna Direita (Card de Login)
- `LoginCard`: Caixa centralizada com bordas arredondadas e padding generoso.
- `TypographyHeader`: Título "Bem-vindo ao" em branco e "SLA Severino" em azul claro destacado. Abaixo, subtítulo explicativo menor.
- `InputField (E-mail ou usuário)`: Label superior, ícone de usuário (`UserIcon`) integrado dentro do lado esquerdo do input, placeholder cinza. Borda azul escura.
- `InputField (Senha)`: Label superior, ícone de cadeado (`LockIcon`) à esquerda, placeholder e um ícone de olho (`EyeIcon` / ocultar/mostrar senha) na extremidade direita do input.
- `FormActionsRow`: Linha com alinhamento flexbox horizontal contendo:
  - Lado esquerdo: Checkbox estilizado + Label "Lembrar de mim"
  - Lado direito: Link utilitário "Esqueceu sua senha?" em azul claro.
- `ButtonPrimary`: Botão azul preenchido com o texto "Entrar" acompanhado de uma seta para a direita (`ArrowRightIcon`). Deve ter efeito hover de brilho/opacidade.
- `DividerOr`: Linha horizontal sutil com o texto "ou" centralizado para separar os métodos de login.
- `ButtonSecondary (Google)`: Botão com fundo transparente, borda sutil, ícone oficial do Google centralizado e o texto "Entrar com Google".
- `FooterText`: Texto de suporte centralizado abaixo do card: "Não tem uma conta? Fale com o administrador".

## 4. Comportamento, Responsividade e Regras (UX)
- **Responsividade (Mobile First / Breakpoints):**
  - Em telas menores que `1024px` (Tablets e Celulares), a **Coluna Esquerda (Institucional) deve ser ocultada (`display: none`)**.
  - A **Coluna Direita (Formulário)** passa a ocupar 100% da largura e altura da tela, centralizando o card de login vertical e horizontalmente para melhor usabilidade em smartphones.
- **Estados dos Inputs:** Ao focar (`:focus`) nos campos de input, a borda deve mudar para o azul real vibrante do botão principal.
