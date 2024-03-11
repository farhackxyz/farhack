import type { FC } from 'react';

import Image from 'next/image';

import farhackPartnersLogo from '../../public/partnersDraftLogo.png';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const FarhackPartnersLogo: FC<LogoProps> = (props) => {
  const { width, height, className } = props;

  return (
    <Image
      alt="FarHack partners logo"
      className={`${className}`}
      height={height}
      objectFit="contain"
      src={farhackPartnersLogo}
      width={width}
    />
  );
};

export default FarhackPartnersLogo;
