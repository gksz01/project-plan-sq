// src/utils/constants.js

export const checklistItems = [
  {
    id: 1,
    category: "Escopo",
    description: "Escopo do projeto documentado, aprovado e sob controle.",
  },
  {
    id: 2,
    category: "Stakeholders",
    description:
      "Stakeholders identificados e mapeados (patrocinador, cliente, equipe, etc.).",
  },
  {
    id: 3,
    category: "Cronograma",
    description:
      "Cronograma do projeto definido com marcos, entregas e dependências.",
  },
  {
    id: 4,
    category: "Recursos",
    description:
      "Recursos (equipe, infraestrutura, orçamento) planejados e alocados.",
  },
  {
    id: 5,
    category: "Riscos",
    description:
      "Principais riscos identificados, analisados e com plano de resposta.",
  },
  {
    id: 6,
    category: "Qualidade",
    description:
      "Critérios de qualidade definidos (métricas, padrões, critérios de aceite).",
  },
  {
    id: 7,
    category: "Comunicação",
    description:
      "Plano de comunicação definido (quem recebe o quê, quando e por qual canal).",
  },
  {
    id: 8,
    category: "Escopo de Entregas",
    description:
      "Lista de entregas (deliverables) clara, com responsável e datas previstas.",
  },
  {
    id: 9,
    category: "Custos",
    description:
      "Estimativa de custo e orçamento do projeto definidos e aprovados.",
  },
  {
    id: 10,
    category: "Monitoramento e Controle",
    description:
      "Definidos indicadores de acompanhamento (status report, indicadores de progresso).",
  },
];

export const statusOptions = [
  { value: "nao-avaliado", label: "Não avaliado" },
  { value: "atende", label: "Atende" },
  { value: "parcial", label: "Atende parcialmente" },
  { value: "nao-atende", label: "Não atende" },
  { value: "nao-aplicavel", label: "Não se aplica" },
];

export const severityOptions = [
  { value: "baixa", label: "Baixa" },
  { value: "media", label: "Média" },
  { value: "alta", label: "Alta" },
];
