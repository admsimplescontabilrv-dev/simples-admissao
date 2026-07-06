import React, { useState } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../firebase'; // Importa configuração do Firebase

function UploadStep({ onBack, onSubmit }) {
  const [files, setFiles] = useState({
    identificacao: null,
    endereco: null,
    exame: null
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

  const handleSubmitClick = async () => {
    setIsUploading(true);
    const fileUrls = {};

    try {
      // Faz o upload de cada arquivo presente no estado
      const uploadPromises = Object.entries(files).map(async ([key, fileObj]) => {
        if (fileObj) {
          // Cria um nome seguro para o arquivo
          const safeName = `${Date.now()}_${fileObj.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
          const storageRef = ref(storage, `documentos/${safeName}`);
          
          await uploadBytes(storageRef, fileObj);
          const url = await getDownloadURL(storageRef);
          fileUrls[key] = url;
        }
      });

      await Promise.all(uploadPromises);
      
      // Envia apenas as URLs geradas para a função principal
      onSubmit({ fileUrls });
    } catch (error) {
      console.error("Erro no upload: ", error);
      alert("Houve um erro ao enviar seus arquivos. Tente novamente.");
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
