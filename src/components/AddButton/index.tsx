import {ImageSourcePropType, Animated, Easing } from 'react-native';
import React, { useRef } from 'react';
import * as S from './styles';
import colors from '@/src/themes/colors';

interface AddButtonProps {
  icon?: ImageSourcePropType;
  onPress: () => void;
}

const icons = {
  plus: require('../../assets/icons/plus.png'),
};

const AddButton: React.FC<AddButtonProps> = ({
  onPress,
}) => {

  const pulseAnimation = useRef(new Animated.Value(1)).current;

  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnimation, {
          toValue: 0.95,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  React.useEffect(() => {
    startPulseAnimation();
    return () => pulseAnimation.stopAnimation();
  }, []);

  return (
    <S.Container>
      <Animated.View style={{ transform: [{ scale: pulseAnimation }] }}>
        <S.Button onPress={onPress}>
          <S.PlusIcon tintColor={colors.white} source={icons.plus} resizeMode='contain' />
        </S.Button>
      </Animated.View>
    </S.Container>
  );
  
};

export default AddButton;