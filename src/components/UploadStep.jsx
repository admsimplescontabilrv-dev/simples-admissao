import React, { useState } from 'react';

function UploadStep({ onBack, onSubmit }) {
  const [files, setFiles] = useState({
    identificacao: null,
    endereco: null,
    exame: null
  });

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: e.target.files[0]
      }));
    }
  };

  const handleSubmitClick = () => {
    onSubmit({ files });
  };

  const renderUploadArea = (label, fieldName) => {
    const selectedFile = files[fieldName];
    
    return (
      <div className="form-group">
        <label>{label}</label>
        <label className="file-upload-area" style={{ 
          borderColor: selectedFile ? 'var(--success-green)' : '',
          backgroundColor: selectedFile ? 'rgba(76, 175, 80, 0.1)' : '' 
        }}>
          {!selectedFile ? (
            <>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📄</div>
              <div><strong>Clique para Pesquisar Arquivos</strong></div>
              <div style={{ fontSize: '0.8rem', color: '#ccc' }}>ou arraste e solte seus arquivos aqui</div>
            </>
          ) : (
            <div style={{ color: 'var(--success-green)' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>✅</div>
              <strong>Anexado com sucesso!</strong>
              <div style={{ fontSize: '0.9rem', color: '#fff', marginTop: '0.3rem' }}>{selectedFile.name}</div>
            </div>
          )}
          <input 
            type="file" 
            onChange={(e) => handleFileChange(e, fieldName)}
            style={{ display: 'none' }} 
          />
        </label>
      </div>
    );
  };

  return (
    <>
      <div className="step-header">
        <h2>Envio de documentos</h2>
        <p>Anexe os documentos abaixo em qualquer formato.</p>
      </div>
      <div className="step-content">
        {renderUploadArea('Documento de identificação com foto', 'identificacao')}
        {renderUploadArea('Comprovante de endereço', 'endereco')}
        {renderUploadArea('Exame admissional', 'exame')}
      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleSubmitClick}>Finalizar Envio</button>
      </div>
    </>
  );
}

export default UploadStep;
