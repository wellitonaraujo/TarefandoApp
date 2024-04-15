import {SearchInputProps} from '../../models/SearchInputProps';
import {CloseIcon, Container, SearchIcon, StyledInput} from './styles';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';
import React, {useState} from 'react';

const SearchInput: React.FC<SearchInputProps> = ({placeholder, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showCloseIcon, setShowCloseIcon] = useState<boolean>(false);
  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const clearSearch = () => {
    setSearchTerm('');
    setShowCloseIcon(false);
    onSearch(''); // Limpa a busca
  };

  return (
    <Container>
      <TouchableOpacity onPress={handleSearch}>
        <SearchIcon source={imgs.icon_search} />
      </TouchableOpacity>
      <StyledInput
        placeholder={placeholder}
        placeholderTextColor={colors.grey.s100}
        value={searchTerm}
        onChangeText={text => {
          setSearchTerm(text);
          setShowCloseIcon(text.length > 0);
          onSearch(text);
        }}
        onSubmitEditing={handleSearch}
      />
      {showCloseIcon && (
        <TouchableOpacity onPress={clearSearch}>
          <CloseIcon source={imgs.close} />
        </TouchableOpacity>
      )}
    </Container>
  );
};

export default SearchInput;
