import React from 'react'
import { useStateValue } from '../state'
import { HealthCheckEntry } from '../types'
import { Icon, Segment, Divider } from 'semantic-ui-react'

const HealthCheckEntryComponent: React.FC<{entry: HealthCheckEntry}> = ({ entry }) => {

    const ratingColor = (number: Number): "black" | "red" | "yellow" | "green" | "blue" => {
        switch(number) {
            case 0:
                return "green";
            case 1: 
                return "yellow";
            case 2:
                return "red";
            case 3:
                return "black";
            default:
                return "blue";
        }
    }
    const [{ diagnosis }, dispatch ] = useStateValue()

    return(
        <Segment>
            <h3>{entry.date} <Icon name='eye' size='big'/></h3>
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
            <Icon name='heart' color={ratingColor(entry.healthCheckRating)} />
        </Segment>
    )
}

export default HealthCheckEntryComponent;