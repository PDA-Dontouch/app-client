import tw, { styled } from "twin.macro";
import ModalItem from "../Modal/ModalItem";
import Button, { StatusType } from "../Button";

interface PurchaseProps {
  period: string;
  profit: string | number;
  btnType: StatusType;
}

const InfoContainer = styled.div`${tw`w-full flex flex-col gap-6`}`;

const InfoItem = styled.div`${tw`w-full flex flex-col gap-3`}`;

const TextItem = styled.div`${tw`w-full flex flex-col items-center gap-[2px]`}`;

const ModalText = styled.span`${tw`text-xs text-black40`}`;

const Purchase = ({ period, profit, btnType }: PurchaseProps) => {
  return (
    <InfoContainer>
      <InfoItem>
        <ModalItem title="투자 금액" content="" isModify={true} isStock={false} />
        <ModalItem title="투자 기간" content={period + '개월'} isModify={false} isStock={false} />
        <ModalItem title="기대 수익" content={profit + '원'} isModify={false} isStock={false} />
      </InfoItem>
      <Button name="구매하기" status={btnType} onClick={() => {}} />
      <TextItem>
        <ModalText>구매 시 오픈 전까지 취소 가능합니다.</ModalText>
        <ModalText>금액 변경은 취소 후 다시 구매해주십시오.</ModalText>
      </TextItem>
    </InfoContainer>
  );
};

export default Purchase;