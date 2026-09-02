import type { Metadata } from 'next';
import './globals.css';
import './wizard.css';
export const metadata: Metadata={title:'Bússola | Adoção de IA',description:'Aplique as sete fases do framework de adoção de IA: diagnóstico, time, piloto, gargalos, adoção, governança e escala.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="pt-BR"><body>{children}</body></html>}
