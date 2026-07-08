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
        <div style={{ 
          background: 'rgba(59,130,246,0.08)', 
          borderRadius: '8px', 
          padding: '1rem 1.25rem',
          border: '1px solid rgba(59,130,246,0.2)',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <span style={{ fontSize: '1.2rem', flexShrink: 0, marginTop: '1px' }}>ℹ️</span>
          <p style={{ 
            fontSize: '0.82rem', 
            color: '#b0c4de',
            margin: 0,
            lineHeight: '1.5'
          }}>
            Caso não tenha alguma das informações solicitadas no momento, <strong style={{ color: '#93bbf5' }}>pode deixar em branco</strong>. Nós validamos tudo diretamente com a empresa.
          </p>
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
