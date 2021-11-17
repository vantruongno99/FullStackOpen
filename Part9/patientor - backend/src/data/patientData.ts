import toNewPatientEntry from "../utils";
import { PatientEntry } from "../types";
import patientJson from './patients.json'

const patientEntries: PatientEntry [] = patientJson.map(obj=>{
    const object = toNewPatientEntry(obj) as PatientEntry;
    object.id = obj.id;
    return object;
});

export default patientEntries