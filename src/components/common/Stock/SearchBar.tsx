import tw, { styled } from 'twin.macro';
import SearchIcon from "../../../assets/search.svg";

const SearchContainer = styled.div`
  ${tw`flex items-center p-2 mb-4`}
`;

const TextBox = styled.input`
  ${tw`flex-1 p-2`}
  border: none;
  border-bottom: solid 1px black;
  &:focus{
    outline: none;
  } 
`;

const SearchBtn = styled.img`
  ${tw`w-6 h-6 ml-2 cursor-pointer`}
`;

const SearchBar = () => {
    return (
    <SearchContainer>
        <TextBox></TextBox>
        <SearchBtn src={SearchIcon}></SearchBtn>
    </SearchContainer>
    );
  };
  
  export default SearchBar;