import React from 'react'
import { useStateValue } from '../state'
import { OccupationalHealthCareEntry } from '../types'
import { Icon, Segment } from 'semantic-ui-react'

const OccupationalEntryComponent: React.FC<{entry: OccupationalHealthCareEntry}> = ({ entry }) => {

    const [{ diagnosis }, dispatch ] = useStateValue()
    return(
        <Segment>
            <h3>{entry.date} <Icon name='wrench' size='big'/></h3>
            <i>{entry.description}</i>
            <div />
            <small>{entry.specialist}</small>
            <ul>
                {entry.diagnosisCodes?.map(d => 
                    <li key={d}>
                        {d} {Object.values(diagnosis).find(df => df.code === d)?.name}
                    </li>
                )}
            </ul>
            <h3>Sickleave:</h3>
            <p>{entry.sickLeave?.startDate}</p>
            <p>{entry.sickLeave?.endDate}</p>
        </Segment>
    )
}

export default OccupationalEntryComponent;