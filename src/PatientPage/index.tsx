import React, {useState, useEffect} from 'react'
import { useStateValue, updatePatient } from '../state';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Patient, FormEntry, Entry }  from '../types'
import EntryListing from './EntryListing'
import { Divider, Button } from 'semantic-ui-react';
import AddEntryModal from '../AddEntryModal';


const PatientPage: React.FC = () => {
    const [ patient, setPatient ] = useState<Patient>(); 
    const [{ patients }, dispatch] = useStateValue();
    const { id } = useParams<{ id: string }>();

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string | undefined>();
  
    const openModal = (): void => setModalOpen(true);
  
    const closeModal = (): void => {
      setModalOpen(false);
      setError(undefined);
    };

    useEffect(() => {
        setPatient(Object.values(patients).find(p => p.id === id));
    },[patients, id])

    const submitNewEntry = async (values: FormEntry) => {
        try {
          const { data: newEntry } = await axios.post<Entry>(
            `${apiBaseUrl}/patients/${id}/entries`,
            values
          );

          if(patient) {
            dispatch(updatePatient({...patient, entries: patient.entries.concat(newEntry)}));
          }
          closeModal();
        } catch (e) {
          console.error(e.response.data);
          setError(e.response.data.error);
        }
      };

    const fetchPatient = async () => {
        try {
            const { data: newPatient } = await axios.get<Patient>(
                `${apiBaseUrl}/patients/${id}`
            );
            dispatch(updatePatient(newPatient));
            setPatient(newPatient);
        } catch (e) {
            console.log(e.response.data.error);
        }
    }

    if(!patient) return null;

    if(!patient.ssn) {
        fetchPatient();
    }

    return (
        <div>
            <h2>Name: {patient.name}</h2>
            <h3>Gender: {patient.gender}</h3>
            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>Date of birth: {patient.dateOfBirth}</p>
            <h3>entries</h3>
            <div>
                {patient.entries.map(e => 
                    <div key={e.id}>
                        <EntryListing entry={e}></EntryListing>
                        <Divider hidden/>
                    </div>
                )}
            </div>
            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />
            <Button onClick={() => openModal()}>Add New Entry</Button>
        </div>
    )
}

export default PatientPage;