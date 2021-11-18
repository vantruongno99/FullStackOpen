import React from "react";
import { Icon } from 'semantic-ui-react';

const GenderIcon = ({gender}:{gender:string}) => {
    if (gender === 'male') {
        return (<Icon name='mars'  />);
    }
    else if (gender === 'female') {
        return (<Icon name='venus' />);
    }
    else {
        return (<Icon name='genderless' />);
    }
};

export default GenderIcon;