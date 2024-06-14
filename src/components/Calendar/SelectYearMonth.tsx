import React, { useRef, useState } from 'react';
import tw, { styled } from 'twin.macro';

type SelectYearMonthProps = {
  year: number;
  setYear: React.Dispatch<React.SetStateAction<number>>;
  month: number;
  setMonth: React.Dispatch<React.SetStateAction<number>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type ListProps = {
  idx: number;
};

const SelectYearMonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${tw`w-full`}
  height: 350px;
  justify-content: space-between;
  position: relative;
`;

const SelectedYM = styled.div`
  ${tw`bg-white border-green border-solid border-2 w-full flex flex-row items-center justify-center`}
  height: 60px;
  border-radius: 12px;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);
`;

const DateSection = styled.div`
  ${tw`w-full h-full flex flex-col justify-center items-center`}
`;

const ListContainer = styled.div`
  ${tw`flex flex-row text-3xl justify-between items-center`}
  position: absolute;
  height: 180px;
  width: 180px;
`;

const ShowYearList = styled.div`
  overflow: hidden;
  height: 180px;
  width: 90px;
  position: relative;
`;

const YearList = styled.div<ListProps>`
  position: absolute;
  ${({ idx }) => `top: ${idx}px;`}
  left: 15px;
`;

const MonthList = styled.div<ListProps>`
  position: absolute;
  ${({ idx }) => `top: ${idx}px;`}
  left: 40px;
`;

const ShowMonthList = styled.div`
  overflow: hidden;
  height: 180px;
  width: 90px;
  position: relative;
`;

const SelectedYear = styled.div`
  height: 60px;
  ${tw`flex flex-col justify-center content-center`}
`;

const SelectedMonth = styled.div`
  height: 60px;
  ${tw`flex flex-col justify-center content-center`}
`;

const PastItem = styled.div`
  ${tw`text-black30`}
  height: 60px;
  ${tw`flex flex-col justify-center content-center`}
`;

const NextItem = styled.div`
  ${tw`text-black30`}
  height: 60px;
  ${tw`flex flex-col justify-center content-center`}
`;
const CancelConfirmContainer = styled.div`
  ${tw`w-full flex flex-row-reverse items-end`}
`;

const ConfirmBtn = styled.button`
  ${tw`text-[red] w-fit`}
  background-color: transparent;
  border: none;
`;

export default function SelectYearMonth({
  year,
  setYear,
  month,
  setMonth,
  setModal,
}: SelectYearMonthProps) {
  const [selectedYear, setSelectedYear] = useState<number>(year);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [yearIdx, setYearIdx] = useState(-60);
  const [dragStartYearY, setDragStartYearY] = useState(-60);
  const [monthIdx, setMonthIdx] = useState<number>(-60);
  const [dragStartMonthY, setDragStartMonthY] = useState(-60);

  const selectedYMRef = useRef<HTMLDivElement>(null);
  const pastYearItemRef = useRef<HTMLDivElement>(null);
  const nextYearItemRef = useRef<HTMLDivElement>(null);
  const pastMonthItemRef = useRef<HTMLDivElement>(null);
  const nextMonthItemRef = useRef<HTMLDivElement>(null);

  const monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  function onClickConfirm() {
    setYear(selectedYear);
    setMonth(monthList[selectedMonth % 12] - 1);
    setModal(false);
  }

  const onTouchStart = (
    e: React.TouchEvent<HTMLDivElement>,
    setDragStartY: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    setDragStartY(e.touches[0].clientY);
  };

  const onTouchMove = (
    e: React.TouchEvent<HTMLDivElement>,
    idx: number,
    setIdx: React.Dispatch<React.SetStateAction<number>>,
    dragStartY: number,
    setDragStartY: React.Dispatch<React.SetStateAction<number>>,
    pastItemRef: React.RefObject<HTMLDivElement>,
    nextItemRef: React.RefObject<HTMLDivElement>,
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    const touchY = e.touches[0].clientY;

    const newIdx = idx + (touchY - dragStartY);
    setIdx(newIdx);
    setDragStartY(touchY);
    if (selected < 0) {
      setIdx(0);
      setSelected(1);
    } else if (selected > 11 && selected == selectedMonth) {
      setIdx(-60);
      setSelected(11);
    } else if (selected > 9999 && selected == selectedYear) {
      setIdx(-60);
      setSelected(9999);
    } else {
      onCheck(pastItemRef, nextItemRef, setIdx, selected, setSelected);
    }
  };

  const onCheck = (
    pastItemRef: React.RefObject<HTMLDivElement>,
    nextItemRef: React.RefObject<HTMLDivElement>,
    setIdx: React.Dispatch<React.SetStateAction<number>>,
    selected: number,
    setSelected: React.Dispatch<React.SetStateAction<number>>,
  ) => {
    if (selectedYMRef.current) {
      const selectedYMRect = selectedYMRef.current.getBoundingClientRect();

      if (pastItemRef.current) {
        const rect = pastItemRef.current.getBoundingClientRect();
        if (
          rect.top + 10 >= selectedYMRect.top &&
          rect.bottom - 10 <= selectedYMRect.bottom
        ) {
          setIdx(-60);
          setSelected(selected - 1);
        }
      }

      if (nextItemRef.current) {
        const rect = nextItemRef.current.getBoundingClientRect();
        if (
          rect.top + 10 >= selectedYMRect.top &&
          rect.bottom - 10 <= selectedYMRect.bottom
        ) {
          setIdx(-60);
          setSelected(selected + 1);
        }
      }
    }
  };

  const onTouchEnd = (setIdx: React.Dispatch<React.SetStateAction<number>>) => {
    setIdx(-60);
  };

  return (
    <SelectYearMonthContainer>
      <DateSection>
        <ListContainer>
          <ShowYearList
            onTouchStart={(e) => onTouchStart(e, setDragStartYearY)}
            onTouchMove={(e) =>
              onTouchMove(
                e,
                yearIdx,
                setYearIdx,
                dragStartYearY,
                setDragStartYearY,
                pastYearItemRef,
                nextYearItemRef,
                selectedYear,
                setSelectedYear,
              )
            }
            onTouchEnd={() => onTouchEnd(setYearIdx)}
          >
            <YearList onDragStart={() => {}} idx={yearIdx}>
              <PastItem>{selectedYear - 2}</PastItem>
              <PastItem ref={pastYearItemRef}>{selectedYear - 1}</PastItem>
              <SelectedYear>{selectedYear}</SelectedYear>
              <NextItem ref={nextYearItemRef}>{selectedYear + 1}</NextItem>
              <NextItem>{selectedYear + 2}</NextItem>
            </YearList>
          </ShowYearList>

          <ShowMonthList
            onTouchStart={(e) => onTouchStart(e, setDragStartMonthY)}
            onTouchMove={(e) =>
              onTouchMove(
                e,
                monthIdx,
                setMonthIdx,
                dragStartMonthY,
                setDragStartMonthY,
                pastMonthItemRef,
                nextMonthItemRef,
                selectedMonth,
                setSelectedMonth,
              )
            }
            onTouchEnd={() => onTouchEnd(setMonthIdx)}
          >
            <MonthList idx={monthIdx}>
              <PastItem>{monthList[selectedMonth - 2]}</PastItem>
              <PastItem ref={pastMonthItemRef}>
                {monthList[selectedMonth - 1]}
              </PastItem>
              <SelectedMonth>{monthList[selectedMonth]}</SelectedMonth>
              <NextItem ref={nextMonthItemRef}>
                {monthList[selectedMonth + 1]}
              </NextItem>
              <NextItem>{monthList[selectedMonth + 2]}</NextItem>
            </MonthList>
          </ShowMonthList>
        </ListContainer>
        <SelectedYM ref={selectedYMRef}></SelectedYM>
      </DateSection>
      <CancelConfirmContainer>
        <ConfirmBtn onClick={onClickConfirm}>확인</ConfirmBtn>
      </CancelConfirmContainer>
    </SelectYearMonthContainer>
  );
}
