import {SearchInputProps} from '../../models/SearchInputProps';
import {Container, SearchIcon, StyledInput} from './styles';
import {TouchableOpacity} from 'react-native';
import colors from '../../styles/colors';
import {imgs} from '../../screens/imgs';
import React, {useState} from 'react';

const SearchInput: React.FC<SearchInputProps> = ({placeholder, onSearch}) => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearch = () => {
    onSearch(searchTerm);
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
          onSearch(text);
        }}
        onSubmitEditing={handleSearch}
      />
    </Container>
  );
};

export default SearchInput;
