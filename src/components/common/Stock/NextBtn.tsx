import tw, { styled } from "twin.macro";
import NextImg from '../../../assets/triangle.svg';

interface TextProps {
  content: string;
  onClick: ()=>void;
}

const TextContainer = styled.div`
  ${tw`flex justify-end mt-3 mr-4 gap-1`}
`;

const NextText = styled.span`
  ${tw`text-base`}
`;

const NavImage = styled.img`
  ${tw`w-3 h-3 mt-1`}
`;

const NextBtn = (input: TextProps) => {
  return (
    <TextContainer onClick={input.onClick}>
          <NextText>{input.content}</NextText>
          <NavImage src={NextImg} />
    </TextContainer>
  );
};

export default NextBtn;