import {TrashIcon, Icon} from './styles';
import React from 'react';

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
