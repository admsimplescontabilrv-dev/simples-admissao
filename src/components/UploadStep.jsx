import React, { useState } from 'react';

function UploadStep({ formData, onBack, onSubmit }) {
  const [files, setFiles] = useState({
    identificacao: null,
    endereco: null,
    exame: null,
    documentoFilhos: null
  });
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e, fieldName) => {
    if (e.target.files && e.target.files[0]) {
      setFiles(prev => ({
        ...prev,
        [fieldName]: e.target.files[0]
      }));
    }
  };

  const uploadToCloudinary = async (fileObj) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Credenciais do Cloudinary não configuradas");
    }

    const formData = new FormData();
    formData.append('file', fileObj);
    formData.append('upload_preset', uploadPreset);

    // auto serve para imagens, pdfs, etc
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      throw new Error('Falha no upload para o Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmitClick = async () => {
    setIsUploading(true);
    const fileUrls = {};

    try {
      const uploadPromises = Object.entries(files).map(async ([key, fileObj]) => {
        if (fileObj) {
          const url = await uploadToCloudinary(fileObj);
          fileUrls[key] = url;
        }
      });

      await Promise.all(uploadPromises);
      onSubmit({ fileUrls });
    } catch (error) {
      console.error("Erro no upload: ", error);
      alert("Houve um erro ao enviar seus arquivos. Verifique se o Cloudinary está configurado corretamente.");
      setIsUploading(false);
    }
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
            onChange={(e) => handleFileChange(e, fieldName)}
            style={{ display: 'none' }} 
            disabled={isUploading}
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
        <button className="btn" onClick={onBack} disabled={isUploading}>Voltar</button>
        <button className="btn" onClick={handleSubmitClick} disabled={isUploading}>
          {isUploading ? 'Enviando arquivos...' : 'Finalizar Envio'}
        </button>
      </div>
    </>
  );
}

export default UploadStep;
