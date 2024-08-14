import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect';
import React from 'react';
import Button from '..';

describe('Button Component', () => {
  it('deve renderizar o título', () => {
    const { getByText } = render(<Button title="Test Button" />);
    expect(getByText('Test Button')).toBeTruthy();
  });

  it('deve aplicar opacidade quando desabilitado', () => {
    const { getByTestId } = render(<Button title="Test Button" disabled testID="button" />);
    const button = getByTestId('button');
    expect(button).toHaveStyle({ opacity: 0.3 });
  });

  it('deve chamar a função onPress ao pressionar', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<Button title="Test Button" onPress={onPressMock} />);
    fireEvent.press(getByText('Test Button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
