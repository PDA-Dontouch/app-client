import React, { useState } from 'react';
import tw, { styled } from 'twin.macro';
import SearchIcon from '../../../assets/search.svg';

interface SearchBarProps {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  modal: boolean;
}
interface TextBoxProps {
  modal: boolean;
}

const SearchContainer = styled.div`
  ${tw`flex flex-row w-full justify-between items-center py-1 px-3 bg-white border-green border-solid border`}
  border-radius: 20px;
  box-sizing: border-box;
`;

const TextBox = styled.input<TextBoxProps>`
  ${tw`flex-1 p-2 text-base`}
  border: none;
  background-color: ${({ modal }) => (modal ? 'transparent' : 'white')};
  &:focus {
    outline: none;
    background-color: transparent;
  }
`;

const SearchBtn = styled.img`
  ${tw`w-6 h-6 ml-2 cursor-pointer`}
`;

const SearchBar: React.FC<SearchBarProps> = ({ setSearchTerm, modal }) => {
  const [search, setSearch] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearch(value);
    setSearchTerm(value);
  };

  return (
    <SearchContainer>
      <TextBox
        modal={modal}
        value={search}
        onChange={handleInputChange}
      ></TextBox>
      <SearchBtn src={SearchIcon}></SearchBtn>
    </SearchContainer>
  );
};

export default SearchBar;
