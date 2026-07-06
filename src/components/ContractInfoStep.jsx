import React, { useState } from 'react';

function ContractInfoStep({ formData, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    empresa: formData.empresa || '',
    cargo: formData.cargo || '',
    salario: formData.salario || '',
    cargaHoraria: formData.cargaHoraria || ''
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
        <h2>Informações da contratação</h2>
        <p>Obs: caso não tenha acesso a alguma informação, deixe em branco</p>
      </div>
      <div className="step-content">
        <div className="form-group">
          <label>Qual empresa está te contratando?</label>
          <input type="text" className="form-control" name="empresa" value={localData.empresa} onChange={handleChange} placeholder="Digite acima o nome da empresa." />
        </div>

        <div className="form-group">
          <label>Você foi contratado para qual exercer qual função?</label>
          <input type="text" className="form-control" name="cargo" value={localData.cargo} onChange={handleChange} placeholder="Digite acima seu cargo." />
        </div>

        <div className="form-group">
          <label>Qual foi o salário combinado?</label>
          <input type="text" className="form-control" name="salario" value={localData.salario} onChange={handleChange} placeholder="R$ 0,00" />
        </div>

        <div className="form-group">
          <label>Qual é a sua carga horária?</label>
          <input type="text" className="form-control" name="cargaHoraria" value={localData.cargaHoraria} onChange={handleChange} placeholder="EX: Segunda a Sexta das 08:00 às 18:00 - Sábado das 08:00 as 12:00" />
        </div>
      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleNextClick}>Avançar</button>
      </div>
    </>
  );
}

export default ContractInfoStep;
