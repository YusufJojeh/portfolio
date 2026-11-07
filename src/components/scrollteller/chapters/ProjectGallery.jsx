'use client';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion } from 'framer-motion';

export default function ProjectGallery({ projects, locale }) {
  const [active, setActive] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [screen, setScreen] = useState(0);
  const dialog = useRef(null);
  const opener = useRef(null);
  const reduced = useReducedMotion();
  const ar = locale === 'ar';
  const project = projects[active];
  const go = (step) => { setActive((n) => (n + step + projects.length) % projects.length); setFlipped(false); setScreen(0); };
  useEffect(() => {
    const element = dialog.current;
    const restore = () => { document.body.style.overflow = ''; opener.current?.focus(); };
    element.addEventListener('close', restore);
    return () => { element.removeEventListener('close', restore); document.body.style.overflow = ''; };
  }, []);
  const open = () => { dialog.current.showModal(); document.body.style.overflow = 'hidden'; };
  const button = 'rounded-full border border-white/25 px-5 py-3 text-sm transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-300';
  return <div className="mt-12" dir="ltr" role="region" aria-roledescription="carousel" aria-label={ar ? 'معرض المشاريع' : 'Project gallery'}>
    <div className="relative h-[430px] overflow-hidden md:h-[490px]" style={{ perspective: 1400 }}>
      {projects.map((item, index) => {
        let offset = index - active;
        if (offset > projects.length / 2) offset -= projects.length;
        if (offset < -projects.length / 2) offset += projects.length;
        const selected = index === active;
        return <motion.article key={item.id} aria-hidden={!selected}
          className="absolute left-[10%] top-5 w-[80%] md:left-[23%] md:w-[54%]"
          style={{ zIndex: projects.length - Math.abs(offset), touchAction: 'pan-y', pointerEvents: selected ? 'auto' : 'none' }}
          animate={{ x: `${offset * 88}%`, rotateY: reduced ? 0 : offset * -22, scale: selected ? 1 : 0.86, opacity: Math.abs(offset) > 1 ? 0 : selected ? 1 : 0.45 }}
          transition={reduced ? { duration: 0 } : { type: 'spring', stiffness: 210, damping: 27 }}
          drag={selected ? 'x' : false} dragConstraints={{ left: 0, right: 0 }} dragElastic={0.17}
          onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 450) go(info.offset.x < 0 ? 1 : -1); }}>
          <motion.div className="relative h-[390px] rounded-2xl border border-white/20 bg-[#111820] shadow-2xl md:h-[440px]"
            animate={{ rotateY: flipped && selected && !reduced ? 180 : 0 }} transition={{ duration: reduced ? 0 : 0.5 }} style={{ transformStyle: 'preserve-3d' }}>
            <div className="absolute inset-0 overflow-hidden rounded-2xl" style={{ backfaceVisibility: 'hidden', visibility: flipped && selected ? 'hidden' : 'visible' }}>
              <div className="relative h-[240px] md:h-[290px]"><Image src={item.screens[0].src} alt={item.screens[0].caption} fill sizes="(max-width: 768px) 80vw, 54vw" className="object-cover object-top" draggable={false}/></div>
              <div className="p-6"><span className="text-xs tracking-[0.2em] text-blue-200">{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span><h3 className="mt-3 font-display text-3xl text-white">{item.t}</h3></div>
            </div>
            {flipped && selected && <div dir={ar ? 'rtl' : 'ltr'} className="absolute inset-0 flex flex-col justify-center overflow-y-auto rounded-2xl bg-[#111820] p-7" style={{ transform: reduced ? undefined : 'rotateY(180deg)', backfaceVisibility: 'hidden' }}><h3 className="font-display text-3xl text-white">{item.t}</h3><p className="mt-5 text-base leading-7 text-white/80">{item.d}</p><p className="mt-5 text-sm leading-6 text-white/60">{item.note}</p></div>}
          </motion.div>
        </motion.article>;
      })}
    </div>
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button className={button} onClick={() => go(-1)} aria-label={ar ? 'المشروع السابق' : 'Previous project'}>←</button>
      <button className={button} onClick={() => setFlipped(!flipped)} aria-pressed={flipped}>{ar ? 'اقلب البطاقة' : 'Flip card'}</button>
      <button ref={opener} className={`${button} bg-blue-200 text-slate-950`} onClick={open}>{ar ? 'استكشف المشروع' : 'Explore project'}</button>
      <button className={button} onClick={() => go(1)} aria-label={ar ? 'المشروع التالي' : 'Next project'}>→</button>
    </div>
    <p aria-live="polite" className="mt-4 text-center text-sm text-white/60">{project.t} · {active + 1} / {projects.length}</p>
    <style>{`@keyframes gallery-open { from { opacity: 0; transform: translateY(24px) scale(.94); } to { opacity: 1; transform: translateY(0) scale(1); } } .project-gallery-dialog[open] { animation: gallery-open .35s cubic-bezier(.2,.8,.2,1); } @media (prefers-reduced-motion: reduce) { .project-gallery-dialog[open] { animation: none; } }`}</style>
    <dialog ref={dialog} onClick={(event) => { if(event.target === dialog.current) dialog.current.close(); }} className="project-gallery-dialog m-auto max-h-[92svh] w-[94vw] max-w-6xl overflow-auto rounded-2xl border border-white/20 bg-[#0e141c] p-0 text-white backdrop:bg-black/85">
      <motion.div initial={false} animate={{ opacity: 1 }} className="p-5 md:p-10" dir={ar ? 'rtl' : 'ltr'}>
        <div className="flex items-center justify-between gap-4"><h3 className="font-display text-3xl md:text-5xl">{project.t}</h3><button autoFocus className={button} onClick={() => dialog.current.close()}>{ar ? 'إغلاق' : 'Close'} ×</button></div>
        <p className="my-6 max-w-3xl leading-7 text-white/80">{project.d}</p>
        <div className="relative aspect-video overflow-hidden rounded-xl bg-black"><Image src={project.screens[screen].src} alt={project.screens[screen].caption} fill sizes="90vw" className="object-contain"/></div>
        <div className="my-4 flex flex-wrap gap-2">{project.screens.map((shot,i)=><button key={shot.src} onClick={()=>setScreen(i)} aria-pressed={screen===i} className={`${button} ${screen===i?'bg-white/15':''}`}>{shot.caption}</button>)}</div>
        <p className="my-5 text-sm leading-6 text-white/60">{project.note}</p>
        {project.href && <Link className="inline-block rounded-full bg-blue-200 px-6 py-3 text-slate-950" href={`/${locale}/work/${project.href}`}>{ar ? 'دراسة الحالة الكاملة' : 'Read full case study'} →</Link>}
      </motion.div>
    </dialog>
  </div>;
}
