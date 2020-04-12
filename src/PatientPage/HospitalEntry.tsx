import React from 'react'
import { useStateValue } from '../state'
import { HospitalEntry } from '../types'
import { Icon, Segment } from 'semantic-ui-react'

const HospitalEntryComponent: React.FC<{entry: HospitalEntry}> = ({ entry }) => {

    const [{ diagnosis }, dispatch ] = useStateValue()
    return(
        <Segment>
            <h3>{entry.date} <Icon name='hospital' size='big'/></h3>
            <i>{entry.description}</i>
            <div />
            <small>{entry.specialist}</small>
            <h4>Diagnosis: </h4>
            <ul>
                {entry.diagnosisCodes?.map(d => 
                    <li key={d}>
                        <b>{d}</b> <i>{Object.values(diagnosis).find(df => df.code === d)?.name}</i>
                    </li>
                )}
            </ul>
            <h4>Discharge:</h4>
            <p><b>Date: </b>{entry.discharge.date}</p>
            <p><b>Critetria: </b>{entry.discharge.criteria}</p>
        </Segment>
    )
}

export default HospitalEntryComponent;
