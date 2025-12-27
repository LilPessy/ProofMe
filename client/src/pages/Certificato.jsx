import {useState} from 'react';
import FormField from '../components/FormField';
import FormSelect from '../components/FormSelect';
import Navbar from '../components/Navbar';
import './Certificato.css';
import Button from '../components/Button';

const Certificato = () => {

    const [tipoCertificato, setTipoCertificato] = useState('');

    const handleTypeChange = (e) => {
        setTipoCertificato(e.target.value);
        alert(e.target.value);
    }




  return (
    <div className="certificato-page">
        <Navbar/>
        <h2>Emetti Certificato</h2>
        <form>
            <FormField label="Nome Certificato" type="text" name="nomeCertificato" placeholder="Inserisci il nome del certificato" />
            <FormSelect label="Tipo Certificato" name="tipoCertificato" option1="Formazione" option2="Esperienza Lavorativa" option3="Laurea" onChange={handleTypeChange}/>
            <FormField label="Descrizione" type="text" name="descrizione" placeholder="Inserisci la descrizione del certificato" />
            <FormField label="Data Rilascio" type="date" name="dataRilascio" placeholder="Seleziona la data di rilascio" />
            <FormField label="ID Candidato" type="text" name="idCandidato" placeholder="Inserisci l'ID del candidato" />
            <Button content="Emetti Certificato" type="submit"/>
        </form>

    </div>
  );
};

export default Certificato;
