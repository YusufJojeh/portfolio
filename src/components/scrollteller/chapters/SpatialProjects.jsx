'use client';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useReducedMotion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
const WORK = [
 ['crma','crmaTeaser','/portfolio/work/crma/pipeline.webp','#6fa6ff'],
 ['dhura','dhura','/portfolio/work/dhura/app/executive-overview.webp','#79d7c4'],
 ['prospectiq','prospectiq','/portfolio/work/prospectiq/app/operational-lead-intelligence-dashboard.webp','#b8a0ff'],
 ['restocafe','restocafe','/portfolio/more/restocafe/kitchen.webp','#e6b983'],
];
function Exhibit({ slug, namespace, image, accent, reverse }) {
 const ref=useRef(null); const t=useTranslations(`final.${namespace}`); const locale=useLocale(); const reduced=useReducedMotion();
 const {scrollYProgress}=useScroll({target:ref,offset:['start end','end start']});
 const pitch=useTransform(scrollYProgress,[0,.5,1],[16,0,-10]);
 const drift=useTransform(scrollYProgress,[0,1],[65,-65]);
 const mx=useMotionValue(0),my=useMotionValue(0);
 const rx=useSpring(my,{stiffness:120,damping:24}),ry=useSpring(mx,{stiffness:120,damping:24});
 function move(e){if(reduced||e.pointerType!=='mouse')return;const b=e.currentTarget.getBoundingClientRect();mx.set(((e.clientX-b.left)/b.width-.5)*12);my.set(-((e.clientY-b.top)/b.height-.5)*8);}
 return <section ref={ref} id={slug} className="relative isolate overflow-hidden px-6 py-24 md:px-16 md:py-36" style={{'--exhibit-accent':accent}}>
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-20" style={{background:`radial-gradient(ellipse at ${reverse?'25%':'75%'} 45%, ${accent}, transparent 55%)`}}/>
  <div className={`mx-auto grid max-w-[1440px] items-center gap-14 lg:grid-cols-[.8fr_1.4fr] ${reverse?'lg:[&>header]:order-2':''}`}>
   <header className="relative z-10"><p className="mb-6 text-xs uppercase tracking-[.2em]" style={{color:accent}}>{t('kicker')}</p><h2 className="font-display text-5xl leading-none md:text-7xl">{t('title')}</h2><p className="mt-7 max-w-lg text-lg leading-8 text-cinema-text/75">{t('lede')}</p><Link href={`/${locale}/work/${slug}`} className="mt-8 inline-flex items-center gap-5 rounded-full border border-white/25 px-6 py-4 transition-colors hover:bg-white/10 focus-visible:outline focus-visible:outline-blue-300">{t('cta')} <span aria-hidden="true">↗</span></Link></header>
   <div onPointerMove={move} onPointerLeave={()=>{mx.set(0);my.set(0);}} className="relative py-12" style={{perspective:1600}}>
    <motion.div style={{rotateX:reduced?0:pitch,y:reduced?0:drift,transformStyle:'preserve-3d'}}>
     <motion.div style={{rotateX:reduced?0:rx,rotateY:reduced?0:ry,transformStyle:'preserve-3d'}}>
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl border border-white/15" style={{transform:'translateZ(-60px) translate(22px,28px)',background:'#101720'}}/>
      <div aria-hidden="true" className="absolute inset-0 rounded-2xl border" style={{transform:'translateZ(-30px) translate(11px,14px)',borderColor:accent+'55',background:'#131c27'}}/>
      <Link href={`/${locale}/work/${slug}`} aria-label={t('cta')} className="relative block overflow-hidden rounded-2xl border border-white/25 bg-[#10151c] shadow-[0_35px_90px_rgba(0,0,0,.65)] focus-visible:outline focus-visible:outline-blue-300" style={{transform:'translateZ(20px)'}}>
       <div className="flex items-center justify-between border-b border-white/10 px-5 py-3"><span className="text-xs tracking-[.14em] text-white/60">{t('title')}</span><span style={{color:accent}} aria-hidden="true">✦</span></div>
       <div className="relative aspect-[16/10]"><Image src={image} alt={t('imageAlt')} fill sizes="(max-width: 1024px) 90vw, 60vw" className="object-cover object-top"/></div>
      </Link>
     </motion.div>
    </motion.div>
   </div>
  </div>
 </section>;
}
export default function SpatialProjects(){return <div>{WORK.map(([slug,namespace,image,accent],i)=><Exhibit key={slug} slug={slug} namespace={namespace} image={image} accent={accent} reverse={i%2===1}/>)}</div>;}
