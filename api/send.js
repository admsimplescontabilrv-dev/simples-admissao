export default async function handler(req, res) {
  // Configuração para CORS caso necessário
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
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

---
*(Nota do Sistema: Nesta versão, os arquivos de anexo ainda não sobem automaticamente para o cartão. O candidato pode enviar via WhatsApp).*
    `;

    // Cria o Cartão no Trello via API
    const response = await fetch(\`https://api.trello.com/1/cards?idList=\${listId}&key=\${trelloKey}&token=\${trelloToken}\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: \`Nova Admissão: \${data.nome || 'Candidato'}\`,
        desc: desc,
        pos: 'top' // Coloca no topo da lista
      })
    });

    if (!response.ok) {
      throw new Error('Falha ao criar o cartão no Trello');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao integrar com Trello:', error);
    return res.status(500).json({ error: 'Falha ao processar a requisição.' });
  }
}
