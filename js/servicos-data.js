/* ============================================================
   CLÓVIS CABELEIREIROS — Dados dos Serviços
   Array central usado em servicos.html e agendamento.html
   ============================================================ */

/**
 * Array de objetos contendo todos os serviços oferecidos.
 * 
 * COMO EDITAR:
 * - Para adicionar/remover/alterar um serviço, edite este array.
 * - A categoria deve ser uma das: "Cabelo", "Corte", "Penteado", "Mechas", "Maquiagem", "Manicure", "Pedicure"
 * - O id é usado na URL (ex: ?servico=corte-de-cabelo-masculino)
 * - Valores de preço são fictícios e servem como referência.
 *   Substitua pelos valores reais praticados pelo salão.
 */

const servicos = [
  // === CABELO ===
  {
    id: 'hidratacao-capilar',
    nome: 'Hidratação Capilar',
    categoria: 'Cabelo',
    descricao: 'Tratamento intensivo com máscaras profissionalizantes para devolver brilho, maciez e vitalidade aos cabelos.',
    duracao: '40 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'hidratacao-capilar'
  },
  {
    id: 'reconstrucao-capilar',
    nome: 'Reconstrução Capilar',
    categoria: 'Cabelo',
    descricao: 'Tratamento à base de queratina e aminoácidos para cabelos danificados, devolvendo força e resistência.',
    duracao: '50 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'reconstrucao-capilar'
  },
  {
    id: 'nutricao-capilar',
    nome: 'Nutrição Capilar',
    categoria: 'Cabelo',
    descricao: 'Tratamento hidro-nutritivo com óleos vegetais e vitaminas para cabelos secos e sem vida.',
    duracao: '45 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'nutricao-capilar'
  },
  {
    id: 'botox-capilar',
    nome: 'Botox Capilar',
    categoria: 'Cabelo',
    descricao: 'Tratamento reparador que reduz o volume, elimina o frizz e restaura a fibra capilar com resultados impressionantes.',
    duracao: '1h',
    preco: 'Consulte pelo whattsapp',
    slug: 'botox-capilar'
  },

  // === CORTE ===
  {
    id: 'corte-masculino',
    nome: 'Corte Masculino',
    categoria: 'Corte',
    descricao: 'Corte moderno e personalizado com tesoura e máquina, incluindo finalização.',
    duracao: '30 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'corte-masculino'
  },
  {
    id: 'corte-feminino',
    nome: 'Corte Feminino',
    categoria: 'Corte',
    descricao: 'Corte personalizado com análise de formato de rosto e textura do cabelo, incluindo lavagem e finalização.',
    duracao: '45 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'corte-feminino'
  },
  {
    id: 'corte-infantil',
    nome: 'Corte Infantil',
    categoria: 'Corte',
    descricao: 'Corte lúdico e divertido para crianças, com paciência e carinho da nossa equipe.',
    duracao: '30 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'corte-infantil'
  },

  // === PENTEADOS ===
  {
    id: 'penteados-noivas',
    nome: 'Penteado para Noivas',
    categoria: 'Penteado',
    descricao: 'Produção completa para noivas incluindo prova de penteado, teste de maquiagem e atendimento personalizado.',
    duracao: '2h',
    preco: 'Consulte pelo whattsapp',
    slug: 'penteados-noivas'
  },
  {
    id: 'penteados-debutantes',
    nome: 'Penteado para Debutantes',
    categoria: 'Penteado',
    descricao: 'Penteados modernos e elegantes para debutantes, com direito a teste e prova.',
    duracao: '1h30',
    preco: 'Consulte pelo whattsapp',
    slug: 'penteados-debutantes'
  },
  {
    id: 'penteados-formaturas',
    nome: 'Penteado para Formaturas',
    categoria: 'Penteado',
    descricao: 'Penteados sofisticados para formaturas e eventos especiais.',
    duracao: '1h',
    preco: 'Consulte pelo whattsapp',
    slug: 'penteados-formaturas'
  },
  {
    id: 'penteados-sociais',
    nome: 'Penteado Social',
    categoria: 'Penteado',
    descricao: 'Penteados para festas, casamentos (convidados) e eventos em geral.',
    duracao: '40 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'penteados-sociais'
  },

  // === MECHAS ===
  {
    id: 'mechas-luzes',
    nome: 'Mechas / Luzes',
    categoria: 'Mechas',
    descricao: 'Técnica de descoloração com papel alumínio para clarear mechas finas ou grossas, conforme seu estilo.',
    duracao: '2h',
    preco: 'Consulte pelo whattsapp',
    slug: 'mechas-luzes'
  },
  {
    id: 'ombre-hair',
    nome: 'Ombré Hair',
    categoria: 'Mechas',
    descricao: 'Efeito degradê natural que clareia as pontas mantendo a raiz escura, com aspecto moderno e sofisticado.',
    duracao: '2h30',
    preco: 'Consulte pelo whattsapp',
    slug: 'ombre-hair'
  },
  {
    id: 'mechas-balayage',
    nome: 'Balayage',
    categoria: 'Mechas',
    descricao: 'Técnica francesa de mechas à mão livre, com efeito iluminado e natural.',
    duracao: '2h30',
    preco: 'Consulte pelo whattsapp',
    slug: 'mechas-balayage'
  },
  {
    id: 'coloração',
    nome: 'Coloração Completa',
    categoria: 'Mechas',
    descricao: 'Coloração com tintas profissionais de alta qualidade, cobertura total de brancos.',
    duracao: '1h30',
    preco: 'Consulte pelo whattsapp',
    slug: 'coloracao'
  },

  // === MAQUIAGEM ===
  {
    id: 'maquiagem-noivas',
    nome: 'Maquiagem para Noivas',
    categoria: 'Maquiagem',
    descricao: 'Maquiagem profissional para noivas com teste, duração prolongada e acabamento impecável para fotos.',
    duracao: '1h30',
    preco: 'Consulte pelo whattsapp',
    slug: 'maquiagem-noivas'
  },
  {
    id: 'maquiagem-social',
    nome: 'Maquiagem Social',
    categoria: 'Maquiagem',
    descricao: 'Maquiagem para festas, formaturas, debutantes e eventos sociais em geral.',
    duracao: '1h',
    preco: 'Consulte pelo whattsapp',
    slug: 'maquiagem-social'
  },
  {
    id: 'maquiagem-dia',
    nome: 'Maquiagem Dia a Dia',
    categoria: 'Maquiagem',
    descricao: 'Maquiagem leve e natural para o dia a dia, realçando sua beleza sem exageros.',
    duracao: '40 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'maquiagem-dia'
  },

  // === MANICURE ===
  {
    id: 'manicure-tradicional',
    nome: 'Manicure Tradicional',
    categoria: 'Manicure',
    descricao: 'Corte, lixamento, remoção de cutículas e esmaltação das unhas das mãos.',
    duracao: '40 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'manicure-tradicional'
  },

  // === PEDICURE ===
  {
    id: 'pedicure-tradicional',
    nome: 'Pedicure Tradicional',
    categoria: 'Pedicure',
    descricao: 'Corte, lixamento, remoção de cutículas e esmaltação dos pés, com hidratação.',
    duracao: '40 min',
    preco: 'Consulte pelo whattsapp',
    slug: 'pedicure-tradicional'
  },
  {
    id: 'pedicure-completa',
    nome: 'Pedicure Completa + Spa',
    categoria: 'Pedicure',
    descricao: 'Pedicure tradicional + esfoliação, hidratação intensiva e massagem relaxante nos pés.',
    duracao: '1h',
    preco: 'Consulte pelo whattsapp',
    slug: 'pedicure-completa'
  }
];

/** Categorias únicas extraídas do array de serviços */
const categorias = [...new Set(servicos.map(s => s.categoria))];

/**
 * Retorna um serviço pelo seu ID
 * @param {string} id - O ID do serviço
 * @returns {object|null}
 */
function getServicoById(id) {
  return servicos.find(s => s.id === id) || null;
}

/**
 * Retorna serviços filtrados por categoria
 * @param {string} categoria - Nome da categoria
 * @returns {array}
 */
function getServicosByCategoria(categoria) {
  if (!categoria || categoria === 'Todos') return servicos;
  return servicos.filter(s => s.categoria === categoria);
}
