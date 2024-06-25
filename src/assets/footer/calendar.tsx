interface CalendarIconProps {
  isSelect: boolean;
}

const CalendarIcon = ({ isSelect }: CalendarIconProps) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3.75"
        y="8"
        width="22.5"
        height="18.75"
        rx="2"
        stroke={isSelect ? '#457BC3' : '#222222'}
      />
      <path
        d="M3.75 14.25L26.25 14.25"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
      />
      <path
        d="M11.25 20.5H18.75"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
      />
      <path
        d="M10 4.25L10 9.25"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
      />
      <path
        d="M20 4.25L20 9.25"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default CalendarIcon;
