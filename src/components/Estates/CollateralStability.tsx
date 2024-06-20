import React from 'react';
import tw, { styled } from 'twin.macro';
import { EstatesDetail } from '../../types/estates_product';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface DetailProps {
  data: EstatesDetail;
}

const Container = styled.div`
  ${tw`flex flex-col px-5 py-8 gap-4`}
`;

const MainText = styled.span`
  ${tw`text-lg font-semibold mb-3`}
`;

const ItemContainer = styled.div`
  ${tw`flex flex-col px-2 pt-4 gap-7`}
`;

const TextContainer = styled.div`
  ${tw`flex flex-col gap-3`}
`;

const RowContainer = styled.div`
  ${tw`flex gap-2`}
`;

const Box = styled.div<{ bgColor: string }>`
  ${tw`rounded-4 w-5 h-5`}
  background-color: ${({ bgColor }) => bgColor}
`;

const SubText = styled.span`
  ${tw`text-lg font-semibold`}
`;

const MiniText = styled.span`
  ${tw`text-base`}
`;

export function formatNumberToKoreanCurrency(num: number): string {
  const man = 10000;
  const uk = man * 10000;

  const eok = Math.floor(num / uk);
  const remainder = num % uk;
  const manUnits = Math.floor(remainder / man);

  let result = '';
  if (eok > 0) {
    result += `${eok}억`;
  }
  if (manUnits > 0) {
    if (eok > 0) {
      result += ' ';
    }
    result += `${manUnits.toLocaleString()}만`;
  }

  if (result === '') {
    result = '0원';
  } else {
    result += '원';
  }
  return result;
}

const CollateralStability = ({ data }: DetailProps) => {
  const clickEstates = useSelector(
    (state: RootState) => state.estates.clickEstates,
  );
  const margin = (clickEstates.loanAmountBaseLtv * data.appraisedValue) / 100;

  const chartData = {
    series: [data.priorityAmount, data.amount, margin],
    options: {
      chart: {
        type: 'donut',
      },
      labels: ['선순위 대출 잔액', '8퍼센트 대출금', '담보 여유금'],
      colors: ['#d3d3d3', '#a9a9a9', '#4F7CEF'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        position: 'bottom',
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: '14px',
                color: '#000',
                offsetY: -12,
              },
              value: {
                show: true,
                fontSize: '20px',
                fontFamily: 'Pretendard',
                color: '#000',
                offsetY: 0,
                formatter: () =>
                  formatNumberToKoreanCurrency(data.appraisedValue),
              },
              total: {
                show: true,
                label: '감정가',
                fontSize: '14px',
                fontFamily: 'Pretendard',
                color: '#000',
                formatter: () =>
                  formatNumberToKoreanCurrency(data.appraisedValue),
              },
            },
          },
        },
      },
    } as ApexOptions,
  };

  return (
    <Container>
      <MainText>담보 안정성</MainText>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="100%"
      />
      <ItemContainer>
        <RowContainer>
          <Box bgColor="#d3d3d3" />
          <TextContainer>
            <MiniText>선순위 대출 잔액</MiniText>
            <SubText>
              {formatNumberToKoreanCurrency(data.priorityAmount)}
            </SubText>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <Box bgColor="#d3d3d3" />
          <TextContainer>
            <MiniText>선순위 기타 금액</MiniText>
            <SubText>{formatNumberToKoreanCurrency(data.etcAmount)}</SubText>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <Box bgColor="#a9a9a9" />
          <TextContainer>
            <MiniText>8퍼센트 대출금</MiniText>
            <SubText>{formatNumberToKoreanCurrency(data.amount)}</SubText>
          </TextContainer>
        </RowContainer>
        <RowContainer>
          <Box bgColor="#4F7CEF" />
          <TextContainer>
            <MiniText>담보 여유금</MiniText>
            <SubText>{formatNumberToKoreanCurrency(margin)}</SubText>
          </TextContainer>
        </RowContainer>
      </ItemContainer>
    </Container>
  );
};

export default CollateralStability;
