import React from 'react';

function UploadStep({ onBack, onSubmit }) {
  const handleSubmitClick = () => {
    onSubmit();
  };

  return (
    <>
      <div className="step-header">
        <h2>Envio de documentos</h2>
        <p>Anexe os documentos abaixo em qualquer formato.</p>
      </div>
      <div className="step-content">
        
        <div className="form-group">
          <label>Documento de identificação com foto</label>
          <label className="file-upload-area">
            <div>↑</div>
            <div><strong>Pesquisar Arquivos</strong></div>
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Arraste e solte seus arquivos aqui</div>
            <input type="file" />
          </label>
        </div>

        <div className="form-group">
          <label>Comprovante de endereço</label>
          <label className="file-upload-area">
            <div>↑</div>
            <div><strong>Pesquisar Arquivos</strong></div>
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Arraste e solte seus arquivos aqui</div>
            <input type="file" />
          </label>
        </div>

        <div className="form-group">
          <label>Exame admissional</label>
          <label className="file-upload-area">
            <div>↑</div>
            <div><strong>Pesquisar Arquivos</strong></div>
            <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Arraste e solte seus arquivos aqui</div>
            <input type="file" />
          </label>
        </div>

      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleSubmitClick}>Finalizar Envio</button>
      </div>
    </>
  );
}

export default UploadStep;
