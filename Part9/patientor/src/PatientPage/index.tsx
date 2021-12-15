import React, { useState } from 'react';
import axios from 'axios';
import { Patient , Entry} from '../types';
import { apiBaseUrl } from '../constants';
import { useParams } from 'react-router-dom';
import GenderIcon from '../components/GenderIcon';
import Hospital from './Hospital';
import OccupationalHealthcare from './OccupationalHealthcare';
import HealthCheck from './HealthCheck';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';
import { Icon, SemanticCOLORS, Button } from "semantic-ui-react";
import { useStateValue, singlePatient } from "../state";

const PatientPage = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient>();
  const [{diagnoses}, dispatch] = useStateValue();
  React.useEffect(() => {
    const getPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patient);
      } catch (e) {
        console.error(e);
      }
    };
    void getPatient();
  }, []);

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const EntryDetail = ({entry} : {entry : Entry}) =>{
    switch(entry.type){
      case 'Hospital':
        return <Hospital entry={entry} />;
      case 'OccupationalHealthcare':
        return <OccupationalHealthcare entry={entry} />;
      case 'HealthCheck':
        return <HealthCheck entry={entry} />;
      default:
        return assertNever(entry);
    }
  };

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients`,
        values
      );
      dispatch({ type: "ADD_PATIENT", payload: newPatient });
      closeModal();
    } catch (e) {
      console.error((e as Error).message || 'Unknown Error');
      setError((e as Error).message || 'Unknown error');
    }
  };




  if (!patient) {
    return (<p>loadinng</p>);
  }
  else {
    return (
      <div>
        <h1> {patient.name} <GenderIcon gender={patient.gender} /> </h1>
        <p> ssn : {patient.ssn}</p>
        <p> occupation : {patient.occupation}</p>
        <br />
        <h4>entries</h4>
        {patient.entries.length === 0 ? null : patient.entries.map(entry =>(<div key={entry.id}> <EntryDetail entry={entry}/> </div>))}
      </div>
    );
  }
};

export default PatientPage;