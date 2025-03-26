import { Pressable, TextInput } from 'react-native';
import { useRef, useState } from 'react';
import Toast from 'react-native-toast-message';
import * as S from './styles';

interface HeaderTaskProps {
  initialName: string;
  onSave: (name: string) => Promise<void>;
}

export const HeaderTask = ({ initialName, onSave }: HeaderTaskProps) => {
  const [editableName, setEditableName] = useState(initialName);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const handleNameBlur = async () => {
    const trimmedName = editableName.trim();
    if (trimmedName === "") {
      Toast.show({
        type: "error",
        text1: "O nome não pode ficar vazio",
        position: "bottom",
        visibilityTime: 3000,
        autoHide: true,
      });
      return;
    }
    
    if (trimmedName !== initialName) {
      await onSave(trimmedName);
    }
    setIsEditing(false);
  };

  return (
    <Pressable onPress={() => setIsEditing(true)}>
      <S.Title>{editableName}</S.Title>
      {isEditing && (
        <TextInput
          ref={inputRef}
          value={editableName}
          onChangeText={setEditableName}
          onBlur={handleNameBlur}
          autoFocus
          maxLength={80}
          multiline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      )}
    </Pressable>
  );
};