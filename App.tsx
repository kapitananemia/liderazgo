
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
  Trophy,
  Loader2,
  Building2,
  MessageSquare
} from 'lucide-react';

import { Teacher, PricingTier, FAQItem, WeeklyContent } from './types';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const FORMSPREE_ID = 'mzdbbwvl'; 
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsFormSubmitted(true);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error al enviar.');
      }
    } catch (error) {
      setSubmitError("No se ha podido enviar. Revisa tu conexión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const teachers: Teacher[] = [
    {
      name: "Mariana Ferrari",
      role: "Estructura y dirección",
      bio: "Estratega de comunicación. Mentoriza a líderes para encontrar su voz auténtica.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Antonio Rivas",
      role: "Argumentación y objeciones",
      bio: "Experto en dialéctica. Te enseña a defender tus ideas ante audiencias críticas.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sofía Orozco",
      role: "Presencia, cuerpo y voz",
      bio: "Coach de interpretación teatral aplicada al mundo ejecutivo y corporativo.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Santiago Petschen",
      role: "Profundidad de ideas",
      bio: "Filósofo de la acción. Dota a los mensajes de profundidad y criterio.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const weeks: WeeklyContent[] = [
    { week: 1, title: "Idea-fuerza de liderazgo", description: "Una idea potente. Una tesis clara que genere cambio." },
    { week: 2, title: "Estructura y argumento", description: "Orden, evidencias y lógica. No es inspiración, es estructura." },
    { week: 3, title: "Presencia y voz", description: "Control de escena, silencios y mirada. Tu cuerpo es el mensaje." },
    { week: 4, title: "Noche con público #1", description: "Teaser de 3 min ante audiencia no conocida + feedback exigente." },
    { week: 5, title: "Claridad de líder", description: "Sintetizar para convencer. Hablar para que las cosas ocurran." },
    { week: 6, title: "Manejo de objeciones", description: "Q&A bajo presión. Responder sin temblar ante lo imprevisto." },
    { week: 7, title: "Grabación final (12–14 min)", description: "Producción de tu activo de marca con equipo técnico profesional." },
    { week: 8, title: "Noche con público #2", description: "Showcase final (charla completa) + cierre y networking." }
  ];

  const pricingTiers: PricingTier[] = [
    {
      name: "Founder",
      price: "690 €",
      reservation: "200 €",
      features: [
        "Solo 5 plazas (Early-Bird)",
        "Todo el programa (8 semanas)",
        "2 noches con público invitado",
        "Grabación final (12-14 min)",
        "Prioridad de escenario (sales más veces)",
        "Acceso a grupo privado Founder",
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
        "2 noches con público real",
        "Grabación final + teaser 3 min",
        "Feedback exigente y honesto",
        "Material de soporte incluido",
        "IVA incluido"
      ]
    },
    {
      name: "Pro VIP",
      price: "990 €",
      reservation: "300 €",
      features: [
        "Todo lo del Standard",
        "2 Sesiones 1:1 con dirección",
        "Revisión personalizada de guion",
        "Ensayo privado en escenario",
        "Soporte prioritario post-curso",
        "IVA incluido"
      ]
    }
  ];

  const faqs: FAQItem[] = [
    {
      question: "¿Es un TED o TEDx oficial?",
      answer: "No. Es un programa independiente de entrenamiento. Trabajamos un formato estilo TED (12–14 min) y te llevas un dossier y vídeo listos para aplicar a convocatorias TEDx si te interesa. No estamos afiliados a TED/TEDx."
    },
    {
      question: "¿Tengo que tener experiencia hablando?",
      answer: "No profesional, pero sí responsabilidad real (equipo, clientes, inversión). Buscamos perfiles que necesiten defender ideas complejas. La entrevista asegura el nivel del grupo."
    },
    {
      question: "¿Qué pasa si me da pánico el escenario?",
      answer: "El miedo está contemplado: la exposición es progresiva, con ejercicios guiados y feedback honesto. Aquí no se 'sobrevive'; se entrena para liderar la escena."
    },
    {
      question: "¿Qué pasa si falto a una sesión?",
      answer: "Recibes tarea y guía de recuperación, pero el progreso depende de la práctica presencial semanal. Recomendamos priorizar las 8 fechas."
    },
    {
      question: "¿Se graba con calidad?",
      answer: "Sí. Grabación profesional (vídeo + audio) lista para LinkedIn o presentaciones. Te guiamos en guion y ritmo para que el vídeo sea un activo de marca real."
    },
    {
      question: "¿Puedo pedir factura a empresa?",
      answer: "Sí. Emitimos factura corporativa. Todos los precios tienen el IVA incluido y puedes pagarlo en dos partes si lo necesitas."
    }
  ];

  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      <nav className="fixed top-0 w-full z-50 glass border-b border-brand-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-900">
            <Logo className="w-8 h-8" />
            <span className="font-extrabold text-xl tracking-tight hidden sm:block uppercase">
              LIDERAZGO <span className="font-light">EN ESCENA</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button onClick={() => scrollTo('temario')} className="hover:text-brand-900 transition-colors">Ruta</button>
            <button onClick={() => scrollTo('equipo')} className="hover:text-brand-900 transition-colors">Equipo</button>
            <button onClick={() => scrollTo('precios')} className="hover:text-brand-900 transition-colors">Precios</button>
            <button 
              onClick={() => scrollTo('form')}
              className="px-6 py-2.5 bg-brand-900 text-white rounded-full hover:bg-black transition-all shadow-lg"
            >
              Aplicar a entrevista
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-spotlight">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight text-balance">
              Habla como un líder. <br/>
              <span className="text-brand-900">Con público real.</span>
            </h1>
            <div className="mb-12">
               <p className="text-xl md:text-2xl text-gray-700 font-semibold mb-6 leading-relaxed">
                No enseñamos oratoria: construimos autoridad bajo presión.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-gray-500 font-bold text-sm tracking-tight border-y border-gray-100 py-4 max-w-4xl mx-auto">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-brand-900"/> 8 semanas</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-brand-900"/> 19:00 (1 sesión/sem)</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-brand-900"/> Madrid centro</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-brand-900"/> 15 plazas</span>
                <span className="flex items-center gap-1.5"><Mic2 className="w-4 h-4 text-brand-900"/> 2 noches con público invitado</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button 
                onClick={() => scrollTo('form')}
                className="w-full sm:w-auto px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-2xl flex items-center justify-center gap-3 group"
              >
                Aplicar a entrevista (10 min) <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => scrollTo('temario')}
                className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 border border-gray-200 rounded-2xl font-bold text-lg hover:border-brand-900 transition-all"
              >
                Ver ruta de 8 semanas
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Authority Metrics */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            <div className="text-center border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0">
              <div className="text-4xl font-black text-brand-400 tracking-tight">2.077</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">En comunidad de liderazgo</div>
            </div>
            <div className="text-center border-b md:border-b-0 md:border-r border-white/10 pb-8 md:pb-0 px-4">
              <div className="text-2xl font-bold text-white tracking-tight leading-tight">+24 Sesiones/Año</div>
              <div className="text-brand-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold italic">La mayor actividad presencial en Madrid</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-black text-brand-400 tracking-tight">15 Plazas</div>
              <div className="text-gray-400 text-[10px] uppercase tracking-[0.2em] mt-2 font-bold">Máximo por cohorte</div>
            </div>
          </div>
        </div>
      </section>

      {/* NUESTRA FILOSOFÍA Section (Matching User Image) */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 xl:gap-24 items-center">
            {/* Left: Image with Quote Overlay */}
            <div className="relative group">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200" 
                  className="w-full aspect-[4/3] object-cover" 
                  alt="Micrófono en escenario real" 
                />
              </div>
              {/* Quote Box Overlay */}
              <div className="absolute -bottom-10 -right-6 md:right-10 bg-white p-8 md:p-10 rounded-3xl shadow-2xl border border-gray-100 max-w-[280px] md:max-w-[320px] z-20">
                <p className="text-gray-900 font-bold italic leading-tight text-xl md:text-2xl">
                  "Aquí no vienes a aprender a hablar. Vienes a hablar."
                </p>
              </div>
            </div>

            {/* Right: Content */}
            <div className="pt-8 lg:pt-0">
              <span className="text-brand-900 font-black text-xs uppercase tracking-[0.3em] mb-6 block">
                NUESTRA FILOSOFÍA
              </span>
              <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-10 tracking-tight">
                Hoy no gana quien sabe más. Gana quien <br/>
                <span className="text-brand-900 relative">
                  sostiene la presión.
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-brand-100 -z-10 opacity-70"></span>
                </span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                La mayoría de formaciones fallan porque son pura teoría. En el club más grande de Madrid, sabemos que la autoridad se construye ante un público real, no frente a un espejo.
              </p>
              
              <div className="space-y-6">
                {[
                  "Práctica presencial 100% física",
                  "Escenario desde la primera sesión",
                  "Filtro selectivo de perfiles"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-900 flex items-center justify-center flex-shrink-0 text-white shadow-lg shadow-brand-200">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold text-gray-900 tracking-tight">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Difference Section */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader title="Lo que nos hace distintos" subtitle="Enfoque en el impacto tangible, no en certificados vacíos." />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Vídeo Profesional", desc: "Producción cinematográfica: teaser 3 min + charla final.", icon: <Video /> },
              { title: "Público Invitado", desc: "En la semana 4 y 8 traemos extraños para medir tu impacto.", icon: <Users /> },
              { title: "Dossier TEDx-ready", desc: "Material listo para aplicar a convocatorias oficiales.", icon: <Award /> },
              { title: "Feedback Exigente", desc: "Honestidad radical para acelerar tu crecimiento.", icon: <Star /> },
            ].map((item, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all">
                <div className="w-14 h-14 rounded-2xl bg-brand-900 text-white flex items-center justify-center mb-6 shadow-lg shadow-brand-100">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Filtering */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionHeader title="Este programa es para ti si..." />
          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
             <div className="bg-brand-50 p-12 rounded-[3rem] border border-brand-100">
                <h3 className="text-2xl font-bold mb-8 text-brand-900 flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8" /> Para ti si...
                </h3>
                <ul className="space-y-6 text-gray-700 font-medium">
                  <li>• Tienes que <strong>defender un roadmap</strong> ante dirección y necesitas impacto real.</li>
                  <li>• Presentas propuestas pero <strong>nadie se mueve</strong> tras escucharte.</li>
                  <li>• Te cuesta <strong>sostener el silencio</strong>, la mirada y el ritmo bajo presión física.</li>
                  <li>• Te <strong>tiemblan las manos</strong> en el turno de preguntas difíciles (Q&A).</li>
                </ul>
             </div>
             <div className="bg-gray-50 p-12 rounded-[3rem] border border-gray-200">
                <h3 className="text-2xl font-bold mb-8 text-gray-400 flex items-center gap-3">
                  <XCircle className="w-8 h-8" /> No es para ti si...
                </h3>
                <ul className="space-y-6 text-gray-500">
                   <li>• Buscas un curso pasivo o de "solo escuchar".</li>
                   <li>• Quieres inspiración sin exponerte al escenario real.</li>
                   <li>• No estás dispuesto a recibir <strong>correcciones directas</strong>.</li>
                   <li>• Buscas una certificación sin entrenamiento físico.</li>
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Weekly Path */}
      <section className="py-24 bg-gray-50" id="temario">
        <div className="container mx-auto px-6">
          <SectionHeader title="Ruta de Transformación" subtitle="8 semanas de inmersión en el escenario." />
          <div className="max-w-4xl mx-auto space-y-4">
            {weeks.map((item, i) => (
              <div key={i} className="group bg-white p-8 rounded-[2rem] border border-gray-100 flex flex-col md:flex-row gap-8 items-start hover:shadow-xl transition-all">
                <div className="w-16 h-16 rounded-2xl bg-brand-900 text-white flex items-center justify-center font-black text-2xl flex-shrink-0">
                  {item.week}
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 group-hover:text-brand-900 transition-colors">{item.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teachers Section */}
      <section className="py-24 bg-white" id="equipo">
        <div className="container mx-auto px-6">
          <SectionHeader title="Dirección del programa" subtitle="Expertos enfocados en el impacto real de tu comunicación." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
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

      {/* Pricing Section */}
      <section className="py-24 bg-gray-50 overflow-hidden" id="precios">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-2xl font-bold italic text-gray-400 mb-8 max-w-2xl mx-auto text-balance">
              “Esto es para personas que lideran de verdad. <br/> Si no estás dispuesto a exponerte, hay opciones más cómodas.”
            </h3>
            <span className="text-brand-900 font-black text-xs uppercase tracking-[0.3em] mb-4 block">Fase de Lanzamiento</span>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 uppercase tracking-tighter">COHORTE FUNDADORA</h2>
            <div className="flex flex-col items-center gap-2">
               <p className="text-xl text-gray-400 line-through decoration-red-500">Precio 2ª edición: 1.190 € (IVA inc.)</p>
               <div className="bg-brand-50 px-6 py-2 rounded-full border border-brand-100 text-brand-900 font-bold text-sm">
                  Precio fundador solo en esta cohorte + condiciones especiales de admisión
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
                    : 'bg-white border-gray-100'
                }`}
              >
                {tier.name === "Founder" && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-brand-950 text-white px-8 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl whitespace-nowrap">
                    <Star className="w-3 h-3 inline-block mr-1" /> Plan Founder (5 plazas)
                  </div>
                )}
                
                <div className="mb-8">
                  <h4 className="text-2xl font-black mb-2 tracking-tight">{tier.name}</h4>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-gray-900">{tier.price}</span>
                  </div>
                  <p className="text-sm font-bold text-brand-900 mt-2">
                    Desde {Math.round(parseInt(tier.price) / 8)}€ / semana (8 semanas)
                  </p>
                  <p className="text-xs text-gray-500 mt-4 leading-tight">
                    Reserva: <strong>{tier.reservation}</strong> <span className="italic">(incluida en el total)</span>
                  </p>
                </div>

                <ul className="space-y-4 mb-12 flex-grow">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700">
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${tier.recommended ? 'text-brand-900' : 'text-brand-300'}`} />
                      <span className="text-sm font-medium leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => scrollTo('form')}
                  className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
                    tier.recommended 
                      ? 'bg-brand-900 text-white hover:bg-black shadow-xl shadow-brand-100' 
                      : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-900'
                  }`}
                >
                  Aplicar a entrevista
                </button>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center max-w-2xl mx-auto">
             <div className="inline-flex items-center gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100 text-gray-600 font-semibold mb-6 text-left">
                <ShieldCheck className="w-6 h-6 text-brand-900" />
                <p className="text-sm">La reserva se paga solo <strong>después de la entrevista</strong> (si te aceptamos). Bloquea plaza con garantía de devolución si no hay encaje.</p>
             </div>
             <div className="flex justify-center items-center gap-6 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
                <span className="flex items-center gap-2"><Building2 className="w-4 h-4"/> Factura a empresa disponible</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4"/> IVA Incluido</span>
             </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-white" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionHeader title="Dudas frecuentes" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-3xl overflow-hidden bg-white shadow-sm">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full p-8 text-left flex items-center justify-between hover:bg-brand-50 transition-all"
                >
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${activeFaq === i ? 'rotate-180 text-brand-900' : 'text-gray-400'}`} />
                </button>
                <div className={`px-8 overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96 pb-8' : 'max-h-0'}`}>
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-gray-50" id="form">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-800">
            <div className="lg:w-1/2 p-12 md:p-20 text-white flex flex-col justify-center bg-brand-900">
               <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight uppercase tracking-tighter">
                 Aplica para tu entrevista (15 min).
               </h2>
               <p className="text-xl text-brand-100 mb-12 font-medium">
                 No buscamos alumnos; buscamos líderes dispuestos a exponerse. Si hay encaje mutuo, te ofreceremos plaza.
               </p>
               <div className="flex items-center gap-4 p-6 bg-white/5 rounded-3xl border border-white/10">
                  <MessageSquare className="text-brand-300" />
                  <p className="text-sm font-semibold tracking-tight uppercase">Te respondemos en 24h laborables.</p>
               </div>
            </div>
            <div className="lg:w-1/2 p-12 md:p-16 bg-white">
              {isFormSubmitted ? (
                <div className="text-center py-20">
                  <div className="w-20 h-20 bg-brand-900 text-white rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">¡Solicitud enviada!</h3>
                  <p className="text-gray-600">Revisamos tu perfil y te escribiremos por WhatsApp/Email en menos de 24h laborables.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="name" required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 outline-none" placeholder="Nombre completo" />
                    <input name="email" required type="email" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 outline-none" placeholder="Email (personal o corporativo)" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input name="phone" required type="tel" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 outline-none" placeholder="WhatsApp (para agendar)" />
                    <input name="role" required type="text" className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 outline-none" placeholder="Rol / Cargo actual" />
                  </div>
                  <textarea name="message" required rows={3} className="w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-brand-900 outline-none resize-none" placeholder="¿Cuál es tu reto principal hoy hablando en público?"></textarea>
                  
                  {submitError && <p className="text-red-600 text-sm font-bold">{submitError}</p>}

                  <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full py-5 bg-brand-900 text-white rounded-2xl font-bold text-xl hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Aplicar a entrevista (15 min) <ChevronRight /></>}
                  </button>
                  <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-widest">Al enviar aceptas nuestra política de privacidad.</p>
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
            <div className="flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              <a href="#" className="hover:text-brand-900">Aviso Legal</a>
              <a href="#" className="hover:text-brand-900">Privacidad</a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-brand-900">LinkedIn</a>
            </div>
          </div>
          <p className="text-center text-gray-300 text-[9px] font-medium tracking-[0.2em] uppercase leading-loose">
            &copy; {new Date().getFullYear()} LIDERAZGO EN ESCENA. MADRID. PROGRAMA INDEPENDIENTE DE ENTRENAMIENTO. NO AFILIADO A TED O TEDX. COMUNIDAD ACTIVA DE +2.000 MIEMBROS.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
