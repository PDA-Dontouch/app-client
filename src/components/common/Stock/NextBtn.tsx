import tw, { styled } from 'twin.macro';
import NextImg from '../../../assets/triangle.svg';

interface TextProps {
  content: string;
  onClick: () => void;
}

const TextContainer = styled.div`
  ${tw`flex justify-end items-center mt-2 pe-4 gap-1`}
`;

const NextText = styled.span`
  ${tw`text-sm cursor-pointer`}
`;

const NavImage = styled.img`
  ${tw`w-3 h-3`}
`;

const NextBtn = (input: TextProps) => {
  return (
    <TextContainer>
      <NextText onClick={(e)=>{
        e.stopPropagation();
        input.onClick();
      }}>{input.content}</NextText>
      <NavImage src={NextImg} />
    </TextContainer>
  );
};

export default NextBtn;
