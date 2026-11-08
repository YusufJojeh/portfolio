'use client';
import { Component, useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { useReducedMotion, useInView } from 'framer-motion';
import { useForcedReducedMotion } from '../engine/motionPref';
import styles from './SpatialProjects.module.css';
const Orbit=dynamic(()=>import('./ProjectOrbit'),{ssr:false});
const works=[
 {slug:'rakez',name:'Real estate operations',tag:'ERP / CRM',stack:'Laravel · Vue.js · MySQL',image:'/portfolio/work/rakez/app/sales-reservation-operations.webp',description:'Production ERP/CRM for a Saudi real-estate business. Full-stack delivery, AI integrations, architecture decisions, and frontend code review.'},
 {slug:'crma',name:'Customer operations',tag:'Business systems',stack:'Laravel · APIs · Automation',image:'/portfolio/work/crma/pipeline.webp',description:'Business workflows brought into one operational interface. Explore the system, its architecture, and implementation.'},
 {slug:'dhura',name:'Executive intelligence',tag:'Decision support',stack:'Full-stack engineering',image:'/portfolio/work/dhura/app/executive-overview.webp',description:'An executive view of business operations. Explore the dashboards, workflows, and engineering behind the system.'},
 {slug:'prospectiq',name:'Lead intelligence',tag:'Applied AI',stack:'Python · FastAPI · React.js',image:'/portfolio/work/prospectiq/app/operational-lead-intelligence-dashboard.webp',description:'Lead research and LLM scoring inside an operational workflow. A Python backend connected to a full-stack workspace.'},
 {slug:'restocafe',name:'Restaurant operations',tag:'Business systems',stack:'NestJS · React.js · Redis',image:'/portfolio/more/restocafe/kitchen.webp',description:'Restaurant operations across connected workflows. Explore the kitchen interface and the backend that supports it.'},
];
class SceneBoundary extends Component {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 render(){return this.state.failed?this.props.fallback:this.props.children;}
}
export default function SpatialProjects(){
 const locale=useLocale(),arabic=locale==='ar';const [active,setActive]=useState(0),[enabled,setEnabled]=useState(false),[paused,setPaused]=useState(false);
 const reduced=useReducedMotion(),forced=useForcedReducedMotion(),ref=useRef(null),start=useRef(0);const visible=useInView(ref,{margin:'200px'});const work=works[active];
 useEffect(()=>{try {const c=document.createElement('canvas');setEnabled(Boolean(c.getContext('webgl2')));}catch{setEnabled(false);}},[]);
 const still=<div className={styles.still}><Image src={work.image} alt={work.name+' interface'} fill priority sizes="(max-width: 700px) 95vw, 70vw" className={styles.screenImage}/></div>;
 return <section className={styles.world} ref={ref} lang="en" dir="ltr" aria-label="Selected projects">
  <header className={styles.intro}>
   <div className={styles.identity}><span>Yusuf Jojeh</span><span>Backend & Applied AI Engineer</span></div>
   <h1>I turn business<br/><span className={styles.outline}>complexity</span><br/>into working systems.</h1>
   <div className={styles.statement}><p>From the interface to the API.<br/>From an AI agent to a safe payment.</p><a href="#project-theatre">Explore my work <span aria-hidden="true">↘</span></a></div>
  </header>
  <div className={styles.theatre} id="project-theatre">
   <div className={styles.theatreTop}><span>Selected systems</span><button type="button" onClick={()=>setPaused(!paused)} aria-pressed={paused}>{paused?'Enable 3D':'Still view'}</button></div>
   <div className={styles.backdrop} aria-hidden="true">{work.tag}</div>
   <div className={styles.stage} onPointerDown={e=>{start.current=e.clientX;}} onPointerUp={e=>{const delta=e.clientX-start.current;if(Math.abs(delta)>50)setActive((active+(delta<0?1:works.length-1))%works.length);}}>
    {enabled&&!reduced&&!forced&&!paused&&visible?<SceneBoundary fallback={still}><Orbit works={works} active={active} onSelect={setActive}/></SceneBoundary>:still}
   </div>
   <div className={styles.selection} aria-label="Choose a project">{works.map((w,i)=><button id={w.slug} type="button" key={w.slug} aria-pressed={i===active} onClick={()=>setActive(i)}>{w.name}</button>)}</div>
   <div className={styles.detail} aria-live="polite"><div><p>{work.stack}</p><h2>{work.name}</h2></div><p>{work.description}</p><Link href={`/${locale}/work/${work.slug}`}>{arabic?'عرض المشروع':'Explore project'} <span aria-hidden="true">↗</span></Link></div>
  </div>
  <div className={styles.disciplines}><span>Backend engineering</span><span>Applied AI</span><span>Full-stack delivery</span><span>Technical leadership</span></div>
 </section>;
}
