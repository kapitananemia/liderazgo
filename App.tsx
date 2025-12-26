
import React, { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Video, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  MapPin, 
  Clock, 
  UserCircle2,
  Mic2,
  ArrowRight,
  ShieldCheck,
  Play,
  Award,
  ChevronRight,
  Sparkles,
  Zap,
  Star,
  Target,
  Trophy
} from 'lucide-react';

import { Teacher, PricingTier, FAQItem, WeeklyContent } from './types';

// Custom Logo Component based on the provided image
const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5ZM50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50C85 69.33 69.33 85 50 85Z" />
    <rect x="45" y="53" width="10" height="42" />
  </svg>
);

const SectionHeader = ({ title, subtitle, centered = true, light = false }: { title: string; subtitle?: string; centered?: boolean; light?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 tracking-tight ${light ? 'text-white' : 'text-gray-900'}`}>
      {title}
    </h2>
    {subtitle && <p className={`text-xl max-w-3xl ${centered ? 'mx-auto' : ''} ${light ? 'text-brand-100' : 'text-gray-600'}`}>{subtitle}</p>}
  </div>
);

const App: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const teachers: Teacher[] = [
    {
      name: "Mariana Ferrari",
      role: "Dirección del Programa",
      bio: "Estratega de comunicación de alto impacto. Ha mentorizado a cientos de líderes para encontrar su voz auténtica.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Antonio Rivas",
      role: "Persuasión y Lógica",
      bio: "Experto en dialéctica y manejo de objeciones. Te enseña a defender tus ideas ante las audiencias más críticas.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sofía Orozco",
      role: "Cuerpo y Voz",
      bio: "Coach de interpretación que traduce el lenguaje teatral al mundo corporativo. Tu cuerpo habla antes que tú.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Santiago Petschen",
      role: "Profundidad de Ideas",
      bio: "Filósofo de la acción. Ayuda a los líderes a dotar a sus mensajes de una profundidad que inspira movimientos.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const weeks: WeeklyContent[] = [
    { week: 1, title: "Idea-fuerza de liderazgo", description: "Una idea. Una tesis. Un cambio claro en el público." },
    { week: 2, title: "Estructura y argumento", description: "Orden, evidencias, ejemplos. 'No es inspiración: es lógica.'" },
    { week: 3, title: "Presencia, voz y apertura", description: "Entradas potentes, silencios, mirada, control de escena." },
    { week: 4, title: "Noche con público #1", description: "Teaser 3 min + feedback real. La primera prueba de fuego." },
    { week: 5, title: "Claridad de líder", description: "Frases de autoridad, síntesis, 'hablar para que ocurra'." },
    { week: 6, title: "Objeciones y Q&A", description: "Responder sin temblar. El liderazgo se demuestra en lo imprevisto." },
    { week: 7, title: "Grabación final (12–14 min)", description: "Producción de tu activo final con equipo técnico profesional." },
    { week: 8, title: "Showcase Final", description: "6 min por persona + cierre + networking con invitados." }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Founder",
      price: "690 €",
      reservation: "200 €",
      features: [
        "Solo para las primeras 5 plazas",
        "Programa completo 8 semanas",
        "Grabación charla final",
        "Acceso a la comunidad Founder",
        "IVA incluido"
      ]
    },
    {
      name: "Standard",
      price: "790 €",
      reservation: "250 €",
      recommended: true,
      features: [
        "Siguientes 10 plazas",
        "Programa completo 8 semanas",
        "Grabación charla final",
        "Showcase con público real",
        "IVA incluido"
      ]
    },
    {
      name: "Pro VIP",
      price: "990 €",
      reservation: "300 €",
      features: [
        "Todo lo del Standard",
        "2 Sesiones 1:1 (30 min)",
        "Revisión personalizada de guion",
        "Ensayo privado exclusivo",
        "IVA incluido"
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "¿Es un TED o TEDx oficial?",
      answer: "No. Es un programa de formación con formato 'estilo TED'. Si alguien quiere postularse a TEDx, le ayudamos a preparar el material cuando existan convocatorias."
    },
    {
      question: "¿Tengo que tener experiencia hablando?",
      answer: "No. Solo ganas de practicar y exponerte. El 40% de nuestros alumnos empieza con miedo escénico moderado."
    },
    {
      question: "¿Qué pasa si me da pánico el escenario?",
      answer: "Precisamente por eso existe el programa: exposición progresiva. Empezamos en grupos de 5 y terminamos ante público real."
    },
    {
      question: "¿Se graba con calidad?",
      answer: "Sí: el objetivo es que te lleves un activo profesional (4K, audio directo) para usar en tu marca personal."
    }
  ];

  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-brand-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-900">
            <Logo className="w-8 h-8" />
            <span className="font-extrabold text-xl tracking-tight hidden sm:block uppercase">
              LIDERAZGO <span className="font-light">EN ESCENA</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button onClick={() => scrollTo('temario')} className="hover:text-brand-900 transition-colors">Temario</button>
            <button onClick={() => scrollTo('equipo')} className="hover:text-brand-900 transition-colors">Equipo</button>
            <button onClick={() => scrollTo('precios')} className="hover:text-brand-900 transition-colors">Precios</button>
            <button 
              onClick={() => scrollTo('form')}
              className="px-6 py-2.5 bg-brand-900 text-white rounded-full hover:bg-brand-800 transition-all shadow-lg shadow-brand-200"
            >
              Aplicar plaza
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-spotlight">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-50 text-brand-900 font-bold text-xs uppercase tracking-widest border border-brand-100 shadow-sm">
                <span className="w-2 h-2 bg-brand-600 rounded-full mr-2 animate-pulse"></span>
                Cohorte Fundadora · 15 plazas
              </div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-amber-50 text-amber-900 font-bold text-xs uppercase tracking-widest border border-amber-100 shadow-sm">
                <Trophy className="w-3 h-3 mr-2" /> El club más numeroso de Madrid
              </div>
            </div>
            <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 leading-[1.1] mb-10 tracking-tight text-balance">
              Habla como un líder. <br/>
              <span className="text-brand-900">Con público real.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              No enseñamos oratoria; construimos <strong>autoridad</strong>. El único programa en Madrid para Managers y Founders basado en escenario físico y público invitado.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={() => scrollTo('form')}
                className="w-full sm:w-auto px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-2xl shadow-brand-200 flex items-center justify-center gap-3 group"
              >
                Solicitar entrevista <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('temario')}
                className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 border border-gray-200 rounded-2xl font-bold text-lg hover:border-brand-900 hover:text-brand-900 transition-all"
              >
                Ver programa semanas
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                { label: "Managers & Leads", sub: "Audiencia ejecutiva", icon: <UserCircle2 /> },
                { label: "Filtro de Admisión", sub: "Entrevista previa", icon: <Target /> },
                { label: "Vídeo Profesional", sub: "Activo de marca", icon: <Video /> }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center mb-4 border border-brand-100">
                    {item.icon}
                  </div>
                  <div className="font-bold text-gray-900">{item.label}</div>
                  <div className="text-gray-500 text-sm">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authority Bar */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            <div className="text-center group border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
              <div className="text-4xl font-black text-brand-400 tracking-tight">2.077</div>
              <div className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2 font-bold">Líderes en comunidad</div>
            </div>
            <div className="text-center group border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 px-4">
              <div className="text-2xl font-bold text-white tracking-tight leading-tight">Club #1 de Madrid</div>
              <div className="text-brand-400 text-xs uppercase tracking-[0.2em] mt-2 font-bold italic">En volumen y eventos</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-black text-brand-400 tracking-tight">8 Semanas</div>
              <div className="text-gray-400 text-xs uppercase tracking-[0.2em] mt-2 font-bold">Práctica intensiva</div>
            </div>
          </div>
        </div>
      </section>

      {/* Spiky POV Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-brand-50 rounded-full blur-3xl opacity-50"></div>
              <img src="https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&q=80&w=800" className="rounded-[2.5rem] shadow-2xl relative z-10" alt="Speaker on stage" />
              <div className="absolute -bottom-8 -right-8 glass p-8 rounded-3xl shadow-xl z-20 border border-brand-100 max-w-[240px]">
                <p className="text-gray-900 font-bold italic leading-tight">
                  "Aquí no vienes a aprender a hablar. Vienes a hablar."
                </p>
              </div>
            </div>
            <div>
              <span className="text-brand-900 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Nuestra filosofía</span>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight tracking-tight text-balance">
                Hoy no gana quien sabe más. Gana quien <span className="text-brand-900 underline decoration-brand-200 underline-offset-8">sostiene la presión.</span>
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                La mayoría de formaciones fallan porque son pura teoría. En el club más grande de Madrid, sabemos que la autoridad se construye ante un público real, no frente a un espejo.
              </p>
              <div className="space-y-4">
                {[
                  "Práctica presencial 100% física",
                  "Escenario desde la primera sesión",
                  "Filtro selectivo de perfiles"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                    <span className="font-semibold text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Difference */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader 
            title="La Diferencia del Club" 
            subtitle="Por qué somos la opción elegida por managers y perfiles técnicos con responsabilidad."
          />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Escenario Real", desc: "No simulamos. El micro y las luces son de verdad.", icon: <Mic2 /> },
              { title: "Público Invitado", desc: "En la semana 4 y 8 traemos extraños para evaluarte.", icon: <Users /> },
              { title: "Vídeo 4K", desc: "Grabación cinematográfica para tu marca personal.", icon: <Video /> },
              { title: "Feedback Brutal", desc: "Crítica constructiva de profesionales en activo.", icon: <Award /> },
            ].map((item, i) => (
              <div key={i} className="group bg-white p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-100 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes */}
      <section className="py-24 bg-brand-900 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5">
           <div className="absolute top-20 left-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
           <div className="absolute bottom-20 right-40 w-80 h-80 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-10 leading-tight">
                Al terminar, tu portafolio de líder incluye:
              </h2>
              <div className="space-y-6">
                {[
                  { t: "Charla Estilo TED", s: "12–14 minutos de contenido de alto impacto grabado." },
                  { t: "Teaser de 3 Minutos", s: "Perfecto para LinkedIn y presentaciones ejecutivas." },
                  { t: "Autoridad Comprobada", s: "Manejo experto de silencios, voz y mirada." },
                  { t: "Candidatura TEDx", s: "Material listo para aplicar a convocatorias oficiales." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors">
                    <CheckCircle2 className="w-6 h-6 text-brand-300 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="text-xl font-bold text-white">{item.t}</h4>
                      <p className="text-brand-100/70">{item.s}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white/10 group cursor-pointer">
                <img src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700" alt="Video demo" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white text-brand-900 rounded-full flex items-center justify-center shadow-xl group-hover:scale-110 transition-all">
                    <Play className="w-8 h-8 fill-current ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Audience High-Definition */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Este programa es para ti si..." subtitle="Diseñado exclusivamente para perfiles de responsabilidad." />
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="bg-brand-50 p-12 rounded-[3rem] border border-brand-100 shadow-sm">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-brand-900" />
                  Perfil Objetivo
                </h3>
                <ul className="space-y-6 text-lg">
                  <li className="flex gap-3">
                    <span className="text-brand-900 font-bold">•</span>
                    <p className="text-gray-700 font-semibold">Managers & Leads:</p>
                    <p className="text-gray-600">Buscas autoridad sin agresividad.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-900 font-bold">•</span>
                    <p className="text-gray-700 font-semibold">Founders:</p>
                    <p className="text-gray-600">Necesitas convencer a inversores y equipo.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-brand-900 font-bold">•</span>
                    <p className="text-gray-700 font-semibold">Perfiles Técnicos:</p>
                    <p className="text-gray-600">Responsables de área que quieren ser referentes.</p>
                  </li>
                </ul>
             </div>
             <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-100">
                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-gray-500">
                  <XCircle className="w-8 h-8" />
                  No es para ti si...
                </h3>
                <ul className="space-y-6 text-lg text-gray-500">
                   <li>• Buscas un curso pasivo de "solo escuchar".</li>
                   <li>• Quieres hablar de mil cosas sin foco.</li>
                   <li>• No estás dispuesto a practicar bajo presión real.</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Weekly Path */}
      <section className="py-24 bg-gray-50" id="temario">
        <div className="container mx-auto px-6">
          <SectionHeader title="La Ruta de Transformación" subtitle="8 semanas de inmersión en el club de oratoria más influyente de Madrid." />
          <div className="max-w-4xl mx-auto space-y-4">
            {weeks.map((item, i) => (
              <div key={i} className="group bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all hover:border-brand-200">
                <div className="w-16 h-16 rounded-2xl bg-brand-900 text-white flex items-center justify-center font-black text-2xl flex-shrink-0 group-hover:rotate-6 transition-transform">
                  {item.week}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-900 transition-colors">{item.title}</h4>
                  <p className="text-gray-600 text-lg leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers */}
      <section className="py-24 bg-white" id="equipo">
        <div className="container mx-auto px-6">
          <SectionHeader title="El equipo de dirección" subtitle="Profesionales que lideran el club más activo de la capital." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {teachers.map((t, i) => (
              <div key={i} className="group text-center">
                <div className="relative mb-8 inline-block">
                  <div className="absolute -inset-2 bg-brand-900 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity rotate-3"></div>
                  <img src={t.image} alt={t.name} className="relative w-56 h-72 object-cover rounded-[2.5rem] grayscale group-hover:grayscale-0 transition-all duration-500 shadow-2xl" />
                </div>
                <h4 className="text-2xl font-bold mb-1">{t.name}</h4>
                <p className="text-brand-900 font-bold text-sm uppercase tracking-widest mb-4">{t.role}</p>
                <p className="text-gray-500 text-sm px-4 leading-relaxed">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing & Process */}
      <section className="py-24 bg-white overflow-hidden relative" id="precios">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-brand-900 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Fase de Lanzamiento</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-balance uppercase tracking-tighter">OFERTA COHORTE FUNDADORA</h2>
            <div className="flex flex-col items-center gap-2">
               <p className="text-xl text-gray-400 line-through decoration-red-500">Precio oficial: 1.190 € (IVA inc.)</p>
               <div className="bg-brand-50 px-6 py-2 rounded-full border border-brand-100 flex items-center gap-2 text-brand-900 font-bold">
                  <Sparkles className="w-4 h-4" /> Beneficio por primera edición · 15 Plazas
               </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <div 
                key={i} 
                className={`relative p-10 rounded-[3rem] border transition-all duration-500 flex flex-col ${
                  tier.recommended 
                    ? 'bg-white border-brand-900 shadow-[0_40px_100px_-20px_rgba(0,80,157,0.15)] scale-105 z-20' 
                    : 'bg-gray-50 border-gray-100 hover:border-brand-200'
                }`}
              >
                {tier.recommended && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-900 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 whitespace-nowrap">
                    <Zap className="w-3 h-3 fill-current" /> Standard (10 Plazas)
                  </div>
                )}
                {tier.name === "Founder" && (
                   <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl flex items-center gap-2 whitespace-nowrap">
                    <Star className="w-3 h-3 fill-current" /> Founder (5 Plazas)
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="text-2xl font-black mb-4 tracking-tight">{tier.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900">{tier.price}</span>
                  </div>
                  <p className="text-sm text-gray-500 mt-4 leading-tight">
                    Reserva: <strong>{tier.reservation}</strong> <span className="text-xs italic">(incluido en el total)</span>
                  </p>
                </div>

                <ul className="space-y-5 mb-12 flex-grow">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${tier.recommended ? 'bg-brand-900 text-white' : 'bg-brand-100 text-brand-900'}`}>
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                      <span className="text-sm font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => scrollTo('form')}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
                    tier.recommended 
                      ? 'bg-brand-900 text-white hover:bg-black shadow-xl shadow-brand-100' 
                      : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-900 hover:text-brand-900'
                  }`}
                >
                  Solicitar plaza
                </button>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center text-gray-400 text-sm max-w-2xl mx-auto italic">
             <p>* El precio ancla de 1.190€ se aplicará a partir de la segunda edición. Esta oferta es exclusiva para la Cohorte Fundadora del club más grande de Madrid.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionHeader title="Dudas Frecuentes" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="group border border-gray-100 rounded-3xl overflow-hidden bg-white">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-brand-50 transition-all"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${activeFaq === i ? 'rotate-180 text-brand-900' : 'text-gray-400'}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                  <p className="text-gray-600 leading-relaxed text-lg">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Application Form */}
      <section className="py-24 bg-white" id="form">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-800">
            <div className="lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-center bg-brand-900 relative">
               <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
               <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight relative z-10 text-balance uppercase tracking-tighter">
                 Únete al club más numeroso de Madrid.
               </h2>
               <p className="text-xl text-brand-100 mb-12 relative z-10 font-medium">
                 El proceso comienza con una entrevista de 15 min. No buscamos "alumnos", buscamos líderes dispuestos a exponerse.
               </p>
               <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10 relative z-10">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Target className="text-brand-300" />
                  </div>
                  <p className="text-sm font-semibold tracking-tight uppercase">Entrevista de admisión obligatoria.</p>
               </div>
            </div>
            <div className="lg:w-1/2 p-12 md:p-16 bg-white">
              {isFormSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">¡Solicitud Enviada!</h3>
                  <p className="text-gray-600 text-lg">Revisaremos tu perfil y te contactaremos en menos de 48h para la entrevista.</p>
                </div>
              ) : (
                <form onSubmit={(e) => { e.preventDefault(); setIsFormSubmitted(true); }} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Nombre completo</label>
                      <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 focus:bg-white transition-all outline-none" placeholder="Tu nombre" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Email corporativo</label>
                      <input required type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 focus:bg-white transition-all outline-none" placeholder="tu@empresa.com" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Teléfono</label>
                      <input required type="tel" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 focus:bg-white transition-all outline-none" placeholder="600 000 000" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Rol / Cargo</label>
                      <input required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 focus:bg-white transition-all outline-none" placeholder="Manager, Lead, CEO..." />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">¿Tu reto principal hablando en público?</label>
                    <textarea required rows={3} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 focus:bg-white transition-all outline-none resize-none" placeholder="Cuéntanos brevemente qué quieres superar..."></textarea>
                  </div>
                  <button type="submit" className="w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-black transition-all shadow-xl shadow-brand-100 flex items-center justify-center gap-3">
                    Enviar solicitud <ChevronRight className="w-5 h-5" />
                  </button>
                  <p className="text-center text-xs text-gray-400 font-medium tracking-tight">Tratamos tus datos con total confidencialidad.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="flex items-center gap-2 text-brand-900">
               <Logo className="w-10 h-10" />
               <div className="flex flex-col">
                 <span className="font-black text-2xl tracking-tight leading-none uppercase">LIDERAZGO</span>
                 <span className="font-light text-xl tracking-tighter leading-none opacity-60 uppercase">EN ESCENA</span>
               </div>
            </div>
            <div className="flex gap-8 text-sm font-bold text-gray-400">
              <a href="#" className="hover:text-brand-900 transition-colors">Aviso Legal</a>
              <a href="#" className="hover:text-brand-900 transition-colors">Privacidad</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-900 transition-colors">LinkedIn</a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-gray-300 text-xs font-medium tracking-widest uppercase">
              &copy; {new Date().getFullYear()} LIDERAZGO EN ESCENA. MADRID, ESPAÑA. EL CLUB MÁS NUMEROSO DE MADRID. NO SOMOS TED/TEDX OFICIAL.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
