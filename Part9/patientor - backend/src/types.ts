// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface DiagnoseEntry{
    "code" : string,
    "name" : string,
    "latin"? : string
}

export interface PatientEntry {
  id: string;
  name: string;
  ssn: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}


export type PublicPatient = Omit<PatientEntry, 'ssn' | 'entries' >

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}