import Looks3Icon from '@mui/icons-material/Looks3';
import Looks4Icon from '@mui/icons-material/Looks4';
import Looks5Icon from '@mui/icons-material/Looks5';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';

const topClients = ['Itaú Unibanco', 'Ambev', 'Magazine Luiza', 'Grupo Fleury', 'Localiza'];
const topProducts = ['TOTVS Protheus', 'TOTVS RM', 'TOTVS Fluig', 'TOTVS Datasul', 'TOTVS Mega'];
const topEmployees = ['Ricardo Souza', 'Fernanda Lima', 'Marcos Oliveira', 'Juliana Costa', 'André Santos'];

const rankingGroups = [
  { title: 'Top 5 clientes', names: topClients },
  { title: 'Top 5 produtos', names: topProducts },
  { title: 'Top 5 colaboradores', names: topEmployees },
];

const rankingIcons = [LooksOneIcon, LooksTwoIcon, Looks3Icon, Looks4Icon, Looks5Icon];

export const Ranking = () => (
  <section className="ranking-section" id="ranking">
    <div className="content-width">
      <h2 className="section-heading">Ranking</h2>
      <p className="section-copy">
        Receba insights da sua reunião com facilidade no Smart Call. Envie a
        transcrição da sua reunião, tenha os seus tópicos anotados e explicados.
      </p>
      <div className="ranking-grid">
        {rankingGroups.map((group, index) => {
          const isMiddle = index === 1;

          return (
            <article
              className={`ranking-card${isMiddle ? ' ranking-card--middle' : ''}`}
              key={`${group.title}-${index}`}
            >
              <div className="ranking-card__wave ranking-card__wave--top" aria-hidden="true">
                <svg viewBox="0 0 500 200" preserveAspectRatio="none">
                  {isMiddle ? (
                    <path
                      d="M0,0 L500,0 L500,165 C400,165 310,135 240,80 C190,40 140,5 90,5 C40,5 0,45 0,110 Z"
                      fill="var(--accent-color)"
                    />
                  ) : (
                    <path
                      d="M0,0 L500,0 L500,110 C500,45 460,5 410,5 C360,5 310,40 260,80 C190,135 100,165 0,165 Z"
                      fill="var(--accent-color)"
                    />
                  )}
                </svg>
              </div>
              <div className="ranking-card__wave ranking-card__wave--bottom" aria-hidden="true">
                <svg viewBox="0 0 500 160" preserveAspectRatio="none">
                  {isMiddle ? (
                    <path
                      d="M0,120 C140,120 220,100 320,50 C370,25 430,5 470,5 C490,5 500,15 500,30 L500,160 L0,160 Z"
                      fill="var(--secondary-color)"
                    />
                  ) : (
                    <path
                      d="M0,30 C0,15 10,5 30,5 C70,5 130,25 180,50 C280,100 360,120 500,120 L500,160 L0,160 Z"
                      fill="var(--secondary-color)"
                    />
                  )}
                </svg>
              </div>
              <div className="ranking-card__content">
                <h3>{group.title}</h3>
                <ol>
                  {group.names.map((name, position) => {
                    const RankIcon = rankingIcons[position];

                    return (
                      <li key={name}>
                        <span className="ranking-position">
                          {RankIcon && <RankIcon role="img" aria-label={`${position + 1}º lugar`} />}
                        </span>
                        <span className="ranking-client">{name}</span>
                      </li>
                    );
                  })}
                </ol>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  </section>
);