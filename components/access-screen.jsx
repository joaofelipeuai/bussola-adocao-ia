import {LockKeyhole,LogIn,LogOut} from 'lucide-react';

export default function AccessScreen({user,signInPath}) {
  const denied = Boolean(user);
  return <main className="access-page"><section className="access-card" aria-labelledby="access-title">
    <div className="access-brand">Bússola<span>ADOÇÃO DE IA</span></div>
    <span className="access-symbol"><LockKeyhole size={25}/></span>
    <p className="eyebrow">ACESSO RESTRITO</p>
    <h1 id="access-title">{denied?'Esta conta não tem acesso.':'Seu próximo passo começa aqui.'}</h1>
    <p>{denied?'Entre com a conta autorizada ou solicite acesso ao responsável pelo site.':'Entre com sua conta do ChatGPT para acessar o planejamento de adoção de IA.'}</p>
    {denied&&<p className="access-identity">Conta atual: <strong>{user.email}</strong></p>}
    <a className="access-action" href={denied?'/signout-with-chatgpt?return_to=%2F':signInPath} target="_top">{denied?<LogOut size={17}/>:<LogIn size={17}/>} {denied?'Sair e trocar de conta':'Entrar com o ChatGPT'}</a>
    <p className="access-footnote">{denied?'O conteúdo do planejamento não foi carregado.':'Somente contas autorizadas podem abrir o wizard. Suas respostas ficam neste navegador.'}</p>
  </section></main>;
}
