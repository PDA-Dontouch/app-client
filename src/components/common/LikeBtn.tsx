import { Dispatch, SetStateAction } from "react";
import tw, { styled } from "twin.macro";

import Empty from '../../assets/empty-heart.svg';
import Fill from '../../assets/fill-heart.svg';

interface LikeProps {
  isLike: boolean;
  setIsLike: Dispatch<SetStateAction<boolean>>;
}

const Container = styled.div`
  ${tw`w-fit h-[59px] flex justify-center items-center px-4 bg-gray rounded-16 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]`}
`;

const Img = styled.img`${tw`w-7 h-7`}`;

const LikeBtn = ({ isLike, setIsLike }: LikeProps) => {
  return (
    <Container>
      {isLike ?
        <Img src={Fill} onClick={() => setIsLike(false)} />
      :
        <Img src={Empty} onClick={() => setIsLike(true)} />
      }
    </Container>
  );
};

export default LikeBtn;