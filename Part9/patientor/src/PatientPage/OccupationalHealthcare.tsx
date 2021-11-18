import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from '../types';

const style = { margin: 10 ,  width: 1000};

const OccupationalHealthcare = ({ entry } : {entry : OccupationalHealthcareEntry}) => (
  <div>
    <Card style={style}>
      <Card.Content>
        {entry.date} <Icon name="stethoscope" size='big'/>
      </Card.Content>
      <Card.Content description={entry.description} />
    </Card>
  </div>
);

export default OccupationalHealthcare;