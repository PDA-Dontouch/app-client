import React, { SetStateAction, useState } from 'react';
import tw, { styled } from 'twin.macro';
import ModalItem from '../../Modal/ModalItem';
import Button, { StatusType } from '../../Button';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

interface PurchaseProps {
  period: number;
  earningRate: number;
  btnType: StatusType;
  onClick: () => void;
  value: number;
  setValue: React.Dispatch<SetStateAction<number>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const InfoContainer = styled.div`
  ${tw`w-full flex flex-col gap-6`}
`;

const InfoItem = styled.div`
  ${tw`w-full flex flex-col gap-3`}
`;

const TextItem = styled.div`
  ${tw`w-full flex flex-col items-center gap-[2px]`}
`;

const ModalText = styled.span`
  ${tw`text-xs text-black40`}
`;

const formatNumber = (num: number) => {
  return num.toLocaleString();
};

const Purchase = ({
  period,
  earningRate,
  btnType,
  onClick,
  value,
  setValue,
  error,
  setError,
}: PurchaseProps) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.replace(/,/g, '');
    const numericValue = inputValue.replace(/[^0-9]/g, '');
    const parsedValue = numericValue === '' ? 0 : parseInt(numericValue, 10);
    // const userAsset = useSelector((state:RootState) => state.)

    if (setError !== undefined) {
      if (isNaN(parsedValue)) {
        setError('숫자만 입력 가능합니다.');
        setValue(0);
      }

      if (parsedValue > 5000000) {
        setError('최대 투자 금액은 500만원입니다.');
      } else {
        setError(undefined);
        setValue(parsedValue);
      }
    }
  };

  return (
    <InfoContainer>
      <InfoItem>
        <ModalItem
          title="투자 금액"
          content={''}
          isModify={true}
          isStock={false}
          value={formatNumber(value)}
          onChange={handleInputChange}
          error={error}
        />
        <ModalItem
          title="투자 기간"
          content={period + '개월'}
          isModify={false}
          isStock={false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
        />
        <ModalItem
          title="기대 수익"
          content={
            value === 0
              ? '0원'
              : ((earningRate * value) / 100)
                  .toFixed(0)
                  .toString()
                  .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
          }
          isModify={false}
          isStock={false}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {}}
        />
      </InfoItem>
      <Button name="구매하기" status={btnType} onClick={onClick} />
      <TextItem>
        <ModalText>구매 시 오픈 전까지 취소 가능합니다.</ModalText>
        <ModalText>금액 변경은 취소 후 다시 구매해주십시오.</ModalText>
      </TextItem>
    </InfoContainer>
  );
};

export default Purchase;
