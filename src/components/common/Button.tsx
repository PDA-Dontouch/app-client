import tw, { TwStyle, styled } from "twin.macro";

interface ButtonProps {
  name: string;
  status: StatusType;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export type StatusType = 'plain' | 'active' | 'disabled' | 'energy' | 'estates' | 'stock_sell' | 'stock_purchase';
type BtnStatusType = {
  [index: string]: TwStyle;
  plain: TwStyle;
  active: TwStyle;
  disabled: TwStyle;
  energy: TwStyle;
  estates: TwStyle;
  stock_sell: TwStyle;
  stock_purchase: TwStyle;
};

const btnStatus: BtnStatusType = {
  plain: tw`bg-gray10 text-black`,
  active: tw`bg-green text-white`,
  disabled: tw`bg-gray-disabled text-black40`,
  energy: tw`bg-blue text-white`,
  estates: tw`bg-yellow text-white`,
  stock_sell: tw`bg-blue-down text-white`,
  stock_purchase: tw` bg-red text-white`
};

const Btn = styled.button<{ status: StatusType }>(({ status }) => [
  tw`w-full max-h-14 py-[18px] rounded-12 flex justify-center items-center text-base border-none shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]`,
  btnStatus[status],
]);

const Button = ({ name, status, onClick }: ButtonProps) => {
  return (
    <Btn disabled={status === 'disabled' ? true : false} status={status} onClick={onClick}>{name}</Btn>
  );
};

export default Button;