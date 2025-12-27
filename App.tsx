
import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Calendar, 
  Video, 
  CheckCircle2, 
  XCircle, 
  ChevronDown, 
  MapPin, 
  Clock, 
  Mic2,
  ArrowRight,
  ShieldCheck,
  Award,
  ChevronRight,
  Star,
  Loader2,
  Building2,
  MessageSquare,
  Home
} from 'lucide-react';

import { Teacher, PricingTier, FAQItem, WeeklyContent } from './types';

const Logo = ({ className = "w-10 h-10" }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M50 5C25.147 5 5 25.147 5 50C5 74.853 25.147 95 50 95C74.853 95 95 74.853 95 50C95 25.147 74.853 5 50 5ZM50 85C30.67 85 15 69.33 15 50C15 30.67 30.67 15 50 15C69.33 15 85 30.67 85 50C85 69.33 69.33 85 50 85Z" />
    <rect x="45" y="53" width="10" height="42" />
  </svg>
);

const SectionHeader = ({ title, subtitle, centered = true }: { title: string; subtitle?: string; centered?: boolean }) => (
  <div className={`mb-16 ${centered ? 'text-center' : 'text-left'}`}>
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-gray-900 text-balance">
      {title}
    </h2>
    {subtitle && <p className={`text-xl max-w-3xl ${centered ? 'mx-auto' : ''} text-gray-600`}>{subtitle}</p>}
  </div>
);

// --- COMPONENTE DE LA PÁGINA DE GRACIAS ---
const ThankYouPage = ({ onBack }: { onBack: () => void }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-spotlight flex flex-col items-center justify-center px-6 py-20 text-center">
      <div className="w-24 h-24 bg-brand-900 text-white rounded-3xl flex items-center justify-center mb-10 shadow-2xl shadow-brand-200 animate-bounce">
        <CheckCircle2 className="w-14 h-14" />
      </div>
      <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 tracking-tighter uppercase">
        ¡Solicitud <span className="text-brand-900">Recibida!</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mb-12 font-medium leading-relaxed">
        Tu plaza para <span className="text-brand-900 font-bold">Liderazgo en Escena</span> está un paso más cerca. 
        Revisa tu WhatsApp y Email; el equipo te contactará en menos de <span className="text-gray-900 font-bold underline">24h laborables</span> para agendar tu entrevista.
      </p>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl w-full mb-16">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <Clock className="w-8 h-8 text-brand-900 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Entrevista 15 min</h3>
          <p className="text-sm text-gray-500">Breve llamada para conocer tus retos y asegurar el encaje.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <ShieldCheck className="w-8 h-8 text-brand-900 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Reserva de Plaza</h3>
          <p className="text-sm text-gray-500">Solo tras la entrevista podrás formalizar el pago.</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <MapPin className="w-8 h-8 text-brand-900 mb-4 mx-auto" />
          <h3 className="font-bold mb-2">Madrid Presencial</h3>
          <p className="text-sm text-gray-500">Zona Salamanca. 19:00h puntualidad estricta.</p>
        </div>
      </div>

      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-brand-900 font-bold uppercase tracking-widest text-sm transition-colors group"
      >
        <Home className="w-4 h-4 group-hover:-translate-y-1 transition-transform" /> Volver a la web
      </button>
    </div>
  );
};

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
      const response = await fetch(`https://formspree.io/f/mzdbbwvl`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setIsFormSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error('Error al enviar.');
      }
    } catch (error) {
      setSubmitError("Error al enviar. Inténtalo de nuevo o contáctanos por redes.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isFormSubmitted) {
    return <ThankYouPage onBack={() => setIsFormSubmitted(false)} />;
  }

  const teachers: Teacher[] = [
    {
      name: "Mariana Ferrari",
      role: "Dirección del programa",
      bio: "Estratega de comunicación y experta en encontrar la voz auténtica de los líderes.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Antonio Rivas",
      role: "Persuasión y Objeciones",
      bio: "Experto en argumentación y manejo de audiencias críticas.",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Sofía Orozco",
      role: "Presencia y Voz Escénica",
      bio: "Coach de interpretación aplicada al liderazgo ejecutivo.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400"
    },
    {
      name: "Santiago Petschen",
      role: "Liderazgo e Ideas",
      bio: "Especialista en profundidad de ideas y visión estratégica.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400"
    }
  ];

  const weeks: WeeklyContent[] = [
    { week: 1, title: "Idea-fuerza de liderazgo", description: "Una idea. Una tesis. Un cambio claro en el público." },
    { week: 2, title: "Estructura y argumento", description: "Orden, evidencias, ejemplos. No es inspiración: es lógica." },
    { week: 3, title: "Presencia, voz y apertura", description: "Entradas potentes, silencios, mirada, control de escena." },
    { week: 4, title: "Noche con público #1", description: "Teaser 3 min + feedback real ante audiencia invitada." },
    { week: 5, title: "Claridad de líder", description: "Frases de autoridad, síntesis, hablar para que ocurra." },
    { week: 6, title: "Objeciones y Q&A", description: "Responder sin temblar. Preguntas difíciles como parte del liderazgo." },
    { week: 7, title: "Grabación final (12–14 min)", description: "Producción profesional de tu activo de marca personal." },
    { week: 8, title: "Noche con público #2 (Showcase)", description: "6 min por persona + cierre + networking." }
  ];

  // Actualizados con los datos de lanzamiento solicitados
  const pricingTiers = [
    {
      name: "Founder",
      price: "690 €",
      reservation: "200 €",
      weekly: "86 €",
      capacity: "5 plazas",
      features: [
        "Programa completo (8 semanas)",
        "2 noches con público (sem. 4 y 8)",
        "Grabación final (12-14 min)",
        "Teaser 3 min + Feedback",
        "Prioridad de escenario (sales antes y más veces)",
        "Grupo privado Founder (acceso directo)",
        "IVA incluido"
      ]
    },
    {
      name: "Standard",
      price: "790 €",
      reservation: "250 €",
      weekly: "99 €",
      capacity: "10 plazas",
      recommended: true,
      features: [
        "Programa completo 8 semanas",
        "2 noches con público real (sem. 4 y 8)",
        "Grabación final + teaser 3 min",
        "Feedback exigente y directo",
        "Certificado de finalización",
        "IVA incluido"
      ]
    },
    {
      name: "Pro VIP",
      price: "990 €",
      reservation: "300 €",
      weekly: "124 €",
      features: [
        "Todo lo del plan Standard",
        "2 sesiones 1:1 (30 min)",
        "Revisión personalizada de guion",
        "Ensayo privado exclusivo",
        "Kit de candidatura TEDx",
        "IVA incluido"
      ]
    }
  ];

  const faqs: FAQItem[] = [
    { question: "¿Es un TED o TEDx oficial?", answer: "No. Es un programa de formación con formato 'estilo TED'. Ayudamos con el material si quieres postularte a convocatorias oficiales." },
    { question: "¿Tengo que tener experiencia?", answer: "No. Pero sí ganas de practicar and exponerte. La formación es progresiva." },
    { question: "¿Se graba con calidad?", answer: "Sí: el objetivo es que te lleves un vídeo final digno para usar profesionalmente." },
    { question: "¿Qué pasa si falto a una sesión?", answer: "Te damos tarea y guía de recuperación, pero el progreso depende de la práctica presencial." }
  ];

  return (
    <div className="min-h-screen selection:bg-brand-100 selection:text-brand-900">
      <nav className="fixed top-0 w-full z-50 glass border-b border-brand-100">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-brand-900">
            <Logo className="w-8 h-8" />
            <span className="font-extrabold text-xl tracking-tight hidden sm:block uppercase">LIDERAZGO <span className="font-light">EN ESCENA</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-600">
            <button onClick={() => scrollTo('temario')} className="hover:text-brand-900 transition-colors">Temario</button>
            <button onClick={() => scrollTo('equipo')} className="hover:text-brand-900 transition-colors">Equipo</button>
            <button onClick={() => scrollTo('precios')} className="hover:text-brand-900 transition-colors">Precio</button>
            <button onClick={() => scrollTo('form')} className="px-6 py-2.5 bg-brand-900 text-white rounded-full hover:bg-black transition-all">Solicitar plaza</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-spotlight">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-5xl md:text-8xl font-extrabold text-gray-900 leading-[1.1] mb-8 tracking-tight text-balance">
              Habla como un líder. <br/> <span className="text-brand-900">Con público real. En 8 semanas.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6 max-w-3xl mx-auto">
              Un programa presencial en Madrid para convertir tu mensaje en una charla de liderazgo estilo TED (12–14 min), con escenario y público invitado.
            </p>
            {/* Línea de logística explícita solicitada */}
            <p className="text-lg font-bold text-brand-900 mb-10 tracking-wide uppercase text-sm md:text-base">
              8 semanas · 1 sesión/semana (19:00) · Madrid centro · 15 plazas · 2 noches con público
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <button onClick={() => scrollTo('form')} className="w-full sm:w-auto px-10 py-5 bg-brand-900 text-white rounded-2xl font-bold text-lg hover:bg-black transition-all shadow-xl flex items-center justify-center gap-3">
                👉 Solicitar plaza (Entrevista 15 min)
              </button>
              <button onClick={() => scrollTo('temario')} className="w-full sm:w-auto px-10 py-5 bg-white text-gray-800 border border-gray-200 rounded-2xl font-bold text-lg hover:border-brand-900 transition-all">
                Ver temario y funcionamiento
              </button>
            </div>
            <p className="text-sm text-gray-400 font-medium italic">No es un evento TED/TEDx. Es formación en formato “estilo TED” para liderazgo.</p>
          </div>
        </div>
      </section>

      {/* Metrics Actualizadas */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
            <div><div className="text-3xl font-black text-brand-400">2.077</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">En comunidad</div></div>
            <div><div className="text-3xl font-black text-brand-400">28</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Eventos/año</div></div>
            <div><div className="text-3xl font-black text-brand-400">15</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Plazas por cohorte</div></div>
          </div>
        </div>
      </section>

      {/* Filosofía */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                <img src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&q=80&w=1200" className="w-full aspect-[4/3] object-cover" alt="Escenario real" />
              </div>
              <div className="absolute -bottom-10 -right-6 md:right-10 bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 max-w-[280px] md:max-w-[320px]">
                <p className="text-gray-900 font-bold italic leading-tight text-xl md:text-2xl">"Aquí no vienes a aprender a hablar. Vienes a hablar."</p>
              </div>
            </div>
            <div>
              <span className="text-brand-900 font-black text-xs uppercase tracking-[0.3em] mb-6 block">NUESTRA FILOSOFÍA</span>
              <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-[1.1] mb-10 tracking-tight">
                Hoy no gana quien sabe más. Gana quien <br/>
                <span className="text-brand-900 relative">sostiene la presión.<span className="absolute bottom-2 left-0 w-full h-3 bg-brand-100 -z-10 opacity-70"></span></span>
              </h2>
              <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-xl">
                La mayoría de formaciones fallan porque son pura teoría. En el club más grande de Madrid, sabemos que la autoridad se construye ante un público real, no frente a un espejo.
              </p>
              <div className="space-y-6">
                {["Práctica presencial 100% física", "Escenario desde la primera sesión", "Filtro selectivo de perfiles"].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-brand-900 flex items-center justify-center text-white shadow-lg"><CheckCircle2 className="w-5 h-5" /></div>
                    <span className="text-xl font-bold text-gray-900">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qué consigues */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <SectionHeader title="Al terminar, te llevas:" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { t: "Charla estilo TED", d: "Grabada y defendible (12-14 min).", i: <Video /> },
              { t: "Teaser de 3 minutos", d: "Perfecto para LinkedIn y eventos.", i: <Mic2 /> },
              { t: "Showcase en vivo", d: "Graduación con público real.", i: <Users /> },
              { t: "Estructura Clara", d: "Autoridad, ritmo y presencia.", i: <Award /> },
              { t: "Manejo de Objeciones", d: "Responder sin temblar.", i: <MessageSquare /> },
              { t: "Kit TEDx", d: "Material listo para aplicar.", i: <ShieldCheck /> }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-all">
                <div className="w-12 h-12 bg-brand-50 text-brand-900 rounded-xl flex items-center justify-center mb-6">{item.i}</div>
                <h3 className="text-xl font-bold mb-2">{item.t}</h3>
                <p className="text-gray-500 text-sm">{item.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Programa */}
      <section className="py-24 bg-white" id="temario">
        <div className="container mx-auto px-6">
          <SectionHeader title="Programa por semanas" subtitle="8 semanas de inmersión total en escenario." />
          <div className="max-w-4xl mx-auto space-y-4">
            {weeks.map((item, i) => (
              <div key={i} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex gap-6 items-start hover:border-brand-900 transition-all">
                <div className="w-12 h-12 bg-brand-900 text-white rounded-xl flex items-center justify-center font-black flex-shrink-0">{item.week}</div>
                <div><h4 className="text-xl font-bold mb-1">{item.title}</h4><p className="text-gray-600">{item.description}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipo */}
      <section className="py-24 bg-gray-50" id="equipo">
        <div className="container mx-auto px-6">
          <SectionHeader title="Equipo docente" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-6xl mx-auto">
            {teachers.map((t, i) => (
              <div key={i} className="text-center group">
                <img src={t.image} alt={t.name} className="w-56 h-72 object-cover rounded-[2rem] mx-auto mb-6 grayscale group-hover:grayscale-0 transition-all shadow-xl" />
                <h4 className="text-2xl font-bold mb-1">{t.name}</h4>
                <p className="text-brand-900 font-bold text-xs uppercase tracking-widest mb-3">{t.role}</p>
                <p className="text-gray-500 text-sm px-4">{t.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE DE PRECIO - FASE DE LANZAMIENTO */}
      <section className="py-24 bg-white border-t border-gray-100" id="precios">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 bg-brand-900 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full mb-6">
              ## FASE DE LANZAMIENTO
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight text-gray-900">
              Cohorte Fundadora <span className="text-brand-900">(15 plazas)</span>
            </h2>
            <div className="max-w-2xl mx-auto space-y-2">
              <p className="text-xl text-gray-400 line-through font-bold">Precio 2ª edición: 1.190€ (IVA incl.)</p>
              <p className="text-brand-900 font-bold text-lg italic">
                Precio fundador solo disponible en esta cohorte + condiciones especiales de admisión.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
            {pricingTiers.map((tier, i) => (
              <div key={i} className={`relative p-10 rounded-[3rem] border flex flex-col transition-all duration-500 hover:shadow-2xl ${tier.recommended ? 'border-brand-900 bg-white shadow-xl scale-105 z-10' : 'border-gray-100 bg-gray-50 shadow-sm'}`}>
                {tier.recommended && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-900 text-white px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest">Más elegido</span>
                )}
                <div className="mb-8">
                  <h4 className="text-2xl font-black mb-1">{tier.name}</h4>
                  {tier.capacity && <p className="text-brand-900 font-bold text-xs uppercase tracking-widest mb-4">{tier.capacity}</p>}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-black text-gray-900">{tier.price}</span>
                  </div>
                  <div className="text-brand-600 font-bold text-sm uppercase tracking-widest">Desde {tier.weekly}/semana</div>
                  <div className="text-xs text-gray-400 mt-1 italic font-medium">Factura a empresa disponible</div>
                </div>

                <div className="bg-gray-100/50 p-6 rounded-2xl mb-8 border border-gray-200/50">
                  <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3">
                    {tier.name === "Pro VIP" ? "Núcleo Común" : "Características"}
                  </div>
                  <ul className="grid grid-cols-1 gap-2 text-[11px] font-bold text-gray-600">
                    {tier.name !== "Pro VIP" ? (
                      tier.features.map((f, j) => (
                        <li key={j} className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-900" /> {f}</li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-900" /> Programa 8 semanas</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-900" /> 2 noches con público (sem 4 y 8)</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-900" /> Grabación final (12–14 min)</li>
                        <li className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-brand-900" /> Teaser 3 min + Feedback</li>
                      </>
                    )}
                  </ul>
                </div>

                <div className="flex-grow">
                   {tier.name === "Pro VIP" && (
                     <>
                        <div className="text-[10px] font-black uppercase tracking-widest text-brand-900 mb-3">Extras del plan</div>
                        <ul className="space-y-4 mb-10">
                          {tier.features.filter(f => !["Programa 8 semanas", "2 noches con público", "Grabación final", "Teaser 3 min", "Feedback exigente", "IVA incluido"].some(common => f.includes(common))).map((f, j) => (
                            <li key={j} className="flex gap-2 text-sm font-semibold text-gray-700 leading-tight italic">
                              <Star className="w-4 h-4 text-brand-900 flex-shrink-0" /> {f}
                            </li>
                          ))}
                        </ul>
                     </>
                   )}
                </div>

                <div className="mt-auto space-y-4">
                  <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Reserva: {tier.reservation}</p>
                    <p className="text-[10px] text-brand-900 font-bold italic leading-none px-4">
                      ✅ La reserva se paga después de la entrevista (si te aceptamos)
                    </p>
                  </div>
                  <button onClick={() => scrollTo('form')} className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${tier.recommended ? 'bg-brand-900 text-white hover:bg-black' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-900'}`}>
                    Solicitar plaza
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center max-w-2xl mx-auto bg-brand-50 p-6 rounded-3xl border border-brand-100">
            <p className="text-brand-900 font-bold italic">
              "No es barato. Es razonable para un activo de marca personal de por vida."
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-gray-50" id="faq">
        <div className="container mx-auto px-6 max-w-3xl">
          <SectionHeader title="Dudas frecuentes" />
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-3xl overflow-hidden">
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full p-8 text-left flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 transition-transform ${activeFaq === i ? 'rotate-180 text-brand-900' : 'text-gray-400'}`} />
                </button>
                {activeFaq === i && <div className="px-8 pb-8 text-gray-600 leading-relaxed">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-24 bg-white" id="form">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto bg-gray-900 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-12 text-white bg-brand-900">
               <h2 className="text-4xl font-black mb-8 leading-tight">Solicita tu plaza ahora.</h2>
               <p className="text-xl text-brand-100 mb-8">Te hacemos una entrevista de 15 min para asegurar que el programa es para ti.</p>
               <div className="flex items-center gap-4 p-4 bg-white/10 rounded-2xl border border-white/20">
                  <MessageSquare className="text-brand-300" />
                  <p className="text-sm font-bold uppercase tracking-widest">Respuesta en 24h laborables</p>
               </div>
            </div>
            <div className="lg:w-1/2 p-12 bg-white">
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <input name="name" required className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-900 transition-all" placeholder="Nombre completo" />
                  <input name="email" required type="email" className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-900 transition-all" placeholder="Email" />
                  <input name="phone" required className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-900 transition-all" placeholder="Teléfono / WhatsApp" />
                  <input name="role" required className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-900 transition-all" placeholder="¿A qué te dedicas? (Rol actual)" />
                  <textarea name="message" rows={3} className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-brand-900 transition-all" placeholder="¿Qué quieres conseguir en 8 semanas?"></textarea>
                  
                  {submitError && <p className="text-red-500 text-sm font-bold">{submitError}</p>}
                  
                  <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-brand-900 text-white rounded-xl font-bold text-lg hover:bg-black transition-all flex items-center justify-center gap-3 disabled:opacity-50">
                    {isSubmitting ? <Loader2 className="animate-spin" /> : <>Solicitar entrevista <ArrowRight /></>}
                  </button>
                </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-gray-50 border-t">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 text-brand-900 mb-8">
            <Logo className="w-10 h-10" />
            <span className="font-black text-2xl uppercase tracking-tight leading-none">LIDERAZGO <span className="font-light">EN ESCENA</span></span>
          </div>
          <p className="text-gray-400 text-xs uppercase tracking-[0.2em]">&copy; 2025 Liderazgo en Escena. Madrid. No afiliado a TED/TEDx.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
