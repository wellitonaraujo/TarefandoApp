import React, { useCallback, useEffect, useState } from "react";
import * as S from './styles';

export const SubtaskInput = React.memo(({ 
    value, 
    onChange, 
    onBlur, 
    autoFocus, 
    editable,
    style 
  }: any) => {
    const [localValue, setLocalValue] = useState(value);
    
    useEffect(() => {
      setLocalValue(value);
    }, [value]);
  
    const handleChange = useCallback((text: string) => {
      setLocalValue(text);
      onChange(text);
    }, [onChange]);
  
    return (
      <S.NameSubTextInput
        value={localValue}
        onChangeText={handleChange}
        onBlur={onBlur}
        autoFocus={autoFocus}
        maxLength={35}
        multiline
        editable={editable}
        style={style}
      />
    );
  });
  