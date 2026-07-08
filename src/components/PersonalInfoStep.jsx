import React, { useState } from 'react';
import { maskCPF, maskDate } from '../utils/masks';

function PersonalInfoStep({ formData, onNext, onBack }) {
  const [localData, setLocalData] = useState({
    nome: formData.nome || '',
    cpf: formData.cpf || '',
    dataNascimento: formData.dataNascimento || '',
    filiacaoMaterna: formData.filiacaoMaterna || '',
    filiacaoPaterna: formData.filiacaoPaterna || '',
    nacionalidade: formData.nacionalidade || '',
    naturalidade: formData.naturalidade || '',
    sexo: formData.sexo || '',
    raca: formData.raca || '',
    estadoCivil: formData.estadoCivil || '',
    grauInstrucao: formData.grauInstrucao || '',
    temFilhos: formData.temFilhos || ''
  });

  const handleChange = (e) => {
    let { name, value } = e.target;
    
    if (name === 'cpf') value = maskCPF(value);
    if (name === 'dataNascimento') value = maskDate(value);

    // Transforma em maiúsculo apenas inputs de texto (não selects/radios)
    if (e.target.type === 'text') value = value.toUpperCase();

    setLocalData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextClick = () => {
    const requiredFields = ['sexo', 'raca', 'estadoCivil', 'grauInstrucao', 'temFilhos'];
    const missingFields = requiredFields.filter(field => !localData[field]);
    
    if (missingFields.length > 0) {
      alert('Por favor, preencha os campos obrigatórios:\n- Sexo\n- Raça/Cor\n- Estado Civil\n- Grau de instrução\n- Filhos/dependentes');
      return;
    }

    onNext(localData);
  };

  return (
    <>
      <div className="step-header">
        <h2>Informações pessoais</h2>
        <p>Obs: Tenha em mão: Documento pessoal com foto e comprovante de endereço</p>
      </div>
      <div className="step-content">
        <div className="form-group">
          <label>Qual é seu nome completo?</label>
          <input type="text" className="form-control" name="nome" value={localData.nome} onChange={handleChange} placeholder="Digite seu nome." />
        </div>

        <div className="form-group">
          <label>Qual é o seu CPF?</label>
          <input type="text" className="form-control" name="cpf" value={localData.cpf} onChange={handleChange} placeholder="###.###.###-##" />
        </div>

        <div className="form-group">
          <label>Qual é a sua data de nascimento?</label>
          <input type="text" className="form-control" name="dataNascimento" value={localData.dataNascimento} onChange={handleChange} placeholder="##/##/####" />
        </div>

        <div className="form-group">
          <label>Filiação Materna</label>
          <input type="text" className="form-control" name="filiacaoMaterna" value={localData.filiacaoMaterna} onChange={handleChange} placeholder="Digite o nome da sua mãe." />
        </div>

        <div className="form-group">
          <label>Filiação Paterna</label>
          <input type="text" className="form-control" name="filiacaoPaterna" value={localData.filiacaoPaterna} onChange={handleChange} placeholder="Digite o nome do seu pai. (se constar)" />
        </div>

        <div className="form-group">
          <label>Qual é a sua Nacionalidade?</label>
          <input type="text" className="form-control" name="nacionalidade" value={localData.nacionalidade} onChange={handleChange} placeholder="EX: Brasileira" />
        </div>

        <div className="form-group">
          <label>Em qual município você nasceu?</label>
          <input type="text" className="form-control" name="naturalidade" value={localData.naturalidade} onChange={handleChange} placeholder="EX: Rio Verde - GO" />
        </div>

        <div className="form-group">
          <label>Qual é o seu sexo?</label>
          <select className="form-control" name="sexo" value={localData.sexo} onChange={handleChange}>
            <option value="">Favor selecionar</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qual é sua raça/cor?</label>
          <select className="form-control" name="raca" value={localData.raca} onChange={handleChange}>
            <option value="">Favor selecionar</option>
            <option value="Indígena">Indígena</option>
            <option value="Branca">Branca</option>
            <option value="Preta">Preta</option>
            <option value="Parda">Parda</option>
            <option value="Amarela">Amarela</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qual é o seu Estado Civil?</label>
          <select className="form-control" name="estadoCivil" value={localData.estadoCivil} onChange={handleChange}>
            <option value="">Favor selecionar</option>
            <option value="Solteiro(a)">Solteiro(a)</option>
            <option value="Casado(a)">Casado(a)</option>
            <option value="Viúvo(a)">Viúvo(a)</option>
            <option value="Divorciado(a)">Divorciado(a)</option>
            <option value="Concubinato(a)">Concubinato(a)</option>
            <option value="Separado(a) Judicialmente">Separado(a) Judicialmente</option>
            <option value="União Estável">União Estável</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qual é o seu Grau de instrução</label>
          <select className="form-control" name="grauInstrucao" value={localData.grauInstrucao} onChange={handleChange}>
            <option value="">Favor selecionar</option>
            <option value="Analfabeto">Analfabeto</option>
            <option value="Ensino Fundamental até 5º Incompleto">Ensino Fundamental até 5º Incompleto</option>
            <option value="Ensino Fundamental 5º Completo">Ensino Fundamental 5º Completo</option>
            <option value="Ensino Fundamental 6º ao 9º">Ensino Fundamental 6º ao 9º</option>
            <option value="Ensino Fundamental Completo">Ensino Fundamental Completo</option>
            <option value="Ensino Médio Incompleto">Ensino Médio Incompleto</option>
            <option value="Ensino Médio Completo">Ensino Médio Completo</option>
            <option value="Superior Incompleto">Superior Incompleto</option>
            <option value="Superior Completo">Superior Completo</option>
            <option value="Pós-Graduação">Pós-Graduação</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
            <option value="Ph. D">Ph. D</option>
          </select>
        </div>

        <div className="form-group">
          <label>Você possui filhos/dependentes com menos de 21 anos?</label>
          <div className="radio-group">
            <label className="radio-label">
              <input type="radio" name="temFilhos" value="Sim" checked={localData.temFilhos === 'Sim'} onChange={handleChange} />
              Sim
            </label>
            <label className="radio-label">
              <input type="radio" name="temFilhos" value="Não" checked={localData.temFilhos === 'Não'} onChange={handleChange} />
              Não
            </label>
          </div>
        </div>
      </div>
      <div className="step-footer">
        <button className="btn" onClick={onBack}>Voltar</button>
        <button className="btn" onClick={handleNextClick}>Avançar</button>
      </div>
    </>
  );
}

export default PersonalInfoStep;
