import nodemailer from 'nodemailer';

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

    // Configuração do servidor de e-mail (SMTP)
    // Na Vercel, você precisará configurar essas variáveis de ambiente
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Exemplo com Gmail
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER, // Ex: seuemail@gmail.com
        pass: process.env.EMAIL_PASS, // Senha de App do Google
      },
    });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; color: #333;">
        <h2>Nova Admissão Recebida: ${data.nome || 'Não informado'}</h2>
        
        <h3>1. Dados Pessoais</h3>
        <ul>
          <li><strong>Nome:</strong> ${data.nome}</li>
          <li><strong>CPF:</strong> ${data.cpf}</li>
          <li><strong>Nascimento:</strong> ${data.dataNascimento}</li>
          <li><strong>Mãe:</strong> ${data.filiacaoMaterna}</li>
          <li><strong>Pai:</strong> ${data.filiacaoPaterna}</li>
          <li><strong>Nacionalidade/Naturalidade:</strong> ${data.nacionalidade} / ${data.naturalidade}</li>
          <li><strong>Sexo:</strong> ${data.sexo}</li>
          <li><strong>Raça/Cor:</strong> ${data.raca}</li>
          <li><strong>Estado Civil:</strong> ${data.estadoCivil}</li>
          <li><strong>Grau de Instrução:</strong> ${data.grauInstrucao}</li>
          <li><strong>Tem Filhos Menores de 21:</strong> ${data.temFilhos}</li>
        </ul>

        <h3>2. Endereço</h3>
        <ul>
          <li><strong>Logradouro:</strong> ${data.logradouro}, ${data.numero} - ${data.complemento}</li>
          <li><strong>Bairro:</strong> ${data.bairro}</li>
          <li><strong>Cidade/Estado:</strong> ${data.cidade} / ${data.estado}</li>
          <li><strong>CEP:</strong> ${data.cep}</li>
        </ul>

        <h3>3. Informações da Contratação</h3>
        <ul>
          <li><strong>Empresa Contratante:</strong> ${data.empresa}</li>
          <li><strong>Cargo/Função:</strong> ${data.cargo}</li>
          <li><strong>Salário:</strong> ${data.salario}</li>
          <li><strong>Carga Horária:</strong> ${data.cargaHoraria}</li>
        </ul>

        <hr />
        <p><small>Enviado automaticamente pelo Smart Form Simples Assessoria.</small></p>
      </div>
    `;

    await transporter.sendMail({
      from: `"Admissão Simples Contábil" <${process.env.EMAIL_USER}>`,
      to: 'departamentopessoal@simplescontabilrv.com', // O e-mail de destino solicitado
      subject: `[Nova Admissão] ${data.nome || 'Candidato'}`,
      html: htmlContent,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    return res.status(500).json({ error: 'Falha ao enviar o e-mail.' });
  }
}
