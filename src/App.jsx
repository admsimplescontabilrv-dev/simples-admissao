import { useState } from 'react';
import './App.css';
import WelcomeStep from './components/WelcomeStep';
import PersonalInfoStep from './components/PersonalInfoStep';
import AddressStep from './components/AddressStep';
import ContractInfoStep from './components/ContractInfoStep';
import UploadStep from './components/UploadStep';
import ReviewStep from './components/ReviewStep';
import SuccessStep from './components/SuccessStep';
import { generateAdmissionPDF } from './utils/pdfGenerator';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [returnToReview, setReturnToReview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pdfBlob, setPdfBlob] = useState(null);

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    if (returnToReview) {
      setReturnToReview(false);
      setCurrentStep(5); // Volta direto para o resumo
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (returnToReview) {
      setReturnToReview(false);
      setCurrentStep(5); // Volta para o resumo ao invés de voltar sequencial
    } else {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGoToStep = (step) => {
    setReturnToReview(true);
    setCurrentStep(step);
  };

  const uploadToCloudinary = async (fileObj) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
    
    if (!cloudName || !uploadPreset) {
      throw new Error("Credenciais do Cloudinary não configuradas");
    }

    const fd = new FormData();
    fd.append('file', fileObj);
    fd.append('upload_preset', uploadPreset);

    // auto serve para imagens, pdfs, etc
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`, {
      method: 'POST',
      body: fd
    });

    if (!response.ok) {
      throw new Error('Falha no upload para o Cloudinary');
    }

    const data = await response.json();
    return data.secure_url;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // 1. Upload dos arquivos para o Cloudinary
      const fileUrls = {};
      const files = formData.files || {};

      const uploadPromises = Object.entries(files).map(async ([key, fileObj]) => {
        if (fileObj) {
          const url = await uploadToCloudinary(fileObj);
          fileUrls[key] = url;
        }
      });
      await Promise.all(uploadPromises);

      // 2. Gera o PDF com todos os dados
      const completeData = { ...formData, fileUrls };
      const { blob } = await generateAdmissionPDF(completeData);
      setPdfBlob(blob);

      // 3. Upload do PDF para o Cloudinary
      const pdfFile = new File(
        [blob],
        `Ficha_Admissao_${(formData.nome || 'Candidato').replace(/\s+/g, '_')}.pdf`,
        { type: 'application/pdf' }
      );
      const pdfUrl = await uploadToCloudinary(pdfFile);

      // 4. Envia dados + URLs para a API (cria cartão no Trello)
      const { files: _files, ...dataWithoutFiles } = formData;
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...dataWithoutFiles,
          fileUrls,
          pdfUrl
        })
      });

      if (response.ok) {
        setCurrentStep(6); // Sucesso
      } else {
        alert("Erro ao enviar formulário. Tente novamente.");
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar formulário. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="app-container">
      <div className="logo-container">
        <img src="/logo.png" alt="Simples Assessoria Contábil" className="logo-image" style={{ maxWidth: '300px', width: '100%' }} />
      </div>
      
      <div className="form-card">
        {currentStep === 0 && <WelcomeStep onNext={handleNext} />}
        {currentStep === 1 && <PersonalInfoStep formData={formData} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 2 && <AddressStep formData={formData} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 3 && <ContractInfoStep formData={formData} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 4 && <UploadStep formData={formData} onNext={handleNext} onBack={handleBack} />}
        {currentStep === 5 && <ReviewStep formData={formData} onBack={handleBack} onConfirm={handleSubmit} onGoToStep={handleGoToStep} isSubmitting={isSubmitting} />}
        {currentStep === 6 && <SuccessStep pdfBlob={pdfBlob} nomeColaborador={formData.nome} />}
      </div>
    </div>
  );
}

export default App;
