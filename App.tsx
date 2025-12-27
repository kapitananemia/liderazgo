
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
        Revisa tu WhatsApp y Email; Mariana o alguien del equipo te contactará en menos de <span className="text-gray-900 font-bold underline">24h laborables</span> para agendar tu entrevista.
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
      // Usamos el ID de Formspree del usuario
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

  // Si el formulario se ha enviado, mostramos la página de GRACIAS
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

  const pricingTiers: PricingTier[] = [
    {
      name: "Básico",
      price: "890 €",
      reservation: "200 €",
      features: [
        "Todo el programa (8 semanas)",
        "2 noches con público invitado",
        "Grabación final editada",
        "Material de soporte",
        "IVA incluido"
      ]
    },
    {
      name: "Pro (Recomendado)",
      price: "1.190 €",
      reservation: "250 €",
      recommended: true,
      features: [
        "Todo lo del Básico",
        "2 Sesiones 1:1 con dirección",
        "Revisión de guion personalizada",
        "Kit de candidatura TEDx",
        "Acceso prioritario a eventos"
      ]
    },
    {
      name: "Empresa",
      price: "1.490 €",
      reservation: "300 €",
      features: [
        "Facturación corporativa",
        "Informe de progreso individual",
        "Sesión de feedback post-programa",
        "Derechos comerciales del vídeo",
        "Soporte premium"
      ]
    }
  ];

  const faqs: FAQItem[] = [
    { question: "¿Es un TED o TEDx oficial?", answer: "No. Es un programa de formación con formato 'estilo TED'. Ayudamos con el material si quieres postularte a convocatorias oficiales." },
    { question: "¿Tengo que tener experiencia?", answer: "No. Pero sí ganas de practicar y exponerte. La formación es progresiva." },
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
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Un programa presencial en Madrid para convertir tu mensaje en una charla de liderazgo estilo TED (12–14 min), con escenario y público invitado.
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

      {/* Metrics */}
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
            <div><div className="text-3xl font-black text-brand-400">+2.000</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Comunidad</div></div>
            <div><div className="text-3xl font-black text-brand-400">300</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">En WhatsApp</div></div>
            <div><div className="text-3xl font-black text-brand-400">Mensuales</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Eventos presenciales</div></div>
            <div><div className="text-3xl font-black text-brand-400">15</div><div className="text-gray-400 text-xs uppercase tracking-widest mt-1">Alumnos por cohorte</div></div>
          </div>
        </div>
      </section>

      {/* Filosofía (Matching Image) */}
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

      {/* Programa por semanas */}
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

      {/* Pricing */}
      <section className="py-24 bg-white" id="precios">
        <div className="container mx-auto px-6">
          <SectionHeader title="Plazas y Admisión" subtitle="Solo 15 plazas para garantizar feedback serio." />
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <div key={i} className={`p-10 rounded-[3rem] border flex flex-col ${tier.recommended ? 'border-brand-900 bg-white shadow-2xl scale-105 z-10' : 'border-gray-100 bg-gray-50'}`}>
                <h4 className="text-2xl font-black mb-2">{tier.name}</h4>
                <div className="text-5xl font-black text-gray-900 mb-6">{tier.price}</div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {tier.features.map((f, j) => (
                    <li key={j} className="flex gap-2 text-sm text-gray-600"><CheckCircle2 className="w-4 h-4 text-brand-900 flex-shrink-0" /> {f}</li>
                  ))}
                </ul>
                <button onClick={() => scrollTo('form')} className={`w-full py-4 rounded-2xl font-bold text-lg transition-all ${tier.recommended ? 'bg-brand-900 text-white hover:bg-black' : 'bg-white text-gray-900 border-2 border-gray-200 hover:border-brand-900'}`}>Solicitar plaza</button>
              </div>
            ))}
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
