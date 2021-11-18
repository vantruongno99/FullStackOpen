import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { HospitalEntry } from '../types';

const style = { margin: 10 ,  width: 1000};

const Hospital = ({ entry } : { entry: HospitalEntry }) => (
  <div>
    <Card style={style}>
      <Card.Content>
        {entry.date} <Icon name="hospital symbol" size='big'/>
      </Card.Content>
      <Card.Content description={entry.description} />
    </Card>
  </div>
);

export default Hospital;