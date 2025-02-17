import tw, { styled } from 'twin.macro';
import ModalItem from '../../Modal/ModalItem';
import Button, { StatusType } from '../../Button';

interface PurchaseProps {
  amount?: number;
  period?: number;
  profit?: number;
  btnType: StatusType;
  onClick: () => void;
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

const Cancel = ({
  amount,
  period,
  profit,
  btnType,
  onClick,
}: PurchaseProps) => {
  return (
    <InfoContainer>
      <InfoItem>
        <ModalItem
          title="투자 금액"
          content={
            amount?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') +
            '원'
          }
          isModify={false}
          isStock={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        />
        <ModalItem
          title="투자 기간"
          content={period + '개월'}
          isModify={false}
          isStock={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        />
        <ModalItem
          title="기대 수익"
          content={
            profit
              ?.toFixed(0)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') + '원'
          }
          isModify={false}
          isStock={false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {}}
        />
      </InfoItem>
      <Button name="취소하기" status={btnType} onClick={onClick} />
      <TextItem>
        <ModalText>구매 시 오픈 전까지 취소 가능합니다.</ModalText>
        <ModalText>금액 변경은 취소 후 다시 구매해주십시오.</ModalText>
      </TextItem>
    </InfoContainer>
  );
};

export default Cancel;
