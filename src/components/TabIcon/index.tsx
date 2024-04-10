import {Container, IconImage, IconText} from './styles';
import React from 'react';

type Props = {
  name: string;
  icon: any;
  focused: boolean;
};

const TabIcon: React.FC<Props> = ({name, icon, focused}) => {
  return (
    <Container>
      <IconImage source={icon} focused={focused} />
      <IconText focused={focused}>{name}</IconText>
    </Container>
  );
};

export default TabIcon;
