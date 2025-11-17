import React from "react";

export default function ProjectInfo({ projectInfo, onProjectInfoChange }) {
  return (
    <section className="card">
      <h2>Dados do Projeto</h2>
      <div className="project-grid">
        <div className="field">
          <label>Nome do projeto</label>
          <input
            type="text"
            name="name"
            value={projectInfo.name}
            onChange={onProjectInfoChange}
            placeholder="Ex.: Sistema de Auditoria de Qualidade"
          />
        </div>
        <div className="field">
          <label>Gerente do projeto</label>
          <input
            type="text"
            name="manager"
            value={projectInfo.manager}
            onChange={onProjectInfoChange}
            placeholder="Ex.: João da Silva"
          />
        </div>
        <div className="field">
          <label>Cliente / Área solicitante</label>
          <input
            type="text"
            name="customer"
            value={projectInfo.customer}
            onChange={onProjectInfoChange}
            placeholder="Ex.: Departamento de TI"
          />
        </div>
        <div className="field">
          <label>Versão do plano de projeto</label>
          <input
            type="text"
            name="version"
            value={projectInfo.version}
            onChange={onProjectInfoChange}
            placeholder="Ex.: v1.0"
          />
        </div>
        <div className="field">
          <label>Data da auditoria</label>
          <input
            type="date"
            name="date"
            value={projectInfo.date}
            onChange={onProjectInfoChange}
          />
        </div>
      </div>
    </section>
  );
}
