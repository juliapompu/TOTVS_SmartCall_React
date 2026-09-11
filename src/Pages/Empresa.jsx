import React, { useState } from 'react';
import CompanyCard from '../Components/CompanyCard';
import CompanyDetailCard from '../Components/CompanyDetailCard';
import '../styles/Empresa.css';

// Logos
import itauLogo from '../assets/itau-logo.jpg';
import ambevLogo from '../assets/ambev-logo.jpeg';
import magaluLogo from '../assets/magazine-luiza-logo.png';
import localizaLogo from '../assets/localiza-logo.png';
import fleuryLogo from '../assets/grupo-fleury-logo.png';
import sebraeLogo from '../assets/sebrae-logo.jpg';
import assaiLogo from '../assets/assai-atacatista-logo.jfif';
import atacadaoLogo from '../assets/atacadao-logo.png';
import muffatoLogo from '../assets/grupomuffato_logo.jfif';
import martMinasLogo from '../assets/mart-minas-logo.png';
import arklokLogo from '../assets/arklok-logo.jpg';
import makroLogo from '../assets/makro-engenharia-logo.png';

export default function Empresa() {

  // Empresa selecionada para abrir o modal
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Texto da pesquisa
  const [search, setSearch] = useState('');

  // =====================================================
  // EMPRESAS
  // =====================================================

  const companies = [

    // =====================================================
    // ITAÚ
    // =====================================================
    {
      id: 1,
      name: 'Itaú Unibanco',
      logo: itauLogo,
      people: ['Ana Paula', 'Bruno Silva'],
      location: 'São Paulo/SP',
      tagline: 'Banco líder em serviços financeiros',
      sector: 'Serviços Financeiros',
      founded: '1945',
      website: 'https://www.itau.com.br',

      description:
        'Itaú Unibanco entrega soluções bancárias digitais e corporativas para milhões de clientes, com foco em inovação, segurança e atendimento personalizado.',

      highlights: [
        'Bancos Digitais',
        'Pagamentos',
        'Gestão de Caixa'
      ],

      focusAreas: [
        'Fintech',
        'Cartões',
        'Empresas'
      ],

      meetings: [
        {
          id: 1,
          title: 'Reunião de alinhamento comercial',
          date: '10/05/2026',
          time: '14:30',
          participants: ['Ana Paula', 'Bruno Silva'],
          transcription:
            'Durante a reunião foram discutidas novas oportunidades de integração entre os sistemas da empresa e as soluções TOTVS.'
        },
        {
          id: 2,
          title: 'Apresentação de soluções',
          date: '18/05/2026',
          time: '10:00',
          participants: ['Ana Paula', 'Carlos Mendes'],
          transcription:
            'Foi realizada uma apresentação das soluções disponíveis. A equipe demonstrou interesse nas ferramentas de análise de dados e automação.'
        }
      ]
    },

    // =====================================================
    // AMBEV
    // =====================================================
    {
      id: 2,
      name: 'Ambev',
      logo: ambevLogo,
      people: ['Carlos Edu', 'Daniela M.'],
      location: 'Rio de Janeiro/RJ',
      tagline: 'Referência em bebidas e varejo',
      sector: 'Consumo',
      founded: '1999',
      website: 'https://www.ambev.com.br',

      description:
        'Ambev é uma das maiores fabricantes de bebidas do Brasil, combinando escala, sustentabilidade e inovação.',

      highlights: [
        'Sustentabilidade',
        'Distribuição',
        'Branding'
      ],

      focusAreas: [
        'Bebidas',
        'Logística',
        'Comércio'
      ],

      meetings: [
        {
          id: 1,
          title: 'Reunião sobre logística',
          date: '08/05/2026',
          time: '09:30',
          participants: ['Carlos Edu', 'Daniela M.'],
          transcription:
            'A equipe discutiu melhorias na logística e distribuição dos produtos, buscando reduzir custos e aumentar a eficiência operacional.'
        },
        {
          id: 2,
          title: 'Planejamento estratégico',
          date: '22/05/2026',
          time: '11:00',
          participants: ['Daniela M.', 'Ricardo Alves'],
          transcription:
            'Foram discutidas estratégias para expansão e utilização de novas tecnologias nos processos internos.'
        }
      ]
    },

    // =====================================================
    // MAGAZINE LUIZA
    // =====================================================
    {
      id: 3,
      name: 'Magazine Luiza',
      logo: magaluLogo,
      people: ['Elaine S.', 'Fabio J.'],
      location: 'São Paulo/SP',
      tagline: 'E-commerce e varejo omnichannel',
      sector: 'Varejo',
      founded: '1957',
      website: 'https://www.magazineluiza.com.br',

      description:
        'Magazine Luiza une loja física e digital para oferecer uma experiência de compra integrada.',

      highlights: [
        'Omnichannel',
        'Marketplace',
        'Digital'
      ],

      focusAreas: [
        'E-commerce',
        'Tecnologia',
        'Vendas'
      ],

      meetings: [
        {
          id: 1,
          title: 'Reunião sobre e-commerce',
          date: '15/05/2026',
          time: '13:00',
          participants: ['Elaine S.', 'Fabio J.'],
          transcription:
            'A reunião discutiu melhorias na experiência digital e novas oportunidades para o comércio eletrônico.'
        }
      ]
    },

    // =====================================================
    // LOCALIZA
    // =====================================================
    {
      id: 4,
      name: 'Localiza',
      logo: localizaLogo,
      people: ['Gisele R.', 'Hugo V.'],
      location: 'Belo Horizonte/MG',
      tagline: 'Mobilidade e aluguel de veículos',
      sector: 'Transporte',
      founded: '1973',
      website: 'https://www.localiza.com',

      description:
        'Localiza oferece soluções de mobilidade para pessoas e empresas.',

      highlights: [
        'Aluguel de Carros',
        'Frota',
        'Tecnologia'
      ],

      focusAreas: [
        'Mobilidade',
        'Fleet Management',
        'Logística'
      ],

      meetings: [
        {
          id: 1,
          title: 'Reunião sobre gestão de frota',
          date: '20/05/2026',
          time: '15:00',
          participants: ['Gisele R.', 'Hugo V.'],
          transcription:
            'Foram discutidas estratégias para melhorar a gestão da frota e utilizar tecnologia para aumentar a eficiência operacional.'
        }
      ]
    },

    // =====================================================
    // GRUPO FLEURY
    // =====================================================
    {
      id: 5,
      name: 'Grupo Fleury',
      logo: fleuryLogo,
      people: ['Igor L.', 'Julia T.'],
      location: 'São Paulo/SP',
      tagline: 'Saúde diagnóstica de ponta',
      sector: 'Saúde',
      founded: '1926',
      website: 'https://www.fleury.com.br',

      description:
        'O Grupo Fleury combina centros de excelência, tecnologia médica e atendimento humanizado.',

      highlights: [
        'Diagnóstico',
        'Pesquisa',
        'Inovação'
      ],

      focusAreas: [
        'Saúde',
        'Laboratórios',
        'Bem-estar'
      ],

      // REUNIÕES DO GRUPO FLEURY
      meetings: [
        {
          id: 1,
          title: 'Reunião sobre inovação',
          date: '12/05/2026',
          time: '16:00',
          participants: [
            'Igor L.',
            'Julia T.'
          ],
          transcription:
            'A reunião abordou oportunidades de inovação e utilização de tecnologia para melhorar os processos de atendimento e diagnóstico.'
        },

        {
          id: 2,
          title: 'Apresentação de resultados',
          date: '29/05/2026',
          time: '14:00',
          participants: [
            'Julia T.',
            'Fernanda Lima'
          ],
          transcription:
            'Foram apresentados os resultados do período e discutidas oportunidades para melhorar a eficiência dos processos.'
        },

        {
          id: 3,
          title: 'Reunião de acompanhamento',
          date: '15/06/2026',
          time: '10:30',
          participants: [
            'Igor L.',
            'Julia T.',
            'Marcos Silva'
          ],
          transcription:
            'A equipe avaliou o andamento das ações definidas anteriormente e estabeleceu os próximos passos do projeto.'
        }
      ]
    },

    // =====================================================
    // SEBRAE
    // =====================================================
    {
      id: 6,
      name: 'SEBRAE',
      logo: sebraeLogo,
      people: ['Katia M.', 'Leo N.'],
      location: 'Brasília/DF',
      tagline: 'Apoio a micro e pequenas empresas',
      sector: 'Educação',
      founded: '1972',
      website: 'https://www.sebrae.com.br',

      description:
        'O SEBRAE promove empreendedorismo e capacitação para pequenos negócios.',

      highlights: [
        'Empreendedorismo',
        'Capacitação',
        'Consultoria'
      ],

      focusAreas: [
        'PME',
        'Treinamento',
        'Inovação'
      ],

      meetings: []
    },

    // =====================================================
    // ASSAÍ
    // =====================================================
    {
      id: 7,
      name: 'Assaí Atacadista',
      logo: assaiLogo,
      people: ['Marta P.', 'Nuno G.'],
      location: 'São Paulo/SP',
      tagline: 'Atacado forte para varejo e indústrias',
      sector: 'Atacado',
      founded: '1974',
      website: 'https://www.assai.com.br',

      description:
        'Assaí oferece preços competitivos e amplo sortimento para comércio e indústria.',

      highlights: [
        'Preços Baixos',
        'Sortimento',
        'Logística'
      ],

      focusAreas: [
        'Atacado',
        'Bens de Consumo',
        'Supply Chain'
      ],

      meetings: [
        {
          id: 1,
          title: 'Reunião sobre distribuição',
          date: '05/06/2026',
          time: '10:00',
          participants: ['Marta P.', 'Nuno G.'],
          transcription:
            'A reunião teve como foco a distribuição de produtos e oportunidades de melhoria na cadeia de abastecimento.'
        }
      ]
    },

    // =====================================================
    // ATACADÃO
    // =====================================================
    {
      id: 8,
      name: 'Atacadão',
      logo: atacadaoLogo,
      people: ['Otávio S.', 'Paula F.'],
      location: 'São Paulo/SP',
      tagline: 'Rede de atacarejo para varejo e PME',
      sector: 'Atacado',
      founded: '1960',
      website: 'https://www.atacadao.com.br',

      description:
        'Atacadão atende comerciantes e consumidores com grande variedade de produtos.',

      highlights: [
        'Atacarejo',
        'Variedade',
        'Economia'
      ],

      focusAreas: [
        'Varejo',
        'Distribuição',
        'Compras'
      ],

      meetings: []
    },

    // =====================================================
    // GRUPO MUFFATO
    // =====================================================
    {
      id: 9,
      name: 'Grupo Muffato',
      logo: muffatoLogo,
      people: ['Quiteria L.', 'Ruan K.'],
      location: 'Cascavel/PR',
      tagline: 'Supermercados e distribuição regional',
      sector: 'Varejo',
      founded: '1979',
      website: 'https://www.muffato.com.br',

      description:
        'Grupo Muffato atua no varejo alimentar e atacarejo.',

      highlights: [
        'Supermercado',
        'Atacado',
        'Inovação'
      ],

      focusAreas: [
        'Alimentação',
        'Varejo',
        'Experiência'
      ],

      meetings: []
    },

    // =====================================================
    // MART MINAS
    // =====================================================
    {
      id: 10,
      name: 'Mart Minas',
      logo: martMinasLogo,
      people: ['Soraia B.', 'Tito A.'],
      location: 'Minas Gerais/MG',
      tagline: 'Rede de atacado para compras em grande volume',
      sector: 'Atacado',
      founded: '1978',
      website: 'https://www.martminas.com.br',

      description:
        'Mart Minas oferece soluções de abastecimento para comerciantes e indústrias.',

      highlights: [
        'Atacado',
        'Parcerias',
        'Produtos'
      ],

      focusAreas: [
        'Agronegócio',
        'Comércio',
        'Distribuição'
      ],

      meetings: []
    },

    // =====================================================
    // ARKLOK
    // =====================================================
    {
      id: 11,
      name: 'Arklok',
      logo: arklokLogo,
      people: ['Uriel D.', 'Vera C.'],
      location: 'Curitiba/PR',
      tagline: 'Engenharia e soluções industriais',
      sector: 'Indústria',
      founded: '2005',
      website: 'https://www.arklok.com.br',

      description:
        'Arklok desenvolve projetos de engenharia industrial e sistemas de controle.',

      highlights: [
        'Engenharia',
        'Automação',
        'Projetos'
      ],

      focusAreas: [
        'Indústria',
        'Energia',
        'Automação'
      ],

      meetings: []
    },

    // =====================================================
    // MAKRO
    // =====================================================
    {
      id: 12,
      name: 'Makro Engenharia',
      logo: makroLogo,
      people: ['Wagner X.', 'Yara Z.'],
      location: 'São Paulo/SP',
      tagline: 'Soluções de engenharia para construção pesada',
      sector: 'Engenharia',
      founded: '1990',
      website: 'https://www.makroengenharia.com.br',

      description:
        'Makro Engenharia atua em projetos de infraestrutura e construção pesada.',

      highlights: [
        'Infraestrutura',
        'Obras',
        'Qualidade'
      ],

      focusAreas: [
        'Construção',
        'Manutenção',
        'Segurança'
      ],

      meetings: []
    }
  ];

  // =====================================================
  // FILTRO DA PESQUISA
  // =====================================================

  const searchText = search.toLowerCase().trim();

  const filteredCompanies = companies.filter((company) => {

    if (!searchText) {
      return true;
    }

    return (
      company.name.toLowerCase().includes(searchText) ||
      company.sector.toLowerCase().includes(searchText) ||
      company.location.toLowerCase().includes(searchText) ||
      company.people.join(' ').toLowerCase().includes(searchText)
    );
  });

  // =====================================================
  // INTERFACE
  // =====================================================

  return (
    <div className="empresa-page">

      <h1 className="empresa-title">
        Empresas Parceiras:
      </h1>

      {/* PESQUISA */}

      <div className="empresa-search-container">

        <input
          type="text"
          className="empresa-search"
          placeholder="Pesquise uma empresa..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CATÁLOGO */}

      <div className="empresa-catalog">

        {filteredCompanies.map((company) => (

          <CompanyCard
            key={company.id}
            company={company}
            onClick={() => setSelectedCompany(company)}
          />

        ))}

      </div>

      {/* NENHUM RESULTADO */}

      {filteredCompanies.length === 0 && (

        <div className="empresa-no-results">

          <h3>
            Nenhuma empresa encontrada
          </h3>

          <p>
            Tente pesquisar por outro nome, setor ou localização.
          </p>

        </div>

      )}

      {/* MODAL */}

      {selectedCompany && (

        <CompanyDetailCard
          company={selectedCompany}
          onClose={() => setSelectedCompany(null)}
        />

      )}

    </div>
  );
}