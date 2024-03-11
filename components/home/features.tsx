import type { FC } from 'react';

import FarhackPartnersLogo from '@components/logo/farhack-partners-logo';
import { karla, lora } from '@utils/fonts';

interface FeaturesProps {}

const Features: FC<FeaturesProps> = () => {
  return (
    <section className="z-10 my-10 mt-20 flex flex-col items-center justify-center gap-4">
      <h1 className="mt-4 text-center text-3xl text-black dark:text-white">
        <span className={`font-bold ${karla.className}`}>FarHack</span>
        <span className={`font-light ${lora.className}`}> partners</span>
      </h1>
      <p
        className={`max-w-[75vw] text-center text-lg text-white md:max-w-[60vw] ${karla.className}`}
      >
        all partners will be on-site to provide tooling, templates, Q&A,
        feedback, etc. to help you get building quickly.
      </p>
      <FarhackPartnersLogo height={500} width={500} />
    </section>
  );
};

export default Features;
