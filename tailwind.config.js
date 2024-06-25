/** @type {import('tailwindcss').Config} */
export default {
  content: ['./main.tsx', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // green
        green: '#457BC3',
        'green-dark': '#022990',
        green40: '#0D43D1',

        // black
        black: '#000000',
        black10: 'rgba(0, 0, 0, 0.1)',
        black20: 'rgba(0, 0, 0, 0.2)',
        black30: '#ACACAC',
        // black40: '#939393',
        black40: 'rgba(0, 0, 0, 0.4)',
        black60: 'rgba(0, 0, 0, 0.6)',

        // white
        white: '#FFFFFF',

        //gray
        gray: '#DADADA',
        'gray-light': '#F9F9F9',
        'gray-dark': '#606060',
        'gray-disabled': '#EAEAEA',
        gray10: '#F2F2F2',
        gray20: '#F0F0F0',
        gray30: '#EDEDED',
        gray50: '#E7E7E7',
        gray60: '#E5E5E5',
        gray70: '#E2E2E2',

        // blue
        blue: '#1AA76E',
        'blue-light': 'rgba(26, 167, 110, 0.3)',
        'blue-down': '#4F7CEF',
        blue20: 'rgba(26, 167, 110, 0.2)',
        blue50: 'rgba(26, 167, 110, 0.5)',

        // yellow
        yellow: '#E6B637',
        'yellow-light': '#F1CD6D',
        yellow20: 'rgba(230, 182, 55, 0.2)',
        yellow50: 'rgba(230, 182, 55, 0.5)',

        // red
        red: '#F24B55',
      },
      fontFamily: {
        pre: ['Pretendard'],
      },
      fontSize: {
        xxs: '10px',
        xs: '12px',
        sm: '14px',
        base: '16px',
        lg: '18px',
        xl: '20px',
        '2xl': '22px',
        '3xl': '24px',
        '4xl': '28px',
      },
      spacing: {
        1: '4px',
        2: '8px',
        3: '12px',
        4: '16px',
        5: '20px',
        6: '24px',
        7: '28px',
        8: '32px',
        9: '36px',
        10: '40px',
        11: '44px',
        12: '48px',
        13: '52px',
        14: '56px',
        15: '60px',
        16: '64px',
        17: '68px',
        18: '72px',
        19: '76px',
        20: '80px',
        21: '84px',
        22: '88px',
      },
      borderRadius: {
        0: '0px',
        2: '2px',
        4: '4px',
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
      },
    },
  },
  plugins: [],
};
