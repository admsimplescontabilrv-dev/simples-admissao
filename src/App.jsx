import { useState } from 'react';
import './App.css';
import WelcomeStep from './components/WelcomeStep';
import PersonalInfoStep from './components/PersonalInfoStep';
import AddressStep from './components/AddressStep';
import ContractInfoStep from './components/ContractInfoStep';
import UploadStep from './components/UploadStep';
import SuccessStep from './components/SuccessStep';

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  const handleNext = (stepData) => {
    setFormData(prev => ({ ...prev, ...stepData }));
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (finalData) => {
    // Combine with existing state
    const completeData = { ...formData, ...finalData };
    setFormData(completeData);

    try {
      // Send data to API
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(completeData)
      });

      if (response.ok) {
        setCurrentStep(5); // Go to success step
      } else {
        alert("Erro ao enviar formulário. Tente novamente.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar formulário. Tente novamente.");
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
        {currentStep === 4 && <UploadStep formData={formData} onBack={handleBack} onSubmit={handleSubmit} />}
        {currentStep === 5 && <SuccessStep />}
      </div>
    </div>
  );
}

export default App;
