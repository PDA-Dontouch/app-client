import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import SearchIcon from "../../../assets/search.svg";

interface SearchBarProps{
  onSearch: (searchTerm: string) => void;
  modal: boolean;
}
interface TextBoxProps{
  modal: boolean;
}

const SearchContainer = styled.div`
  ${tw`w-full flex items-center p-2 mb-4`}
`;

const TextBox = styled.input<TextBoxProps>`
  ${tw`flex-1 p-2`}
  border: none;
  border-bottom: solid 1px black;
  background-color: ${({ modal }) => (modal ? '#F9F9F9' : 'white')};
  &:focus{
    outline: none;
  } 
`;

const SearchBtn = styled.img`
  ${tw`w-6 h-6 ml-2 cursor-pointer`}
`;

const SearchBar: React.FC<SearchBarProps> = ({onSearch, modal}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      onSearch(value);
    };

    return (
    <SearchContainer>
        <TextBox modal={modal} value={searchTerm} onChange={handleInputChange}></TextBox>
        <SearchBtn src={SearchIcon}></SearchBtn>
    </SearchContainer>
    );
  };
  
  export default SearchBar;