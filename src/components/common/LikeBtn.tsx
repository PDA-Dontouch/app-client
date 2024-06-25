import tw, { styled } from 'twin.macro';

import Empty from '../../assets/empty-heart.svg';
import Fill from '../../assets/fill-heart.svg';

interface LikeProps {
  isLike: boolean;
  setIsLike: () => void;
}

const Container = styled.div`
  ${tw`w-fit h-[3.2rem] flex justify-center items-center px-[14px] bg-gray rounded-12 shadow-[2px_2px_4px_0_rgba(0,0,0,0.25)]`}
`;

const Img = styled.img`
  ${tw`w-6 h-6`}
`;

const LikeBtn = ({ isLike, setIsLike }: LikeProps) => {
  return (
    <Container>
      {isLike ? (
        <Img src={Fill} onClick={setIsLike} />
      ) : (
        <Img src={Empty} onClick={setIsLike} />
      )}
    </Container>
  );
};

export default LikeBtn;
