import { To } from 'react-router-dom';

type ChatbotRoutingType = {
  text: string;
};

type ChatbotReturnType = {
  url: To;
  state?: boolean;
  where: string;
};

export function chatbotRouting(data: ChatbotRoutingType): ChatbotReturnType {
  let url = '/';
  let state = false;
  let where = '메인';
  if (data.text.includes('캘린더')) {
    url = '/calendar';
    where = '캘린더';
  } else if (data.text.includes('메인')) {
    url = '/';
    where = '메인';
  } else if (data.text.includes('부동산')) {
    url = '/estates';
    where = '부동산';
  } else if (data.text.includes('에너지')) {
    url = '/energy';
    where = '에너지';
  } else if (data.text.includes('보유 주식')) {
    url = '/products/held';
    state = true;
    where = '보유 주식';
  } else if (data.text.includes('좋아요')) {
    url = '/products/like';
    where = '좋아요';
  } else if (data.text.includes('주식')) {
    url = '/stocks';
    where = '주식';
  }
  return {
    url: url,
    state: state,
    where: where,
  };
}
