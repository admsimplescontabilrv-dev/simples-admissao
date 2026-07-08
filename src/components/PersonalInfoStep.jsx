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
          <input type="text" className="form-control" name="nome" value={localData.nome} onChange={handleChange} placeholder="Digite acima seu nome." />
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
          <input type="text" className="form-control" name="filiacaoMaterna" value={localData.filiacaoMaterna} onChange={handleChange} placeholder="Digite acima o nome da sua mãe." />
        </div>

        <div className="form-group">
          <label>Filiação Paterna</label>
          <input type="text" className="form-control" name="filiacaoPaterna" value={localData.filiacaoPaterna} onChange={handleChange} placeholder="Digite acima o nome do seu pai. (se constar)" />
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
            <option value="SOLTEIRO(A)">SOLTEIRO (A)</option>
            <option value="CASADO(A)">CASADO (A)</option>
            <option value="VIÚVO(A)">VIÚVO (A)</option>
            <option value="DIVORCIADO(A)">DIVORCIADO (A)</option>
            <option value="UNIÃO ESTAVEL">UNIÃO ESTAVEL</option>
          </select>
        </div>

        <div className="form-group">
          <label>Qual é o seu Grau de instrução</label>
          <select className="form-control" name="grauInstrucao" value={localData.grauInstrucao} onChange={handleChange}>
            <option value="">Favor selecionar</option>
            <option value="ENSINO MÉDIO COMPLETO">ENSINO MÉDIO COMPLETO</option>
            <option value="SUPERIOR INCOMPLETO">SUPERIOR INCOMPLETO</option>
            <option value="SUPERIOR COMPLETO">SUPERIOR COMPLETO</option>
            {/* Adicionar mais opções conforme necessário */}
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
