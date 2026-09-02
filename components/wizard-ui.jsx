'use client';
import {Info} from 'lucide-react';
import {Checkbox} from '@/components/ui/checkbox';
export function Field({label,children,hint}){return <label className="field">{label}{children}{hint&&<small className="muted">{hint}</small>}</label>}
export function Notice({children,tone='info'}){return <div className={'notice '+tone}><Info size={16}/><div>{children}</div></div>}
export function Select({value,onChange,options,label}){return <select aria-label={label} value={value} onChange={e=>onChange(e.target.value)}>{options.map(o=><option key={Array.isArray(o)?o[0]:o} value={Array.isArray(o)?o[0]:o}>{Array.isArray(o)?o[1]:o}</option>)}</select>}
export function CheckItem({checked,onChange,title,children}){return <label className="check-item"><Checkbox checked={checked} onCheckedChange={onChange}/><span><strong>{title}</strong>{children&&<small>{children}</small>}</span></label>}
export function download(name,data,type){const url=URL.createObjectURL(new Blob([data],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)}
