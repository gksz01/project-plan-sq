import React, { useState } from "react";

import ProjectInfo from "./components/ProjectInfo";
import Checklist from "./components/Checklist";
import NonConformities from "./components/NonConformities";

import { useChecklist } from "./hooks/useChecklist";
import { useNonConformities } from "./hooks/useNonConformities";
import { useProjectInfo } from "./hooks/useProjectInfo";

import {
  checklistItems,
  statusOptions,
  severityOptions,
} from "./utils/constants";
import { formatStatusLabel } from "./utils/format";

function App() {
  // Estado global
  const [projectInfo, setProjectInfo] = useState({
    name: "",
    manager: "",
    customer: "",
    version: "",
    date: "",
  });

  const [answers, setAnswers] = useState(
    checklistItems.map((item) => ({
      itemId: item.id,
      status: "nao-avaliado",
      comment: "",
    }))
  );

  const [nonConformities, setNonConformities] = useState([]);

  const [newNC, setNewNC] = useState({
    title: "",
    relatedItemId: "",
    severity: "media",
    responsible: "",
    dueDate: "",
    description: "",
  });

  // Hooks de lógica derivada
  const { adherence } = useChecklist(answers);
  const { communicationText } = useNonConformities(
    nonConformities,
    projectInfo,
    checklistItems
  );
  const { handleProjectInfoChange } = useProjectInfo(setProjectInfo);

  // Handlers do checklist
  const handleStatusChange = (itemId, newStatus) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.itemId === itemId ? { ...a, status: newStatus } : a
      )
    );
  };

  const handleCommentChange = (itemId, newComment) => {
    setAnswers((prev) =>
      prev.map((a) =>
        a.itemId === itemId ? { ...a, comment: newComment } : a
      )
    );
  };

  // Handlers das NCs
  const handleNewNCChange = (e) => {
    const { name, value } = e.target;
    setNewNC((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateNC = (e) => {
    e.preventDefault();

    if (!newNC.title || !newNC.relatedItemId) {
      alert("Preencha pelo menos o título e o item relacionado.");
      return;
    }

    const nc = {
      id: Date.now(),
      ...newNC,
      relatedItemId: Number(newNC.relatedItemId),
      status: "aberta",
      history: [
        {
          date: new Date().toLocaleString(),
          text: "NC criada.",
        },
      ],
    };

    setNonConformities((prev) => [nc, ...prev]);

    setNewNC({
      title: "",
      relatedItemId: "",
      severity: "media",
      responsible: "",
      dueDate: "",
      description: "",
    });
  };

  const handleNCStatusChange = (ncId, newStatus) => {
    setNonConformities((prev) =>
      prev.map((nc) =>
        nc.id === ncId
          ? {
              ...nc,
              status: newStatus,
              history: [
                ...nc.history,
                {
                  date: new Date().toLocaleString(),
                  text: `Status alterado para: ${formatStatusLabel(
                    newStatus
                  )}.`,
                },
              ],
            }
          : nc
      )
    );
  };

  const handleAddNCHistoryNote = (ncId) => {
    const note = window.prompt(
      "Digite a observação de acompanhamento:"
    );
    if (!note) return;

    setNonConformities((prev) =>
      prev.map((nc) =>
        nc.id === ncId
          ? {
              ...nc,
              history: [
                ...nc.history,
                {
                  date: new Date().toLocaleString(),
                  text: note,
                },
              ],
            }
          : nc
      )
    );
  };

  return (
    <div className="app-root">
      <div className="app-container">
        <header className="app-header">
          <h1>Auditoria de Qualidade - Plano de Projeto</h1>
          <p>
            Ferramenta para checklist de aderência e gestão de
            não-conformidades (NC).
          </p>
        </header>

        <ProjectInfo
          projectInfo={projectInfo}
          onProjectInfoChange={handleProjectInfoChange}
        />

        <Checklist
          checklistItems={checklistItems}
          answers={answers}
          statusOptions={statusOptions}
          adherence={adherence}
          onStatusChange={handleStatusChange}
          onCommentChange={handleCommentChange}
        />

        <NonConformities
          checklistItems={checklistItems}
          nonConformities={nonConformities}
          severityOptions={severityOptions}
          newNC={newNC}
          onNewNCChange={handleNewNCChange}
          onCreateNC={handleCreateNC}
          onStatusChange={handleNCStatusChange}
          onAddHistoryNote={handleAddNCHistoryNote}
          communicationText={communicationText}
        />

        <footer className="app-footer">
          <span>
            Trabalho acadêmico - Auditoria de Qualidade de Software
            (Plano de Projeto)
          </span>
        </footer>
      </div>
    </div>
  );
}

export default App;
