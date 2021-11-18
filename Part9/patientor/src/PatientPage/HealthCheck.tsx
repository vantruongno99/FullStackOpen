import React from 'react';
import { Icon, Card } from 'semantic-ui-react';
import { HealthCheckEntry } from '../types';

const style = { margin: 10 ,  width: 1000};

const HealthCheck = ({ entry } : {entry : HealthCheckEntry}) => {
  let color: 'green' | 'yellow' | 'orange' | 'red';

  switch (entry.healthCheckRating) {
    case 0:
      color = 'green';
      break;
    case 1:
      color = 'yellow';
      break;
    case 2:
      color = 'orange';
      break;
    case 3:
      color = 'red';
      break;
    default:
      color = 'green';
      break;
  }

  return (
    <div>
      <Card style={style}>
        <Card.Content>
          {entry.date} <Icon name="user doctor" size='big'/>
        </Card.Content>
        <Card.Content description={entry.description} />
        <Card.Content extra>
          <Icon name="heart" color={color} />
        </Card.Content>
      </Card>
    </div>
  );
};

export default HealthCheck;