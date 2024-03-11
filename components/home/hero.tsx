import type { FC } from 'react';

import { tvs, LinkIcon, FarhackLogo } from '@components';
import { karla, lora } from '@utils/fonts';
import { rsvpUrl } from '@utils/index';

import GradientBG from './gradient-bg';

interface HeroProps {}

const Hero: FC<HeroProps> = () => {
  return (
    <section
      className={tvs.box({
        class: 'relative mt-32 gap-6 overflow-visible lg:mt-36 xl:mt-40'
      })}
    >
      {/* <AnimatedWave className="absolute -z-10 h-[100%] w-[100%] -translate-y-32 md:h-[500px] md:w-[500px] md:-translate-y-44" /> */}
      <GradientBG className="absolute -z-10 aspect-[605/509] w-full -translate-y-[40%] animate-[appear_1s_ease]" />
      <div className={tvs.box({ class: 'relative z-10 w-full' })}>
        <FarhackLogo height={250} width={250} />
        <h1 className="mt-4 text-center text-4xl text-black dark:text-white md:text-5xl">
          <span className={`font-bold ${karla.className}`}>FarHack</span>
          <span className={`font-light ${lora.className}`}> at FarCon</span>
        </h1>
        <p
          className={`mt-2 text-center text-2xl font-medium text-white ${karla.className}`}
        >
          May 3 - 5, Venice Beach, CA, USA
        </p>
        <p
          className={`mt-5 max-w-[75vw] text-center text-lg text-white md:max-w-[60vw] ${karla.className}`}
        >
          the ultimate farcaster hackathon to learn how to build cool farcaster
          sh*t with cool farcaster people — with 24 hours to start building it
          and all the hands-on support you may need.
        </p>
      </div>
      <div className={tvs.box({ row: true, class: 'z-10 gap-2' })}>
        <a
          className={tvs.button({ color: 'purple' })}
          href="/docs/introduction"
        >
          Hacking Guide
        </a>
        <a
          className={tvs.button({
            flat: true,
            color: 'neutral'
          })}
          href={rsvpUrl}
          rel="noopener noreferrer"
          target="_blank"
          title="rsvp url"
        >
          <span className={tvs.box({ row: true })}>
            RSVP
            <LinkIcon className="ml-1" />
          </span>
        </a>
      </div>
    </section>
  );
};

export default Hero;
