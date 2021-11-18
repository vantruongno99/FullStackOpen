import patientData from '../data/patients'
import { PatientEntry, NewPatientEntry, PublicPatient } from '../types'
import { v4 as uuid } from "uuid";

let patients: Array<PatientEntry> = patientData;


const getAll = (): PublicPatient[] => {
  return patients.map(({ id, name, gender, occupation, dateOfBirth,entries }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
      entries
    };
  });
};

const getById = (id: string): PatientEntry | undefined => {
  const entry = patients.find(patient => patient.id === id);
  return entry;
};


const add = (patient: NewPatientEntry): PatientEntry => {
  const newPatient = { id: uuid(), ...patient, entries: [] }
  patients = patients.concat(newPatient);
  return newPatient;
}

export default { getAll, add, getById }