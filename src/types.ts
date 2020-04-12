export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

interface BaseEntry {
  id: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthCareEntry extends BaseEntry {
  employerName: string;
  type: "OccupationalHealthcare";
  sickLeave?: SickLeave;
}

export type Entry = 
    | HospitalEntry
    | OccupationalHealthCareEntry
    | HealthCheckEntry;

export type NewEntry = Omit<HospitalEntry, "id"> | Omit<OccupationalHealthCareEntry, "id"> | Omit<HealthCheckEntry, "id">;

export interface FormEntry {
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  description: string;
  type: "HealthCheck" | "OccupationalHealthcare" | "Hospital";
  healthCheckRating: HealthCheckRating;
  sickLeave: SickLeave;
  employerName: string;
  discharge: {
    dischargeDate: string;
    criteria: string;
  };
} 