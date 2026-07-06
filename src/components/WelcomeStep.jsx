import React from 'react';

function WelcomeStep({ onNext }) {
  return (
    <>
      <div className="step-header">
        <h2>BEM-VINDO (A)</h2>
        <p>Esse é o sistema de coleta de informações para contratação da Simples Contábil</p>
      </div>
      <div className="step-content" style={{ minHeight: '150px' }}>
        {/* Placeholder space */}
      </div>
      <div className="step-footer" style={{ justifyContent: 'flex-end' }}>
        <button className="btn" onClick={() => onNext({})}>Avançar</button>
      </div>
    </>
  );
}

export default WelcomeStep;
