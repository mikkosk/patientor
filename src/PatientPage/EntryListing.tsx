import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state'
import HealthCheckEntryComponent from './HealthCheckEntry'
import HospitalEntryComponent from './HospitalEntry';
import OccupationalEntryComponent from './OccupationalEntry';

const EntryListing: React.FC<{ entry: Entry }> = ({ entry }) => {
    const [{ diagnosis }, dispatch] = useStateValue();
    const assertNever = (value: never): never => {
        throw new Error(
          `Unhandled discriminated union member: ${JSON.stringify(value)}`
        );
    }

    switch (entry.type) {
        case "HealthCheck":
            return(
                <HealthCheckEntryComponent entry={entry} />
            )
        case "Hospital":
            return(
                <HospitalEntryComponent entry={entry} />
            )
        case "OccupationalHealthcare":
            return(
                <OccupationalEntryComponent entry={entry} />
            )
        default:
            return assertNever(entry);
    }
}

export default EntryListing;