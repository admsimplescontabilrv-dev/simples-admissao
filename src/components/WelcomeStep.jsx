import React from 'react';

function WelcomeStep({ onNext }) {
  return (
    <>
      <div className="step-header">
        <h2>BEM-VINDO (A)</h2>
        <p>Esse é o sistema de coleta de informações para contratação da Simples Contábil</p>
      </div>
      <div className="step-content">
        <div style={{ 
          background: 'rgba(255,255,255,0.04)', 
          borderRadius: '8px', 
          padding: '1.5rem',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          <p style={{ fontWeight: '600', marginBottom: '0.75rem', fontSize: '0.95rem' }}>
            📋 Tenha em mãos antes de começar:
          </p>
          <ul style={{ 
            listStyle: 'none', 
            padding: 0, 
            margin: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
            fontSize: '0.88rem',
            color: '#ccc'
          }}>
            <li>✔️ Documento de identificação com foto (RG ou CNH)</li>
            <li>✔️ Comprovante de endereço atualizado</li>
            <li>✔️ CPF e dados pessoais</li>
          </ul>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '2rem',
          flexWrap: 'wrap',
          padding: '0.5rem 0'
        }}>
          {[
            { icon: '📝', label: 'Dados Pessoais' },
            { icon: '🏠', label: 'Endereço' },
            { icon: '💼', label: 'Contratação' },
            { icon: '📄', label: 'Documentos' }
          ].map((step, i) => (
            <div key={i} style={{ 
              textAlign: 'center', 
              fontSize: '0.8rem', 
              color: '#aaa',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.3rem'
            }}>
              <span style={{ fontSize: '1.5rem' }}>{step.icon}</span>
              <span>{step.label}</span>
            </div>
          ))}
        </div>
        <p style={{ 
          textAlign: 'center', 
          fontSize: '0.8rem', 
          color: '#888',
          margin: 0
        }}>
          ⏱️ O preenchimento leva aproximadamente 3 minutos.
        </p>
      </div>
      <div className="step-footer" style={{ justifyContent: 'flex-end' }}>
        <button className="btn" onClick={() => onNext({})}>Avançar</button>
      </div>
    </>
  );
}

export default WelcomeStep;
