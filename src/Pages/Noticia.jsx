import { Link, useParams } from 'react-router-dom';
import '../styles/Noticia.css';
import Noticia1 from '../assets/Noticia1.jpg';
import Noticia2 from '../assets/Noticia2.jpg';
import Noticia3 from '../assets/Noticia3.jpg';

const noticias = {
  1: {
    title: 'TOTVS e ESPM lançam pós-graduação em marketing com foco em IA e receita',
    summary: 'A parceria reforça a formação de profissionais para o futuro do mercado digital e tecnológico.',
    image: Noticia1,
    paragraphs: [
      'A Totvs, por meio da RD Station, firmou parceria com a ESPM para o lançamento de programas de pós-graduação voltados às novas demandas do mercado de marketing.',
      'A iniciativa prevê o desenvolvimento conjunto de grade e conteúdos, com foco em temas como inteligência artificial, geração de receita, experiência do cliente e crescimento.',
      'Ao todo, serão seis cursos, com formatos EAD, híbrido e presencial, direcionados a diferentes perfis — de empreendedores a executivos C-level.',
      'Entre os programas estão formações em Revenue Marketing, Next-Gen Agency, Inteligência Artificial aplicada ao marketing e um Global CMO Program, com aulas em São Paulo. Parte dos cursos será realizada em Florianópolis, incluindo disciplinas na sede da RD Station.',
      'Segundo Frederike Mette, diretora acadêmica de pós-graduação da ESPM, a proposta responde à transformação do setor. “O mercado demanda profissionais que consigam integrar estratégia, execução e tecnologia de forma consistente”, afirma.',
      'Para Luís Lourenço, diretor de novos negócios da RD Station, o movimento amplia o papel da companhia na formação do mercado. “Passamos a integrar a construção de programas acadêmicos, aproximando ainda mais teoria e prática”, diz.',
      'Profissionais da RD Station e da Totvs atuarão como professores e palestrantes, levando experiência operacional para os cursos.',
      'O lançamento oficial da parceria ocorre em 5 de maio, durante o Marketing Day da RD Station.'
    ],
  },
  2: {
    title: 'BTG e TOTVS: uma nova movimentação no mercado',
    summary: 'Confira os detalhes da movimentação envolvendo as empresas.',
    image: Noticia2,
    paragraphs: ['Maio começou e, como de costume, o BTG Pactual já atualizou a 10SIM, carteira mensal de ações recomendadas pelo banco.',
    'Para este mês, a Totvs (TOTS3) é a novidade, chegando para ocupar o lugar do Itaú (ITUB4), que deixa o portfólio de maneira estratégica.',
    'Com a mudança, o BTG reduz sua exposição aos grandes bancos tradicionais.',
    'Mas o que está por trás da escolha da Totvs (TOTS3) para compor a seleção do banco neste mês?',
    'Não é por acaso que a empresa de softwares foi selecionada pelo BTG Pactual.',
    'Segundo os analistas, as ações da Totvs caíram mais de 30% em relação ao pico registrado em janeiro, em meio aos temores de disrupção causada pela inteligência artificial, que desencadearam o movimento apelidado de “SaaSpocalypse”.',
    'Esse cenário levou a uma onda generalizada de vendas no setor de software, pressionando os papéis da companhia apesar do desempenho operacional consistentemente sólido.',
    'Após isso, a companhia passou a ser negociada a cerca de 15x P/L estimado para 2027.',
    'Um nível que, historicamente, coincide com os menores valuations em períodos de forte estresse, mesmo com resultados operacionais sólidos.',
    'Diante disso, a expectativa dos analistas é de crescimento relevante de receita recorrente e melhora contínua da rentabilidade, impulsionados pela própria operação.',
    'Com as ações negociando a níveis atrativos, a Totvs lançou em fevereiro um programa de recompra de 20 milhões de ações.',
    ' A companhia chegou a recomprar cerca de 1% do valor de mercado em março, a maior proporção entre as empresas da B3.',
    'A atividade foi interrompida pelo período de silêncio antes da divulgação de resultados. Porém, na visão dos analistas do banco, deve ser retomada e breve.',    '“Embora reconheçamos os riscos da IA, acreditamos que os desenvolvedores de ERP estão mais protegidos, dada à forte relação que mantêm com seus clientes.',
    'Agora você já sabe por que a Totvs é considerada uma ação promissora para este mês, mas ela não é a única recomendação do banco para investir agora.',
    ],
  },
  3: {
    title: 'Prêmio TOTVS Brasil',
    summary: 'Conheça o evento que celebra inovação e resultados.',
    image: Noticia3,
    paragraphs: [
      'Valorizando os esforços das empresas na jornada de digitalização e inovação, a TOTVS, maior empresa de tecnologia do Brasil, está com as inscrições abertas para a 5ª edição do Prêmio TOTVS Brasil que faz. Referência no setor de tecnologia, a premiação reconhece e dá protagonismo aos clientes que utilizam as tecnologias TOTVS como uma alavanca estratégica para impulsionar os negócios, por meio da digitalização e inovação.',
      'Empresas da região do ABC e Litoral Paulista, Vale do Paraíba e Sul de Minas Gerais, e que conquistaram resultados positivos em seus negócios com o apoio de soluções da TOTVS, podem inscrever seus cases de sucesso no site do prêmio.',
      'As empresas que utilizam soluções da TOTVS podem inscrever seus projetos em uma das 12 categorias do prêmio e também nas categorias especiais de RH, Marketing & Vendas e Inovação – Lei do Bem. Dentre todos os vencedores, um será escolhido como a Empresa do Ano.',
      'Para mais informações sobre a 5ª edição do Prêmio TOTVS Brasil que faz, acesse o site: premio.totvs.com. As inscrições são gratuitas e vão até o final de abril. Os vencedores serão anunciados no palco do Universo TOTVS 2026.',
      'Maior empresa de tecnologia do Brasil, a TOTVS cria soluções para potencializar a evolução das pessoas e das empresas. Com mais de 70 mil clientes no Brasil e em diversos países da América Latina, possui um ecossistema completo de tecnologia: TOTVS Gestão, com ERPs, soluções cross e sistemas especializados que garantem mais produtividade, eficiência e governança; RD Station, com ferramentas digitais de marketing, vendas e relacionamento para as empresas impulsionarem seus negócios e crescerem; e Techfin ERP Finance, que oferece soluções de crédito B2B e pagamento para ampliar, simplificar e democratizar o acesso das empresas a serviços financeiros. Nos últimos 5 anos, a TOTVS investiu R$3 bilhões em pesquisa e desenvolvimento, com destaque para Inteligência Artificial, buscando inovar cada vez mais para ser o trusted advisor de seus clientes. As empresas que movem o país confiam na TOTVS. O Brasil que faz, faz com TOTVS. Saiba mais em: http://www.totvs.com.br'
    ],
  },
};

export default function Noticia() {
  const { id } = useParams();
  const noticia = noticias[id] || noticias[1];

  return (
    <div className="news-layout-shell">
      <main className="news-shell-body">
        <article className="news-article-card">
          <h1>{noticia.title}</h1>

          <div className="news-page-content-wrap">
            <div className="news-page-content">
              {noticia.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

           <div className="news-visual">
              <img
                src={noticia.image}
                alt={noticia.title}
                className="news-visual-image"
              />
          </div>
          </div>
        </article>
      </main>

    
    </div>
  );
}