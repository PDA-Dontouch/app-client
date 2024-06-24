import tw, { styled } from 'twin.macro';

interface LoginProps {
  url: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Btn = styled.div`
  ${tw`flex py-5 box-border rounded-12 justify-center items-center gap-4 shadow-[1px_1px_4px_0_rgba(0,0,0,0.1)]`}
`;

const Font = styled.span`
  ${tw`text-[1.2rem] text-center`}
`;

const SocialLogin = ({ url, name, onClick }: LoginProps) => {
  return (
    <Btn onClick={onClick}>
      <img src={url} />
      <Font>{name}</Font>
    </Btn>
  );
};

export default SocialLogin;
