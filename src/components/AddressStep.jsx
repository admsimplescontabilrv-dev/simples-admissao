import React, { useState } from 'react';

function AddressStep({ formData, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    cep: formData.cep || '',
    logradouro: formData.logradouro || '',
    numero: formData.numero || '',
    complemento: formData.complemento || '',
    bairro: formData.bairro || '',
    cidade: formData.cidade || '',
    estado: formData.estado || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    onNext(localData);
  };

  return (
    <>
      <div className="step-header">
        <h2>Qual é o seu endereço?</h2>
        <p>Digite abaixo o seu endereço completo:</p>
      </div>
      <div className="step-content">
        <div className="form-group">
          <label>CEP</label>
          <input type="text" className="form-control" name="cep" value={localData.cep} onChange={handleChange} placeholder="EX: 75900-000" />
        </div>

        <div className="form-group">
          <label>Logradouro</label>
          <input type="text" className="form-control" name="logradouro" value={localData.logradouro} onChange={handleChange} placeholder="EX: Rua / Avenida" />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Número</label>
              <input type="text" className="form-control" name="numero" value={localData.numero} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Complemento</label>
              <input type="text" className="form-control" name="complemento" value={localData.complemento} onChange={handleChange} />
            </div>
        </div>

        <div className="form-group">
          <label>Bairro</label>
          <input type="text" className="form-control" name="bairro" value={localData.bairro} onChange={handleChange} />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="form-group" style={{ flex: 2 }}>
              <label>Cidade</label>
              <input type="text" className="form-control" name="cidade" value={localData.cidade} onChange={handleChange} />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label>Estado</label>
              <input type="text" className="form-control" name="estado" value={localData.estado} onChange={handleChange} />
            </div>
        </div>

      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleNextClick}>Avançar</button>
      </div>
    </>
  );
}

export default AddressStep;
