import React from 'react';

function SuccessStep() {
  return (
    <>
      <div className="step-header">
        <h2 style={{ color: 'var(--success-green)' }}>Tudo Certo!</h2>
        <p>Recebemos as suas informações com sucesso.</p>
      </div>
      <div className="step-content" style={{ textAlign: 'center', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <p style={{ marginBottom: '2rem' }}>O seu processo de admissão já foi iniciado.</p>
        <p style={{ fontSize: '0.9rem', color: '#ccc' }}>Se tiver alguma dúvida, entre em contato com o nosso Departamento Pessoal:</p>
        <a 
          href="https://wa.me/556436216798" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn btn-whatsapp"
          style={{ textDecoration: 'none', marginTop: '1.5rem' }}
        >
          <svg style={{ width: '20px', height: '20px', fill: 'white' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 413.2c-32.6 0-64.5-8.8-92.4-25.3l-6.6-4-68.9 18 18.3-67.2-4.4-7c-18.1-28.9-27.7-62.5-27.7-96.8 0-104.3 84.8-189 189.2-189 50.7 0 98.4 19.8 134.2 55.6s55.5 83.5 55.5 134.3c0 104.3-84.8 189-189.1 189zm103.6-141.4c-5.7-2.8-33.8-16.7-39-18.6-5.2-1.9-9-2.8-12.8 2.8-3.8 5.7-14.7 18.6-18 22.4-3.3 3.8-6.6 4.3-12.3 1.4-5.7-2.8-24.1-8.9-45.9-28.4-17.1-15.3-28.7-34.3-32-40-3.3-5.7-.4-8.8 2.5-11.6 2.6-2.6 5.7-6.6 8.5-9.9 2.8-3.3 3.8-5.7 5.7-9.5 1.9-3.8.9-7.1-.5-9.9-1.4-2.8-12.8-30.8-17.5-42.2-4.6-11-9.2-9.5-12.8-9.6-3.3-.1-7.1-.1-10.9-.1-3.8 0-9.9 1.4-15.1 7.1-5.2 5.7-20.3 19.9-20.3 48.5s20.8 56.4 23.7 60.2c2.8 3.8 41 62.6 99.4 87.8 13.9 6 24.7 9.6 33.2 12.3 14 4.4 26.7 3.8 36.8 2.3 11.2-1.7 33.8-13.8 38.6-27.1 4.7-13.3 4.7-24.7 3.3-27.1-1.4-2.5-5.2-3.8-10.9-6.7z"/></svg>
          Falar no WhatsApp
        </a>
      </div>
    </>
  );
}

export default SuccessStep;
