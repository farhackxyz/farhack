import type { FC } from 'react';

import Image from 'next/image';

import farhackLogo from '../../public/farhackLogo.png';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const FarhackLogo: FC<LogoProps> = (props) => {
  const { width, height, className } = props;

  return (
    <Image
      alt="Farhack logo"
      className={`${className}`}
      height={height}
      objectFit="contain"
      src={farhackLogo}
      width={width}
    />
  );
};

export default FarhackLogo;