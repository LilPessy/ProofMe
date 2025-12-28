import { useState } from 'react';
import FormField from '../components/FormField';
import FormSelect from '../components/FormSelect';
import Navbar from '../components/Navbar';
import './Certificato.css';
import Button from '../components/Button';

const Certificato = () => {

  const [formData, setFormData] = useState({
    idCandidato: '',
    nomeCertificato: '',
    tipoCertificato: '',
    descrizione: '',
    dataInizio: '',
    dataFine: '',
    votoLaurea: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
    const response = await fetch(
      'http://localhost:3000/api/certificati',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      }
    );

    const result = await response.json();

    if (!response.ok) {
      alert(result.error || 'Errore nell\'emissione del certificato');
      return;
    }
    alert('Certificato emesso con successo!');

  } catch (err) {
    console.error(err);
    alert('Errore di connessione al server');
    }
  };

  return (
    <div className="certificato-page">
      <Navbar/>
      <h2>Emetti Certificato</h2>

      <form onSubmit={handleSubmit} className="certificato-form">

        <FormField
          label="ID Candidato"
          type="text"
          name="idCandidato"
          value={formData.idCandidato}
          onChange={handleChange}
        />

        <FormField
          label="Nome Certificato"
          type="text"
          name="nomeCertificato"
          value={formData.nomeCertificato}
          onChange={handleChange}
        />

        <FormSelect
          label="Tipo Certificato"
          name="tipoCertificato"
          value={formData.tipoCertificato}
          option1="Formazione"
          option2="Esperienza Lavorativa"
          option3="Laurea"
          onChange={handleChange}
        />

        <FormField
          label="Descrizione"
          type="text"
          name="descrizione"
          value={formData.descrizione}
          onChange={handleChange}
        />

        <FormField
          label="Data Inizio"
          type="date"
          name="dataInizio"
          value={formData.dataInizio}
          onChange={handleChange}
        />

        <FormField
          label="Data Fine"
          type="date"
          name="dataFine"
          value={formData.dataFine}
          onChange={handleChange}
        />

        {formData.tipoCertificato === 'Laurea' && (
          <FormField
            label="Voto di Laurea"
            type="number"
            name="votoLaurea"
            value={formData.votoLaurea}
            max={111}
            onChange={handleChange}
          />
        )}

        <Button content="Emetti Certificato" type="submit"/>
      </form>
    </div>
  );
};

export default Certificato;
