import React, { useState } from 'react';

function UploadStep({ formData, onBack, onNext }) {
  const [files, setFiles] = useState({
    identificacao: formData.files?.identificacao || null,
    endereco: formData.files?.endereco || null,
    exame: formData.files?.exame || null,
    documentoFilhos: formData.files?.documentoFilhos || null
  });

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Limite de 10MB (Regra do Trello para Anexos Nativos e segurança do Cloudinary)
      if (file.size > 10 * 1024 * 1024) {
        alert('O arquivo selecionado é muito grande. O limite máximo é de 10MB por arquivo.');
        e.target.value = ''; // Reseta o input
        return;
      }

      setFiles(prev => ({
        ...prev,
        [fieldName]: file
      }));
    }
  };

  const handleNextClick = () => {
    onNext({ files });
  };

  const renderUploadArea = (label, fieldName) => {
    const selectedFile = files[fieldName];
    
    return (
      <div className="form-group" key={fieldName}>
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
            accept=".pdf,.jpg,.jpeg,.png"
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
        {formData?.temFilhos === 'Sim' && renderUploadArea('Documento de identificação dos filhos menores de 21 anos', 'documentoFilhos')}
      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleNextClick}>Revisar Dados</button>
      </div>
    </>
  );
}

export default UploadStep;
