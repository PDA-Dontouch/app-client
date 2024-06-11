import tw, { styled } from 'twin.macro';
import SearchIcon from "../../../assets/search.svg";

interface SearchBarProps{
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

const SearchBar: React.FC<SearchBarProps> = ({modal}) => {
    return (
    <SearchContainer>
        <TextBox modal={modal}></TextBox>
        <SearchBtn src={SearchIcon}></SearchBtn>
    </SearchContainer>
    );
  };
  
  export default SearchBar;