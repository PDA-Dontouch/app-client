import tw, { styled } from "twin.macro";

const Btn = styled.div`
  ${tw`w-[246px] flex bg-white px-4 py-5 rounded-12 justify-center items-center gap-4 shadow-[2px_2px_12px_0_rgba(0,0,0,0.2)]`}
`;

const Font = styled.p`
  ${tw`text-xl`}
`;

interface LoginProps {
  url: string;
  name: string;
}

const SocialLogin = ({ url, name }: LoginProps) => {
  return (
    <Btn>
      <img src={url} />
      <Font>{name}</Font>
    </Btn>
  );
};

export default SocialLogin;