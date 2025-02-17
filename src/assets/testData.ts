const testData = [
  {
    question: '현재 고객님의 나이는 어떻게 되십니까?',
    answers: [
      { text: '만 65세 미만', point: 3 },
      { text: '만 65세 이상', point: 0 },
    ],
  },
  {
    question: '향후 고객님의 연간수입원에 대한 예상은 어떻게 되십니까?',
    answers: [
      { text: '현재 일정한 수입이 없으며, 연금이 주 수입원임', point: 0 },
      {
        text: '현재 일정한 수입이 발생하고 있으나, 향후 감소하거나 불안정할 것으로 예상',
        point: 3,
      },
      {
        text: '현재 일정한 수입이 발생하고 있으며, 향후 현재 수준을 유지하거나 증가할 것으로 예상',
        point: 5,
      },
    ],
  },
  {
    question:
      '기존에 보유하고 계신 총자산 대비 금융자산의 비중은 어느 정도입니까?',
    answers: [
      { text: '5% 이하', point: 0 },
      { text: '10% 이하', point: 1 },
      { text: '20% 이하', point: 2 },
      { text: '30% 이하', point: 3 },
      { text: '30% 초과', point: 5 },
    ],
  },
  {
    question: '고객님은 다음 중 어떤 목적으로 투자하는 편입니까?',
    answers: [
      { text: '투자수익을 고려하나 원금보존이 더 중요', point: 0 },
      { text: '원금보존을 고려하나 투자수익이 더 중요', point: 3 },
      { text: '손실 위험이 있더라도 투자수익이 더 중요', point: 5 },
    ],
  },
  {
    question:
      '고객님께서 감내하실 수 있는 투자수익 및 위험수준은 어느 정도입니까?',
    answers: [
      { text: '무슨 일이 있어도 투자 원금은 보전되어야 한다', point: 0 },
      { text: '10% 이내의 손실 감수', point: 1 },
      { text: '20% 이내의 손실 감수', point: 3 },
      { text: '30% 이상의 손실도 감수', point: 5 },
    ],
  },
  {
    question:
      '파생상품, 파생결합증권 및 파생상품펀드에 투자한 경험은 얼마나 되십니까?',
    answers: [
      { text: '1년 미만(경험 없음)', point: 0 },
      { text: '1년 이상 3년 미만', point: 3 },
      { text: '3년 이상', point: 5 },
    ],
  },
  {
    question:
      '고령투자자, 주부, 은퇴자 등 금융투자상품에 대한 이해가 부족하거나 투자경험이 없는 투자자의 경우 「금융소비자 보호 모범규준」에 따른 금융취약 계층으로 금융소비자의 불이익 사항을 다른 정보보다 우선하여 설명 받으실 수 있습니다. 해당 항목에 체크하여 주시기 바랍니다.',
    answers: [
      {
        text: '금융투자상품에 대한 이해가 부족하거나 투자경험이 없음',
        point: 0,
      },
      { text: '해당사항 없음', point: 5 },
    ],
  },
];

export default testData;
