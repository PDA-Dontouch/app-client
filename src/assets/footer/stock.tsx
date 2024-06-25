interface StockIconProps {
  isSelect: boolean;
}

const StockIcon = ({ isSelect }: StockIconProps) => {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 31 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.75 8L19.9571 14.7929C19.5666 15.1834 18.9334 15.1834 18.5429 14.7929L16.2071 12.4571C15.8166 12.0666 15.1834 12.0666 14.7929 12.4571L9.25 18"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.25 4.25V23.55C4.25 24.6701 4.25 25.2302 4.46799 25.658C4.65973 26.0343 4.96569 26.3403 5.34202 26.532C5.76984 26.75 6.3299 26.75 7.45 26.75H26.75"
        stroke={isSelect ? '#457BC3' : '#222222'}
        strokeLinecap="round"
      />
    </svg>
  );
};

export default StockIcon;
