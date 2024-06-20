interface MainIconProps {
  isSelect: boolean;
}

const MainIcon = ({ isSelect }: MainIconProps) => {
  return (
    <svg
      width="30"
      height="31"
      viewBox="0 0 30 31"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="5"
        y="5.5"
        width="7.5"
        height="7.5"
        rx="1"
        stroke={isSelect ? '#1aa76e' : '#222222'}
        strokeLinejoin="round"
      />
      <rect
        x="5"
        y="18"
        width="7.5"
        height="7.5"
        rx="1"
        stroke={isSelect ? '#1aa76e' : '#222222'}
        strokeLinejoin="round"
      />
      <rect
        x="17.5"
        y="18"
        width="7.5"
        height="7.5"
        rx="1"
        stroke={isSelect ? '#1aa76e' : '#222222'}
        strokeLinejoin="round"
      />
      <rect
        x="17.5"
        y="5.5"
        width="7.5"
        height="7.5"
        rx="1"
        stroke={isSelect ? '#1aa76e' : '#222222'}
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MainIcon;
