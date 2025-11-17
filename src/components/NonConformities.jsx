import React from "react";
import { formatStatusLabel } from "../utils/format";

export default function NonConformities({
  checklistItems,
  nonConformities,
  severityOptions,
  newNC,
  onNewNCChange,
  onCreateNC,
  onStatusChange,
  onAddHistoryNote,
  communicationText,
}) {
  return (
    <section className="card">
      <h2>Não-Conformidades (NC)</h2>

      <form className="nc-form" onSubmit={onCreateNC}>
        <div className="field">
          <label>Título da NC *</label>
          <input
            type="text"
            name="title"
            value={newNC.title}
            onChange={onNewNCChange}
            placeholder="Ex.: Falta de identificação de riscos críticos"
          />
        </div>

        <div className="field">
          <label>Item do checklist relacionado *</label>
          <select
            name="relatedItemId"
            value={newNC.relatedItemId}
            onChange={onNewNCChange}
          >
            <option value="">Selecione...</option>
            {checklistItems.map((item) => (
              <option key={item.id} value={item.id}>
                {item.id} - {item.category} - {item.description}
              </option>
            ))}
          </select>
        </div>

        <div className="nc-grid">
          <div className="field">
            <label>Severidade</label>
            <select
              name="severity"
              value={newNC.severity}
              onChange={onNewNCChange}
            >
              {severityOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="field">
            <label>Responsável</label>
            <input
              type="text"
              name="responsible"
              value={newNC.responsible}
              onChange={onNewNCChange}
              placeholder="Ex.: Maria, equipe de PMO"
            />
          </div>

          <div className="field">
            <label>Prazo</label>
            <input
              type="date"
              name="dueDate"
              value={newNC.dueDate}
              onChange={onNewNCChange}
            />
          </div>
        </div>

        <div className="field">
          <label>Descrição / Detalhamento</label>
          <textarea
            name="description"
            rows={3}
            value={newNC.description}
            onChange={onNewNCChange}
            placeholder="Descreva a não-conformidade, impacto e possível causa."
          />
        </div>

        <button type="submit" className="primary-button">
          Registrar NC
        </button>
      </form>

      <div className="nc-list">
        {nonConformities.length === 0 ? (
          <p className="empty-text">
            Nenhuma não-conformidade registrada ainda.
          </p>
        ) : (
          nonConformities.map((nc) => {
            const relatedItem = checklistItems.find(
              (i) => i.id === nc.relatedItemId
            );

            return (
              <div key={nc.id} className="nc-card">
                <div className="nc-card-header">
                  <div>
                    <h3>{nc.title}</h3>
                    <p className="nc-meta">
                      Severidade:{" "}
                      <strong>{nc.severity.toUpperCase()}</strong> | Status:{" "}
                      <strong>{formatStatusLabel(nc.status)}</strong>
                    </p>
                  </div>
                  <div className="nc-actions">
                    <select
                      value={nc.status}
                      onChange={(e) =>
                        onStatusChange(nc.id, e.target.value)
                      }
                    >
                      <option value="aberta">Aberta</option>
                      <option value="em-andamento">Em andamento</option>
                      <option value="resolvida">Resolvida</option>
                    </select>
                    <button
                      type="button"
                      onClick={() => onAddHistoryNote(nc.id)}
                      className="secondary-button"
                    >
                      Adicionar observação
                    </button>
                  </div>
                </div>

                <p className="nc-related">
                  <strong>Item do plano relacionado:</strong>{" "}
                  {relatedItem ? relatedItem.description : "N/D"}
                </p>

                <p className="nc-description">
                  <strong>Descrição:</strong>{" "}
                  {nc.description || "N/D"}
                </p>

                <p className="nc-resp">
                  <strong>Responsável:</strong>{" "}
                  {nc.responsible || "N/D"} |{" "}
                  <strong>Prazo:</strong>{" "}
                  {nc.dueDate || "N/D"}
                </p>

                <details className="nc-history">
                  <summary>Histórico de acompanhamento</summary>
                  <ul>
                    {nc.history.map((h, index) => (
                      <li key={index}>
                        <span className="history-date">
                          {h.date}:
                        </span>{" "}
                        {h.text}
                      </li>
                    ))}
                  </ul>
                </details>
              </div>
            );
          })
        )}
      </div>

      <div className="card" style={{ marginTop: "12px", background: "#fff" }}>
        <h2>Comunicação das Não-Conformidades</h2>
        <p className="small-text">
          Texto gerado automaticamente com as NC abertas.
          Você pode copiar e colar em um e-mail ou mensagem.
        </p>
        <textarea
          className="communication-text"
          readOnly
          value={communicationText}
        />
      </div>
    </section>
  );
}
