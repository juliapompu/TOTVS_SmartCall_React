import itauLogo from '../assets/images/companies/itau-logo.jpg';
import ambevLogo from '../assets/images/companies/ambev-logo.jpeg';
import magaluLogo from '../assets/images/companies/magazine-luiza-logo.png';
import localizaLogo from '../assets/images/companies/localiza-logo.png';
import fleuryLogo from '../assets/images/companies/grupo-fleury-logo.png';
import sebraeLogo from '../assets/images/companies/sebrae-logo.jpg';
import assaiLogo from '../assets/images/companies/assai-atacatista-logo.jfif';
import atacadaoLogo from '../assets/images/companies/atacadao-logo.png';
import muffatoLogo from '../assets/images/companies/grupomuffato_logo.jfif';
import martMinasLogo from '../assets/images/companies/mart-minas-logo.png';
import arklokLogo from '../assets/images/companies/arklok-logo.jpg';
import makroLogo from '../assets/images/companies/makro-engenharia-logo.png';
import type { Company } from '../types/company';

export const companiesApiResponse: Company[] = [
  {
    id: 1,
    name: 'Itaú Unibanco',
    logoUrl: itauLogo,
    meetingsCount: 2,
    people: ['Ana Paula', 'Bruno Silva'],
    location: 'São Paulo/SP',
    tagline: 'Banco líder em serviços financeiros',
    sector: 'Serviços Financeiros',
    website: 'https://www.itau.com.br',
    description: 'Itaú Unibanco entrega soluções bancárias digitais e corporativas para milhões de clientes, com foco em inovação, segurança e atendimento personalizado.',
    highlights: ['Bancos Digitais', 'Pagamentos', 'Gestão de Caixa'],
    focusAreas: ['Fintech', 'Cartões', 'Empresas'],
    createdAt: '2026-01-10T10:00:00.000Z',
    meetings: [
      {
        id: 101,
        title: 'Reunião de alinhamento comercial',
        dateTime: '2026-05-10T14:30:00.000Z',
        participants: ['Ana Paula', 'Bruno Silva'],
        transcription: 'Durante a reunião foram discutidas novas oportunidades de integração entre os sistemas da empresa e as soluções TOTVS.'
      },
      {
        id: 102,
        title: 'Apresentação de soluções',
        dateTime: '2026-05-18T10:00:00.000Z',
        participants: ['Ana Paula', 'Carlos Mendes'],
        transcription: 'Foi realizada uma apresentação das soluções disponíveis. A equipe demonstrou interesse nas ferramentas de análise de dados e automação.'
      }
    ]
  },
  {
    id: 2,
    name: 'Ambev',
    logoUrl: ambevLogo,
    meetingsCount: 2,
    people: ['Carlos Edu', 'Daniela M.'],
    location: 'Rio de Janeiro/RJ',
    tagline: 'Referência em bebidas e varejo',
    sector: 'Consumo',
    website: 'https://www.ambev.com.br',
    description: 'Ambev é uma das maiores fabricantes de bebidas do Brasil, combinando escala, sustentabilidade e inovação.',
    highlights: ['Sustentabilidade', 'Distribuição', 'Branding'],
    focusAreas: ['Bebidas', 'Logística', 'Comércio'],
    createdAt: '2026-01-12T11:00:00.000Z',
    meetings: [
      {
        id: 201,
        title: 'Reunião sobre logística',
        dateTime: '2026-05-08T09:30:00.000Z',
        participants: ['Carlos Edu', 'Daniela M.'],
        transcription: 'A equipe discutiu melhorias na logística e distribuição dos produtos, buscando reduzir custos e aumentar a eficiência operacional.'
      },
      {
        id: 202,
        title: 'Planejamento estratégico',
        dateTime: '2026-05-22T11:00:00.000Z',
        participants: ['Daniela M.', 'Ricardo Alves'],
        transcription: 'Foram discutidas estratégias para expansão e utilização de novas tecnologias nos processos internos.'
      }
    ]
  },
  {
    id: 3,
    name: 'Magazine Luiza',
    logoUrl: magaluLogo,
    meetingsCount: 1,
    people: ['Elaine S.', 'Fabio J.'],
    location: 'São Paulo/SP',
    tagline: 'E-commerce e varejo omnichannel',
    sector: 'Varejo',
    website: 'https://www.magazineluiza.com.br',
    description: 'Magazine Luiza une loja física e digital para oferecer uma experiência de compra integrada.',
    highlights: ['Omnichannel', 'Marketplace', 'Digital'],
    focusAreas: ['E-commerce', 'Tecnologia', 'Vendas'],
    createdAt: '2026-01-15T08:30:00.000Z',
    meetings: [
      {
        id: 301,
        title: 'Reunião sobre e-commerce',
        dateTime: '2026-05-15T13:00:00.000Z',
        participants: ['Elaine S.', 'Fabio J.'],
        transcription: 'A reunião discutiu melhorias na experiência digital e novas oportunidades para o comércio eletrônico.'
      }
    ]
  },
  {
    id: 4,
    name: 'Localiza',
    logoUrl: localizaLogo,
    meetingsCount: 1,
    people: ['Gisele R.', 'Hugo V.'],
    location: 'Belo Horizonte/MG',
    tagline: 'Mobilidade e aluguel de veículos',
    sector: 'Transporte',
    website: 'https://www.localiza.com',
    description: 'Localiza oferece soluções de mobilidade para pessoas e empresas.',
    highlights: ['Aluguel de Carros', 'Frota', 'Tecnologia'],
    focusAreas: ['Mobilidade', 'Fleet Management', 'Logística'],
    createdAt: '2026-02-01T14:00:00.000Z',
    meetings: [
      {
        id: 401,
        title: 'Reunião sobre gestão de frota',
        dateTime: '2026-05-20T15:00:00.000Z',
        participants: ['Gisele R.', 'Hugo V.'],
        transcription: 'Foram discutidas estratégias para melhorar a gestão da frota e utilizar tecnologia para aumentar a eficiência operacional.'
      }
    ]
  },
  {
    id: 5,
    name: 'Grupo Fleury',
    logoUrl: fleuryLogo,
    meetingsCount: 3,
    people: ['Igor L.', 'Julia T.'],
    location: 'São Paulo/SP',
    tagline: 'Saúde diagnóstica de ponta',
    sector: 'Saúde',
    website: 'https://www.fleury.com.br',
    description: 'O Grupo Fleury é líder em medicina diagnóstica no Brasil, combinando centros de excelência, tecnologia médica e atendimento humanizado.',
    highlights: ['Diagnóstico', 'Pesquisa', 'Inovação'],
    focusAreas: ['Saúde', 'Laboratórios', 'Bem-estar'],
    createdAt: '2026-02-10T09:00:00.000Z',
    meetings: [
      {
        id: 501,
        title: 'Reunião sobre inovação',
        dateTime: '2026-05-12T16:00:00.000Z',
        participants: ['Igor L.', 'Julia T.'],
        transcription: 'A reunião abordou oportunidades de inovação e utilização de tecnologia para melhorar os processos de atendimento e diagnóstico.'
      },
      {
        id: 502,
        title: 'Apresentação de resultados',
        dateTime: '2026-05-29T14:00:00.000Z',
        participants: ['Julia T.', 'Fernanda Lima'],
        transcription: 'Foram apresentados os resultados do período e discutidas oportunidades para melhorar a eficiência dos processos.'
      },
      {
        id: 503,
        title: 'Reunião de acompanhamento',
        dateTime: '2026-06-15T10:30:00.000Z',
        participants: ['Igor L.', 'Julia T.', 'Marcos Silva'],
        transcription: 'A equipe avaliou o andamento das ações definidas anteriormente e estabeleceu os próximos passos do projeto.'
      }
    ]
  },
  {
    id: 6,
    name: 'SEBRAE',
    logoUrl: sebraeLogo,
    meetingsCount: 0,
    people: ['Katia M.', 'Leo N.'],
    location: 'Brasília/DF',
    tagline: 'Apoio a micro e pequenas empresas',
    sector: 'Educação',
    website: 'https://www.sebrae.com.br',
    description: 'O SEBRAE promove empreendedorismo e capacitação para pequenos negócios em todo o Brasil, com programas de formação e consultoria especializada.',
    highlights: ['Empreendedorismo', 'Capacitação', 'Consultoria'],
    focusAreas: ['PME', 'Treinamento', 'Inovação'],
    createdAt: '2026-03-01T10:00:00.000Z',
    meetings: []
  },
  {
    id: 7,
    name: 'Assaí Atacadista',
    logoUrl: assaiLogo,
    meetingsCount: 1,
    people: ['Marta P.', 'Nuno G.'],
    location: 'São Paulo/SP',
    tagline: 'Atacado forte para varejo e indústrias',
    sector: 'Atacado',
    website: 'https://www.assai.com.br',
    description: 'Assaí oferece preços competitivos e amplo sortimento para comércio e indústria.',
    highlights: ['Preços Baixos', 'Sortimento', 'Logística'],
    focusAreas: ['Atacado', 'Bens de Consumo', 'Supply Chain'],
    createdAt: '2026-03-05T15:00:00.000Z',
    meetings: [
      {
        id: 701,
        title: 'Reunião sobre distribuição',
        dateTime: '2026-06-05T10:00:00.000Z',
        participants: ['Marta P.', 'Nuno G.'],
        transcription: 'A reunião teve como foco a distribuição de produtos e oportunidades de melhoria na cadeia de abastecimento.'
      }
    ]
  },
  {
    id: 8,
    name: 'Atacadão',
    logoUrl: atacadaoLogo,
    meetingsCount: 0,
    people: ['Otávio S.', 'Paula F.'],
    location: 'São Paulo/SP',
    tagline: 'Rede de atacarejo para varejo e PME',
    sector: 'Atacado',
    website: 'https://www.atacadao.com.br',
    description: 'Atacadão atende comerciantes e consumidores com grande variedade de produtos e preços competitivos em seus pontos de venda e canais digitais.',
    highlights: ['Atacarejo', 'Variedade', 'Economia'],
    focusAreas: ['Varejo', 'Distribuição', 'Compras'],
    createdAt: '2026-03-10T11:00:00.000Z',
    meetings: []
  },
  {
    id: 9,
    name: 'Grupo Muffato',
    logoUrl: muffatoLogo,
    meetingsCount: 0,
    people: ['Quiteria L.', 'Ruan K.'],
    location: 'Cascavel/PR',
    tagline: 'Supermercados e distribuição regional',
    sector: 'Varejo',
    website: 'https://www.muffato.com.br',
    description: 'Grupo Muffato atua no varejo alimentar e atacarejo, com foco em inovação, serviço local e experiência de compra de qualidade.',
    highlights: ['Supermercado', 'Atacado', 'Inovação'],
    focusAreas: ['Alimentação', 'Varejo', 'Experiência'],
    createdAt: '2026-03-15T12:00:00.000Z',
    meetings: []
  },
  {
    id: 10,
    name: 'Mart Minas',
    logoUrl: martMinasLogo,
    meetingsCount: 0,
    people: ['Soraia B.', 'Tito A.'],
    location: 'Minas Gerais/MG',
    tagline: 'Rede de atacado para compras em grande volume',
    sector: 'Atacado',
    website: 'https://www.martminas.com.br',
    description: 'Mart Minas oferece soluções de abastecimento para comerciantes e indústrias, com foco em preços competitivos e atendimento regionalizado.',
    highlights: ['Atacado', 'Parcerias', 'Produtos'],
    focusAreas: ['Agronegócio', 'Comércio', 'Distribuição'],
    createdAt: '2026-03-20T16:00:00.000Z',
    meetings: []
  },
  {
    id: 11,
    name: 'Arklok',
    logoUrl: arklokLogo,
    meetingsCount: 0,
    people: ['Uriel D.', 'Vera C.'],
    location: 'Curitiba/PR',
    tagline: 'Engenharia e soluções industriais',
    sector: 'Indústria',
    website: 'https://www.arklok.com.br',
    description: 'Arklok desenvolve projetos de engenharia industrial e sistemas de controle para operações de energia e manufatura.',
    highlights: ['Engenharia', 'Automação', 'Projetos'],
    focusAreas: ['Indústria', 'Energia', 'Automação'],
    createdAt: '2026-04-01T09:30:00.000Z',
    meetings: []
  },
  {
    id: 12,
    name: 'Makro Engenharia',
    logoUrl: makroLogo,
    meetingsCount: 0,
    people: ['Wagner X.', 'Yara Z.'],
    location: 'São Paulo/SP',
    tagline: 'Soluções de engenharia para construção pesada',
    sector: 'Engenharia',
    website: 'https://www.makroengenharia.com.br',
    description: 'Makro Engenharia atua em projetos de infraestrutura, construção pesada e manutenção industrial com foco em segurança e qualidade.',
    highlights: ['Infraestrutura', 'Obras', 'Qualidade'],
    focusAreas: ['Construção', 'Manutenção', 'Segurança'],
    createdAt: '2026-04-05T13:45:00.000Z',
    meetings: []
  }
];