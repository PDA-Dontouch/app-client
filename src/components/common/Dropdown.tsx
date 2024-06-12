import tw, { css, styled } from 'twin.macro';
import useDetectClose from '../../hooks/useDetectClose';
import Down from '../../assets/drop-down.svg';
import { useState } from 'react';

interface DropdownProps {
  isEstates: boolean;
  profit_rate: number;
}

const Container = styled.div`
  ${tw`w-full h-fit flex gap-2 justify-center my-6`}
`;

const Wrapper = styled.div`
  ${tw`flex w-[98px] text-sm`}
`;

const DropdownContainer = styled.div`
  ${tw`w-[98px] relative`}
`;

const DropdownButton = styled.div<{ isEstates: boolean }>`
  ${tw`flex px-3 py-2 justify-end items-center gap-[6px] border-solid border-[1px] rounded-4`}
  ${({ isEstates }) => (isEstates ? tw`border-yellow` : tw`border-blue`)}
`;

const Menu = styled.div<{ isOpen: boolean }>`
  ${tw`flex w-full absolute top-[34px] left-[50%] justify-center rounded-4
    shadow-[2px_2px_4px_0_rgba(0, 0, 0, 0.1)] z-[9] bg-white`}
  opacity: 0;
  visibility: hidden;
  transform: translate(-50%, -20px);
  transition:
    opacity 0.4s ease,
    transform 0.4s ease,
    visibility 0.4s;

  ${({ isOpen }) =>
    isOpen &&
    css`
      opacity: 1;
      visibility: visible;
      transform: translate(-50%, 0);
      left: 50%;
    `};
`;

const Ul = styled.ul`
  ${tw`flex flex-col justify-between items-center p-0 m-0`}
  & > li {
    margin: 10px 0;
  }
  list-style-type: none;
`;

const Li = styled.li``;

const MainText = styled.span`
  ${tw`flex items-center text-sm gap-1`}
`;

const SubText = styled.span<{ isEstates: boolean }>`
  ${({ isEstates }) =>
    isEstates
      ? css`
          box-shadow: inset 0 -4px 0 rgba(230, 182, 55, 0.5);
        `
      : css`
          box-shadow: inset 0 -4px 0 rgba(82, 147, 208, 0.5);
        `}
`;

const Dropdown = ({ isEstates, profit_rate }: DropdownProps) => {
  const [isOpen, ref, removeHandler] = useDetectClose(false);
  const [value, setValue] = useState<number>(500);
  const profit = value * profit_rate * 100;

  return (
    <Container>
      <Wrapper>
        <DropdownContainer>
          <DropdownButton
            isEstates={isEstates}
            onClick={removeHandler}
            ref={ref}
          >
            {value}만원
            <img src={Down} />
          </DropdownButton>
          <Menu isOpen={isOpen}>
            <Ul>
              <Li onClick={() => setValue(500)}>500만원</Li>
              <Li onClick={() => setValue(100)}>100만원</Li>
              <Li onClick={() => setValue(50)}>50만원</Li>
              <Li onClick={() => setValue(10)}>10만원</Li>
            </Ul>
          </Menu>
        </DropdownContainer>
      </Wrapper>
      <MainText>
        투자하면, 세후 수익
        <SubText isEstates={isEstates}>
          약{' '}
          {profit
            .toFixed(0)
            .toString()
            .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          원
        </SubText>
      </MainText>
    </Container>
  );
};

export default Dropdown;
