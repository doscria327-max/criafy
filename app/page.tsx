import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* NAV */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black">
            Cria<span className="gradient-text">fy</span>
          </Link>
          <div className="hidden md:flex gap-8 text-sm font-medium text-neutral-700">
            <a href="#recursos" className="hover:text-brand-600">O que faz</a>
            <a href="#como-funciona" className="hover:text-brand-600">Como funciona</a>
            <a href="#planos" className="hover:text-brand-600">Planos</a>
            <a href="#faq" className="hover:text-brand-600">FAQ</a>
          </div>
          <Link
            href="/dashboard"
            className="bg-black text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-neutral-800 transition"
          >
            Começar agora
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden gradient-bg">
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-24 text-center">
          <div className="inline-flex items-center gap-2 bg-white border border-neutral-200 rounded-full px-4 py-1.5 text-xs font-semibold text-neutral-700 mb-8">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            IA em ação · gerando produtos agora
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] mb-6">
            Da ideia à venda<br />
            <span className="gradient-text">em minutos.</span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto mb-10">
            A IA cria seu produto digital, encontra seu público, escreve suas
            ofertas e publica sua página de vendas. Você só divulga e vende.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="bg-black text-white px-8 py-4 rounded-full text-base font-semibold hover:bg-neutral-800 transition"
            >
              Criar meu primeiro produto grátis
            </Link>
            <a
              href="#como-funciona"
              className="border border-neutral-300 px-8 py-4 rounded-full text-base font-semibold hover:bg-neutral-50 transition"
            >
              Ver como funciona
            </a>
          </div>
          <p className="text-xs text-neutral-500 mt-6">
            Sem cartão · Sem enrolação · Comece em 60 segundos
          </p>
        </div>
      </section>

      {/* FEATURES */}
      <section id="recursos" className="py-24 border-t border-neutral-100">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">
              O que o Criafy faz por você
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Tudo que trava iniciante,<br />a IA resolve.
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-8 rounded-3xl border border-neutral-200 bg-white hover:shadow-xl hover:-translate-y-1 transition"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center text-2xl mb-5">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{f.title}</h3>
                <p className="text-neutral-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section id="como-funciona" className="py-24 bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-brand-400 uppercase tracking-widest mb-3">
              Como funciona
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              4 passos. Zero enrolação.
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative">
                <div className="text-6xl font-black text-brand-500/30 mb-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-lg font-bold mb-2">{s.title}</h3>
                <p className="text-neutral-400 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link
              href="/dashboard"
              className="inline-block bg-white text-black px-8 py-4 rounded-full text-base font-semibold hover:bg-neutral-100 transition"
            >
              Testar agora →
            </Link>
          </div>
        </div>
      </section>

      {/* PLANOS */}
      <section id="planos" className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-brand-600 uppercase tracking-widest mb-3">
              Planos
            </p>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight">
              Comece grátis. Escale quando quiser.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`p-8 rounded-3xl ${
                  p.featured
                    ? "bg-black text-white border-2 border-brand-500 scale-105 shadow-2xl"
                    : "bg-white border border-neutral-200"
                }`}
              >
                {p.featured && (
                  <span className="inline-block bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                    MAIS ESCOLHIDO
                  </span>
                )}
                <h3 className="text-2xl font-black mb-1">{p.name}</h3>
                <p className={`text-sm mb-6 ${p.featured ? "text-neutral-400" : "text-neutral-600"}`}>
                  {p.tagline}
                </p>
                <div className="mb-6">
                  <span className="text-5xl font-black">{p.price}</span>
                  {p.per && (
                    <span className={`text-sm ${p.featured ? "text-neutral-400" : "text-neutral-500"}`}>
                      {" "}{p.per}
                    </span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2 text-sm">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/dashboard"
                  className={`block text-center py-3 rounded-full font-semibold transition ${
                    p.featured
                      ? "bg-white text-black hover:bg-neutral-100"
                      : "bg-black text-white hover:bg-neutral-800"
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-center mb-12">
            Perguntas frequentes
          </h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group bg-white rounded-2xl border border-neutral-200 p-6 cursor-pointer"
              >
                <summary className="flex justify-between items-center font-bold text-lg list-none">
                  {f.q}
                  <span className="text-brand-600 group-open:rotate-45 transition text-2xl">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-neutral-600">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            Sua primeira venda<br />
            <span className="gradient-text">está a 1 clique.</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-10">
            Crie seu produto agora, sem cartão, sem risco.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-neutral-100 transition"
          >
            Começar grátis →
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-neutral-900 bg-black text-neutral-500 text-sm text-center">
        <p>© {new Date().getFullYear()} Criafy · Feito com IA para quem quer resultado.</p>
      </footer>
    </main>
  );
}

const features = [
  {
    icon: "🎯",
    title: "Criar Produto",
    desc: "A IA cria o produto pronto — nome, promessa, estrutura e módulos. Você recebe um infoproduto validado em segundos.",
  },
  {
    icon: "👥",
    title: "Achar Grupos",
    desc: "A IA mapeia comunidades onde seu público está — Telegram, Facebook, Discord, fóruns — sem risco de ban.",
  },
  {
    icon: "✍️",
    title: "Montar Oferta",
    desc: "10 variações de copy prontas para postar, com hooks, dores, gatilhos e link incluso. É só copiar e colar.",
  },
  {
    icon: "🚀",
    title: "Página de Vendas",
    desc: "Página profissional gerada e publicada automaticamente para cada produto — pronta para converter.",
  },
];

const steps = [
  { title: "Escolha o nicho", desc: "Diga o nicho e o público. A IA cuida do resto." },
  { title: "IA cria tudo", desc: "Produto, estrutura, oferta e copy promocional prontos." },
  { title: "Página no ar", desc: "Sua página de vendas é publicada automaticamente." },
  { title: "Divulgue e venda", desc: "Poste nos grupos certos e registre as vendas." },
];

const plans = [
  {
    name: "Grátis",
    tagline: "Pra testar antes de investir.",
    price: "R$ 0",
    per: "para sempre",
    features: [
      "1 produto por mês",
      "5 grupos sugeridos",
      "3 copies prontas",
      "Página de vendas básica",
    ],
    cta: "Começar grátis",
    featured: false,
  },
  {
    name: "Pro",
    tagline: "Pra quem quer resultado sério.",
    price: "R$ 47",
    per: "/ mês",
    features: [
      "Produtos ilimitados",
      "50+ grupos por produto",
      "10 copies por produto",
      "Páginas com domínio custom",
      "Analytics completo",
      "Suporte prioritário",
    ],
    cta: "Assinar Pro",
    featured: true,
  },
  {
    name: "Agência",
    tagline: "Pra quem vende pros outros.",
    price: "R$ 197",
    per: "/ mês",
    features: [
      "Tudo do Pro",
      "10 subcontas de cliente",
      "White label",
      "API de integração",
      "Onboarding 1:1",
    ],
    cta: "Falar com vendas",
    featured: false,
  },
];

const faqs = [
  {
    q: "Preciso saber programar ou fazer design?",
    a: "Não. O Criafy é 100% no-code. Você responde algumas perguntas e a IA entrega tudo pronto — produto, copy e página.",
  },
  {
    q: "As páginas de vendas ficam onde?",
    a: "Cada produto ganha uma URL única no seu domínio Criafy (ex: criafy.app/produto/seu-produto). No plano Pro, você conecta seu próprio domínio.",
  },
  {
    q: "A IA garante que vou vender?",
    a: "Nenhuma ferramenta garante venda — quem vende é o mercado. O Criafy remove o trabalho técnico e te entrega ativos profissionais em minutos, aumentando muito suas chances.",
  },
  {
    q: "Posso cancelar quando quiser?",
    a: "Pode. Sem multa, sem letra miúda. Cancela e para de cobrar no ciclo seguinte.",
  },
  {
    q: "Como o Criafy encontra os grupos?",
    a: "A IA analisa seu nicho, público e produto para sugerir comunidades ativas — priorizando lugares onde postar link não gera ban.",
  },
];
