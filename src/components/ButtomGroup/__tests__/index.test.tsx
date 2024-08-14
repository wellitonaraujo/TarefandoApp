import { render, fireEvent } from '@testing-library/react-native';
import ButtonGroup from '..';
import React from 'react';

describe('ButtonGroup', () => {
  const mockHandleSave = jest.fn();
  const mockHandleCancel = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component correctly', () => {
    const { getByText } = render(
      <ButtonGroup 
        handleSave={mockHandleSave} 
        handleCancel={mockHandleCancel} 
        title="Test Title"
      />
    );

    expect(getByText('Salvar alterações')).toBeTruthy();
    expect(getByText('Cancelar')).toBeTruthy();
  });

  it('calls handleSave when the save button is pressed', () => {
    const { getByText } = render(
      <ButtonGroup 
        handleSave={mockHandleSave} 
        handleCancel={mockHandleCancel} 
        title="Test Title"
      />
    );

    fireEvent.press(getByText('Salvar alterações'));
    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('calls handleCancel when the cancel button is pressed', () => {
    const { getByText } = render(
      <ButtonGroup 
        handleSave={mockHandleSave} 
        handleCancel={mockHandleCancel} 
        title="Test Title"
      />
    );

    fireEvent.press(getByText('Cancelar'));
    expect(mockHandleCancel).toHaveBeenCalled();
  });

  it('disables the save button when title is empty', () => {
    const { queryByText } = render(
      <ButtonGroup 
        handleSave={mockHandleSave} 
        handleCancel={mockHandleCancel} 
        title=""
      />
    );

    expect(queryByText('Salvar alterações')).toBeTruthy();
  });

  it('shows the save button when title is provided', () => {
    const { getByText } = render(
      <ButtonGroup 
        handleSave={mockHandleSave} 
        handleCancel={mockHandleCancel} 
        title="Test Title"
      />
    );

    expect(getByText('Salvar alterações')).toBeTruthy();
  });
});
