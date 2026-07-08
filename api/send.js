export default async function handler(req, res) {
  // Configuração para CORS (Segurança: Apenas ambiente local ou domínios da Vercel)
  const origin = req.headers.origin;
  if (origin && (origin.includes('localhost') || origin.includes('vercel.app'))) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  } else {
    res.setHeader('Access-Control-Allow-Origin', 'https://simples-admissao.vercel.app'); 
  }
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' });
  }

  try {
    const data = req.body;
    
    // As chaves agora são do Trello!
    const trelloKey = process.env.TRELLO_API_KEY;
    const trelloToken = process.env.TRELLO_API_TOKEN;
    const listId = process.env.TRELLO_LIST_ID;

    if (!trelloKey || !trelloToken || !listId) {
      return res.status(500).json({ error: 'Credenciais do Trello não configuradas na Vercel.' });
    }

    // Formatação em Markdown para ficar bonito no cartão do Trello
    const desc = `
**1. Dados Pessoais**
- **Nome:** ${data.nome || ''}
- **CPF:** ${data.cpf || ''}
- **Nascimento:** ${data.dataNascimento || ''}
- **Mãe:** ${data.filiacaoMaterna || ''}
- **Pai:** ${data.filiacaoPaterna || ''}
- **Nacionalidade/Naturalidade:** ${data.nacionalidade || ''} / ${data.naturalidade || ''}
- **Sexo:** ${data.sexo || ''}
- **Raça/Cor:** ${data.raca || ''}
- **Estado Civil:** ${data.estadoCivil || ''}
- **Grau de Instrução:** ${data.grauInstrucao || ''}
- **Tem Filhos Menores de 21:** ${data.temFilhos || ''}

**2. Endereço**
- **Logradouro:** ${data.logradouro || ''}, ${data.numero || ''} - ${data.complemento || ''}
- **Bairro:** ${data.bairro || ''}
- **Cidade/Estado:** ${data.cidade || ''} / ${data.estado || ''}
- **CEP:** ${data.cep || ''}

**3. Informações da Contratação**
- **Empresa Contratante:** ${data.empresa || ''}
- **Cargo/Função:** ${data.cargo || ''}
- **Salário:** ${data.salario || ''}
- **Carga Horária:** ${data.cargaHoraria || ''}

**4. Documentos Anexados**
- **Documento de Identificação:** ${data.fileUrls?.identificacao ? `[Baixar/Ver Arquivo](${data.fileUrls.identificacao})` : 'Não enviado'}
- **Comprovante de Endereço:** ${data.fileUrls?.endereco ? `[Baixar/Ver Arquivo](${data.fileUrls.endereco})` : 'Não enviado'}
- **Exame Admissional:** ${data.fileUrls?.exame ? `[Baixar/Ver Arquivo](${data.fileUrls.exame})` : 'Não enviado'}
- **Documento dos Filhos:** ${data.fileUrls?.documentoFilhos ? `[Baixar/Ver Arquivo](${data.fileUrls.documentoFilhos})` : 'Não enviado'}
- **📥 Ficha de Admissão (PDF):** ${data.pdfUrl ? `[Baixar PDF](${data.pdfUrl})` : 'Não gerado'}
    `;

    // Cria o Cartão no Trello via API
    const response = await fetch(`https://api.trello.com/1/cards?idList=${listId}&key=${trelloKey}&token=${trelloToken}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Nova Admissão: ${data.empresa || 'Empresa não informada'} - ${data.nome || 'Candidato'}`,
        desc: desc,
        pos: 'top' // Coloca no topo da lista
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao criar o cartão no Trello');
    }

    const cardData = await response.json();
    const cardId = cardData.id;
    // O delay de 5 segundos agora acontece no Frontend (App.jsx) antes de chegar aqui.

    // Anexa os arquivos no Trello usando FormData (Download da nuvem -> Upload para Trello)
    const attachmentPromises = [];

    if (data.fileUrls) {
      const labels = {
        identificacao: "Doc de Identificação",
        endereco: "Comprovante de Endereço",
        exame: "Exame Admissional",
        documentoFilhos: "Documento dos Filhos"
      };

      for (const [key, url] of Object.entries(data.fileUrls)) {
        if (url) {
          attachmentPromises.push((async () => {
            try {
              const resFile = await fetch(url);
              if (!resFile.ok) throw new Error(`Falha ao baixar ${url}`);
              const blob = await resFile.blob();
              
              // Tenta descobrir a extensão original pelo mime type
              const ext = blob.type.split('/')[1] || 'png';
              const filename = `${labels[key] || key}.${ext}`;

              const formData = new FormData();
              formData.append('file', blob, filename);
              formData.append('name', labels[key] || key);
              formData.append('setCover', 'false'); // Impede capa automática

              await fetch(`https://api.trello.com/1/cards/${cardId}/attachments?key=${trelloKey}&token=${trelloToken}`, {
                method: 'POST',
                body: formData
              });
            } catch (err) {
              console.error(`Erro ao anexar ${key}:`, err);
            }
          })());
        }
      }
    }

    if (data.pdfUrl) {
      attachmentPromises.push((async () => {
        try {
          const resFile = await fetch(data.pdfUrl);
          if (!resFile.ok) throw new Error(`Falha ao baixar PDF ${data.pdfUrl}`);
          const blob = await resFile.blob();

          const formData = new FormData();
          formData.append('file', blob, `Ficha de Admissão - ${data.nome || 'Candidato'}.pdf`);
          formData.append('name', 'Ficha de Admissão');
          formData.append('setCover', 'false'); // Impede capa automática

          await fetch(`https://api.trello.com/1/cards/${cardId}/attachments?key=${trelloKey}&token=${trelloToken}`, {
            method: 'POST',
            body: formData
          });
        } catch (err) {
          console.error(`Erro ao anexar PDF:`, err);
        }
      })());
    }

    // Aguarda todos os anexos serem processados paralelamente (evita timeout na Vercel)
    await Promise.all(attachmentPromises);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao integrar com Trello:', error);
    return res.status(500).json({ error: 'Falha ao processar a requisição.' });
  }
}
