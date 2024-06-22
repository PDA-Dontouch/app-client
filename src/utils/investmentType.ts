import { investmentType } from '../types/user_product';

export function investmentTypeToString(type: investmentType): string {
  switch (type) {
    case 1:
      return '안정형';

    case 2:
      return '안정추구형';

    case 3:
      return '위험중립형';

    case 4:
      return '적극투자형';

    case 5:
      return '공격투자형';
  }
}
