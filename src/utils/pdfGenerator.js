import { jsPDF } from 'jspdf';

/**
 * Gera um PDF formatado com os dados de admissão do colaborador.
 * @param {Object} data - Dados completos do formulário (formData)
 * @returns {{ blob: Blob, base64: string }} - O PDF como Blob (para download) e base64 (para API)
 */
export async function generateAdmissionPDF(data) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = 20;

  // Helper: quebra de página se necessário
  const checkPage = (needed = 15) => {
    if (y + needed > 275) {
      doc.addPage();
      y = 20;
    }
  };

  // ========== CABEÇALHO ==========
  const headerHeight = 35;
  doc.setFillColor(15, 15, 20); // Preto/Cinza bem escuro
  doc.rect(0, 0, pageWidth, headerHeight, 'F');
  y = 8; // Início dentro do header

  try {
    const res = await fetch('/logo.png');
    if (res.ok) {
      const blob = await res.blob();
      const base64 = await new Promise(resolve => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      const img = new Image();
      img.src = base64;
      await new Promise(resolve => img.onload = resolve);
      
      const imgWidth = 45; // Largura da logo
      const imgHeight = (img.height * imgWidth) / img.width;
      doc.addImage(base64, 'PNG', (pageWidth - imgWidth) / 2, y, imgWidth, imgHeight);
      y += imgHeight + 10;
    }
  } catch (e) {
    console.error('Falha ao carregar logo no PDF', e);
  }

  y = headerHeight + 15; // Volta para abaixo do header

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(30, 30, 40);
  doc.text('FICHA DE ADMISSÃO', pageWidth / 2, y, { align: 'center' });

  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  const now = new Date();
  const dateStr = now.toLocaleDateString('pt-BR') + ' às ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  doc.text(`Gerado em: ${dateStr}`, pageWidth / 2, y + 6, { align: 'center' });

  y += 18;

  // ========== HELPER: Seção ==========
  const drawSection = (title) => {
    checkPage(20);
    doc.setFillColor(45, 45, 60);
    doc.roundedRect(margin, y, contentWidth, 9, 2, 2, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(255, 255, 255);
    doc.text(title, margin + 4, y + 6.5);
    y += 14;
  };

  // ========== HELPER: Campo ==========
  const drawField = (label, value) => {
    checkPage(15);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 130);
    doc.text(label, margin + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 60);
    
    const splitText = doc.splitTextToSize(value || '—', contentWidth - 4);
    doc.text(splitText, margin + 2, y + 5);
    const textHeight = splitText.length * 4.5; // height per line
    
    // Linha separadora
    doc.setDrawColor(230, 230, 235);
    doc.line(margin + 2, y + 2 + textHeight, margin + contentWidth - 2, y + 2 + textHeight);
    y += 7 + textHeight;
  };

  // ========== HELPER: Campo duplo ==========
  const drawFieldDouble = (label1, value1, label2, value2) => {
    checkPage(15);
    const halfWidth = contentWidth / 2;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 130);
    doc.text(label1, margin + 2, y);
    doc.text(label2, margin + halfWidth + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(50, 50, 60);
    
    const splitText1 = doc.splitTextToSize(value1 || '—', halfWidth - 4);
    const splitText2 = doc.splitTextToSize(value2 || '—', halfWidth - 4);
    
    doc.text(splitText1, margin + 2, y + 5);
    doc.text(splitText2, margin + halfWidth + 2, y + 5);
    
    const lines1 = splitText1.length;
    const lines2 = splitText2.length;
    const maxLines = Math.max(lines1, lines2);
    const textHeight = maxLines * 4.5;
    
    doc.setDrawColor(230, 230, 235);
    doc.line(margin + 2, y + 2 + textHeight, margin + contentWidth - 2, y + 2 + textHeight);
    y += 7 + textHeight;
  };

  // ========== SEÇÃO 1: DADOS PESSOAIS ==========
  drawSection('DADOS PESSOAIS');
  drawField('Nome Completo', data.nome);
  drawFieldDouble('CPF', data.cpf, 'Data de Nascimento', data.dataNascimento);
  drawFieldDouble('Filiação Materna', data.filiacaoMaterna, 'Filiação Paterna', data.filiacaoPaterna);
  drawFieldDouble('Nacionalidade', data.nacionalidade, 'Naturalidade', data.naturalidade);
  drawFieldDouble('Sexo', data.sexo, 'Raça/Cor', data.raca);
  drawFieldDouble('Estado Civil', data.estadoCivil, 'Grau de Instrução', data.grauInstrucao);
  
  if (data.temFilhos === 'Sim') {
    drawField('Possui filhos/dependentes < 21 anos', data.temFilhos);
  }

  // ========== SEÇÃO 2: ENDEREÇO ==========
  drawSection('ENDEREÇO');
  drawField('CEP', data.cep);
  drawField('Logradouro', data.logradouro);
  drawFieldDouble('Número', data.numero, 'Complemento', data.complemento);
  drawFieldDouble('Bairro', data.bairro, 'Cidade / Estado', `${data.cidade || '—'} / ${data.estado || '—'}`);

  // ========== SEÇÃO 3: CONTRATAÇÃO ==========
  drawSection('INFORMAÇÕES DA CONTRATAÇÃO');
  drawField('Empresa Contratante', data.empresa);
  drawField('Cargo / Função', data.cargo);
  drawFieldDouble('Salário Combinado', data.salario, 'Carga Horária', data.cargaHoraria);

  // ========== SEÇÃO 4: DOCUMENTOS ==========
  drawSection('DOCUMENTOS ANEXADOS');
  const docLabels = {
    identificacao: 'Documento de Identificação',
    endereco: 'Comprovante de Endereço',
    exame: 'Exame Admissional'
  };
  
  if (data.temFilhos === 'Sim') {
    docLabels.documentoFilhos = 'Documento dos Filhos';
  }
  const fileUrls = data.fileUrls || {};
  Object.entries(docLabels).forEach(([key, label]) => {
    checkPage(10);
    const hasFile = !!fileUrls[key];
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 130);
    doc.text(label, margin + 2, y);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(hasFile ? 76 : 180, hasFile ? 175 : 180, hasFile ? 80 : 180);
    doc.text(hasFile ? 'Anexado' : '— Não enviado', margin + 2, y + 5);
    doc.setDrawColor(230, 230, 235);
    doc.line(margin + 2, y + 8, margin + contentWidth - 2, y + 8);
    y += 12;
  });

  // ========== RODAPÉ ==========
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(160, 160, 160);
    doc.text(
      `Simples Assessoria Contábil — Ficha de Admissão — Página ${i} de ${totalPages}`,
      pageWidth / 2,
      290,
      { align: 'center' }
    );
  }

  // Retorno em blob e base64
  const blob = doc.output('blob');
  const base64 = doc.output('datauristring').split(',')[1];
  return { blob, base64 };
}
