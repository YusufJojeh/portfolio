 'use client';
import { useState } from 'react';
export default function ContactForm() {
 const [ready,setReady]=useState(false);
 function submit(event) {
  event.preventDefault(); const data=new FormData(event.currentTarget);
  const body=`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nCompany: ${data.get('company')}\n\n${data.get('message')}`;
  window.location.href=`mailto:yusufmohammdjojeh@gmail.com?subject=${encodeURIComponent(data.get('topic'))}&body=${encodeURIComponent(body)}`;
  setReady(true);
 }
 return <section id="contact-form" lang="en" dir="ltr" className="mx-auto max-w-3xl px-6 py-24">
 <h2 className="font-display text-4xl">Let’s discuss the work.</h2>
 <p className="mt-4 text-cinema-muted">Remote roles, GCC relocation, and engineering projects. This form prepares an email in your email app.</p>
 <form onSubmit={submit} className="mt-8 grid gap-5">
 {['name','email','company'].map(name=><label key={name} className="grid gap-2 capitalize">{name}{name!=='company'?' *':''}<input className="rounded border border-white/20 bg-white/5 p-3" name={name} type={name==='email'?'email':'text'} required={name!=='company'} maxLength={200}/></label>)}
 <label className="grid gap-2">Subject *<select name="topic" className="rounded border border-white/20 bg-slate-900 p-3"><option>Remote engineering role</option><option>GCC relocation opportunity</option><option>Engineering project</option></select></label>
 <label className="grid gap-2">Message *<textarea name="message" required rows={6} maxLength={5000} className="rounded border border-white/20 bg-white/5 p-3"/></label>
 <button className="rounded bg-blue-300 px-6 py-3 font-semibold text-slate-950" type="submit">Prepare email</button>
 {ready&&<p role="status">Your email app was requested. Review and send your message there. You can also email yusufmohammdjojeh@gmail.com directly.</p>}
 </form></section>;
}
