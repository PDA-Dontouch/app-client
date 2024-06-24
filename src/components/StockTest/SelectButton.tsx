import tw, { TwStyle, styled } from 'twin.macro';

interface ButtonProps {
  name: string;
  status: StatusType;
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

const Btn = styled.div<{ status: StatusType }>(({ status }) => [
  tw`w-full px-[1rem] py-[0.9rem] rounded-12 flex items-center text-[0.9rem] shadow-[2px_2px_4px_0_rgba(0,0,0,0.1)] box-border`,
  btnStatus[status],
]);

const SelectButton = ({ name, status, onClick }: ButtonProps) => {
  return (
    <Btn status={status} onClick={onClick}>
      {name}
    </Btn>
  );
};

export default SelectButton;
