import React from 'react';
import {TrashIcon, Icon} from './styles';

interface HeaderProps {
  rightImageSource: any;
  isTask: boolean;
}

const Header: React.FC<HeaderProps> = ({rightImageSource, isTask}) => {
  return (
    <TrashIcon opacity={isTask ? 1 : 0.4} disabled={!isTask}>
      <Icon source={rightImageSource} />
    </TrashIcon>
  );
};

export default Header;
