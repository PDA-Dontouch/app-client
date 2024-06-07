import tw, { styled } from "twin.macro";

interface LoginProps {
  url: string;
  name: string;
  onClick: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

const Btn = styled.div`
  ${tw`flex bg-white px-4 py-5 rounded-12 justify-center items-center gap-4 shadow-[2px_2px_12px_0_rgba(0,0,0,0.2)]`}
`;

const Font = styled.span`
  ${tw`w-[86px] text-xl text-center`}
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