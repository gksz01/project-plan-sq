import { formatStatusLabel } from "./format";

export function generateCommunication(nonConformities, projectInfo, checklistItems) {
  const abertas = (nonConformities || []).filter(
    (nc) => nc.status !== "resolvida"
  );

  if (abertas.length === 0) {
    return "Não há não-conformidades abertas no momento.";
  }

  const headerLines = [
    `Projeto: ${projectInfo?.name || "N/D"}`,
    `Gerente: ${projectInfo?.manager || "N/D"}`,
    `Cliente: ${projectInfo?.customer || "N/D"}`,
    `Versão do plano: ${projectInfo?.version || "N/D"}`,
    `Data da auditoria: ${
      projectInfo?.date || new Date().toLocaleDateString()
    }`,
    "",
    "Resumo das Não-Conformidades (NC) em aberto:",
  ];

  const itemsLines = abertas.map((nc, index) => {
    const item = checklistItems.find((i) => i.id === nc.relatedItemId);
    return `${index + 1}. [Severidade: ${nc.severity.toUpperCase()}] ${nc.title}
   Item relacionado do plano: ${item ? item.description : "N/D"}
   Responsável: ${nc.responsible || "N/D"}
   Prazo: ${nc.dueDate || "N/D"}
   Situação: ${formatStatusLabel(nc.status)}
   Descrição: ${nc.description || "N/D"}`;
  });

  return [...headerLines, "", ...itemsLines].join("\n");
}
