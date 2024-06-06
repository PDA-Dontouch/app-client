import tw, { TwStyle, styled } from "twin.macro";

interface ButtonProps {
  name: string;
  status: StatusType;
  type: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

type StatusType = 'plain' | 'active';
type BtnStatusType = {
  [index: string]: TwStyle;
  plain: TwStyle;
  active: TwStyle;
};

const btnStatus: BtnStatusType = {
  plain: tw`bg-white text-black border-none`,
  active: tw`bg-white text-green border-solid border border-green`,
};

const Btn = styled.div<{ status: StatusType, type: string }>(({ status, type }) => [
  tw`w-[calc(100% - 40px)] px-5 py-[18px] rounded-12 flex items-center text-base shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)]`,
  btnStatus[status],
  type === 'short' ? tw`justify-center` : tw``
]);

const SelectButton = ({ name, status, type, onClick }: ButtonProps) => {
  return (
    <Btn status={status} onClick={onClick} type={type}>{name}</Btn>
  );
};

export default SelectButton;