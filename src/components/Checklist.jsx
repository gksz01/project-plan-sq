import React from "react";

export default function Checklist({
  checklistItems,
  answers,
  statusOptions,
  adherence,
  onStatusChange,
  onCommentChange,
}) {
  return (
    <section className="card">
      <div className="card-header-row">
        <h2>Checklist de Qualidade do Plano de Projeto</h2>
        <div className="adherence">
          <span>Aderência:</span>
          <strong>{adherence}%</strong>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${adherence}%` }}
            />
          </div>
        </div>
      </div>

      <div className="checklist-table-wrapper">
        <table className="checklist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Categoria</th>
              <th>Item de verificação</th>
              <th>Status</th>
              <th>Comentário / Evidência</th>
            </tr>
          </thead>
          <tbody>
            {checklistItems.map((item) => {
              const answer = answers.find(
                (a) => a.itemId === item.id
              );

              return (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.category}</td>
                  <td>{item.description}</td>
                  <td>
                    <select
                      value={answer?.status || "nao-avaliado"}
                      onChange={(e) =>
                        onStatusChange(item.id, e.target.value)
                      }
                    >
                      {statusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={answer?.comment || ""}
                      onChange={(e) =>
                        onCommentChange(item.id, e.target.value)
                      }
                      placeholder="Observações, links de evidência, etc."
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
