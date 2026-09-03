import type { Metadata } from 'next';
import './globals.css';
import './wizard.css';
import './askblue.css';
import './v2.css';
const title='Bússola v2 | Adoção de IA';
const description='Planeje a adoção de IA em sete fases, com pilotos mensuráveis, cinco métricas DORA, autonomia de agentes e governança atualizada.';
const origin='https://bussola-adocao-ia.joaofelipesouza.chatgpt.site';
export const metadata: Metadata={metadataBase:new URL(origin),title,description,icons:{icon:'/favicon.svg'},openGraph:{title,description,type:'website',locale:'pt_BR',url:origin,images:[{url:origin+'/og.png',width:1731,height:909,alt:'askblue | Bússola — Framework de Adoção de IA'}]},twitter:{card:'summary_large_image',title,description,images:[origin+'/og.png']}};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}

