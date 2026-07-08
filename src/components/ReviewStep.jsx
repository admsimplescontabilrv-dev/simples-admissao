import React from 'react';

function ReviewStep({ formData, onBack, onConfirm, onGoToStep, isSubmitting }) {
  const renderRow = (label, value) => (
    <div className="review-row">
      <span className="review-label">{label}</span>
      <span className="review-value">{value || '—'}</span>
    </div>
  );

  const renderSection = (title, icon, stepIndex, children) => (
    <div className="review-section">
      <div className="review-section-header">
        <span>{icon} {title}</span>
        <button className="review-edit-btn" onClick={() => onGoToStep(stepIndex)} disabled={isSubmitting}>
          ✏️ Editar
        </button>
      </div>
      <div className="review-section-body">
        {children}
      </div>
    </div>
  );

  const files = formData.files || {};

  return (
    <>
      <div className="step-header">
        <h2>📋 Revise suas informações</h2>
        <p>Confira todos os dados antes de enviar. Se precisar alterar algo, clique em "Editar".</p>
      </div>
      <div className="step-content">
        {renderSection('Dados Pessoais', '📝', 1, (
          <>
            {renderRow('Nome Completo', formData.nome)}
            {renderRow('CPF', formData.cpf)}
            {renderRow('Data de Nascimento', formData.dataNascimento)}
            {renderRow('Filiação Materna', formData.filiacaoMaterna)}
            {renderRow('Filiação Paterna', formData.filiacaoPaterna)}
            {renderRow('Nacionalidade', formData.nacionalidade)}
            {renderRow('Naturalidade', formData.naturalidade)}
            {renderRow('Sexo', formData.sexo)}
            {renderRow('Raça/Cor', formData.raca)}
            {renderRow('Estado Civil', formData.estadoCivil)}
            {renderRow('Grau de Instrução', formData.grauInstrucao)}
            {renderRow('Filhos/Dependentes < 21 anos', formData.temFilhos)}
          </>
        ))}

        {renderSection('Endereço', '🏠', 2, (
          <>
            {renderRow('CEP', formData.cep)}
            {renderRow('Logradouro', formData.logradouro)}
            {renderRow('Número', formData.numero)}
            {renderRow('Complemento', formData.complemento)}
            {renderRow('Bairro', formData.bairro)}
            {renderRow('Cidade', formData.cidade)}
            {renderRow('Estado', formData.estado)}
          </>
        ))}

        {renderSection('Informações da Contratação', '💼', 3, (
          <>
            {renderRow('Empresa Contratante', formData.empresa)}
            {renderRow('Cargo / Função', formData.cargo)}
            {renderRow('Salário Combinado', formData.salario)}
            {renderRow('Carga Horária', formData.cargaHoraria)}
          </>
        ))}

        {renderSection('Documentos Anexados', '📄', 4, (
          <div className="review-files-grid">
            {[
              { key: 'identificacao', label: 'Doc. de Identificação' },
              { key: 'endereco', label: 'Comprovante de Endereço' },
              { key: 'exame', label: 'Exame Admissional' },
              ...(formData.temFilhos === 'Sim' ? [{ key: 'documentoFilhos', label: 'Doc. dos Filhos' }] : [])
            ].map(({ key, label }) => (
              <div key={key} className={`review-file-badge ${files[key] ? 'attached' : 'missing'}`}>
                <span className="review-file-icon">{files[key] ? '✅' : '⚠️'}</span>
                <div>
                  <span className="review-file-label">{label}</span>
                  <span className="review-file-name">{files[key] ? files[key].name : 'Não anexado'}</span>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack} disabled={isSubmitting}>Voltar</button>
        <button className="btn btn-confirm" onClick={onConfirm} disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : '✅ Confirmar e Enviar'}
        </button>
      </div>
    </>
  );
}

export default ReviewStep;
