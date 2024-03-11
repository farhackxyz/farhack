import type { DocsThemeConfig } from 'nextra-theme-docs';

import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import FarhackLogo from '@components/logo/farhack-logo';

import { openGraphBanner } from './utils';

const config: DocsThemeConfig = {
  darkMode: false,
  nextThemes: {
    defaultTheme: 'dark'
  },
  logo: (
    <div className="flex items-center">
      <FarhackLogo height={50} width={50} />
      <b className="ml-2 hidden text-sm font-semibold sm:block sm:text-base">
        FarHack
      </b>
    </div>
  ),
  head: function useHead() {
    const config = useConfig();
    const description =
      config.frontMatter.description || 'The ultimate Farcaster hackathon';
    const image = config.frontMatter.image || openGraphBanner;

    return (
      <>
        {/* Favicons, meta */}
        <link
          href="/favicon/apple-touch-icon.png"
          rel="apple-touch-icon"
          sizes="180x180"
        />
        <link
          href="/favicon/favicon-32x32.png"
          rel="icon"
          sizes="32x32"
          type="image/png"
        />
        <link
          href="/favicon/favicon-16x16.png"
          rel="icon"
          sizes="16x16"
          type="image/png"
        />
        <link href="/favicon/site.webmanifest" rel="manifest" />
        <link
          color="#000000"
          href="/favicon/safari-pinned-tab.svg"
          rel="mask-icon"
        />
        <meta content="#ffffff" name="msapplication-TileColor" />
        <meta content="en" httpEquiv="Content-Language" />
        <meta content={description} name="description" />
        <meta content={description} name="og:description" />
        <meta content="summary_large_image" name="twitter:card" />
        <meta content="@Dylan_Steck" name="twitter:site" />
        <meta content="FarHack" name="twitter:title" />
        <meta content={image} name="twitter:image" />
        <meta
          content="The ultimate Farcaster hackathon"
          property="twitter:description"
        />
        <meta content={`FarHack`} name="og:title" />
        <meta content={image} name="og:image" />
        <meta content="FarHack" name="apple-mobile-web-app-title" />
        <meta content="https://farhack.xyz" property="og:url" />
        <meta content="vNext" property="fc:frame" />
        <meta content="1:1" property="fc:frame:image:aspect_ratio" />
        <meta
          content="%7B%22initialPath%22%3A%22%2Fapi%22%2C%22previousButtonValues%22%3A%5B%22back%22%2C%22next%22%5D%2C%22previousState%22%3A%7B%22count%22%3A1%7D%7D"
          property="fc:frame:state"
        />
        <meta
          content="%7B%22buttonIndex%22%3A1%2C%22buttonValue%22%3A%22next%22%2C%22cycle%22%3A%22main%22%2C%22env%22%3A%7B%7D%2C%22frameData%22%3A%7B%22buttonIndex%22%3A1%2C%22castId%22%3A%7B%22fid%22%3A1%2C%22hash%22%3A%220x0000000000000000000000000000000000000000%22%7D%2C%22fid%22%3A1%2C%22messageHash%22%3A%220xa05be23d71c0d62ccfc096e3fd4a2fdaf4224f01%22%2C%22network%22%3A1%2C%22timestamp%22%3A100683255%2C%22url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fapi%3FinitialPath%3D%25252Fapi%26amp%3BpreviousButtonValues%3D%252523A_next%22%7D%2C%22initialPath%22%3A%22%2Fapi%22%2C%22previousButtonValues%22%3A%5B%22next%22%5D%2C%22previousState%22%3A%7B%22count%22%3A0%7D%2C%22status%22%3A%22response%22%2C%22url%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fapi%22%2C%22var%22%3A%7B%7D%2C%22verified%22%3Afalse%2C%22state%22%3A%7B%22count%22%3A1%7D%7D"
          property="frog:context"
        />
        <meta content="0.5.6" property="frog:version" />
        <meta
          content="https://i.imgur.com/GEyg8ff.png"
          property="fc:frame:image"
        />
        <meta
          content="https://farhack.xyz/api?initialPath=%252Fapi&amp;previousButtonValues=%2523A_next"
          property="fc:frame:post_url"
        />
        <meta
          content="Continue to RSVP"
          data-value="next"
          property="fc:frame:button:1"
        />
        <meta content="post" property="fc:frame:button:1:action" />
        <meta content="0.5.6" property="frog:version" />
      </>
    );
  },
  useNextSeoProps() {
    const { asPath } = useRouter();

    if (asPath !== '/') {
      return {
        titleTemplate: '%s - FarHack'
      };
    }
  },
  project: {
    link: 'https://github.com/dylsteck/farhack'
  },
  docsRepositoryBase: 'https://github.com/dylsteck/farhack',
  gitTimestamp: '',
  sidebar: {
    defaultMenuCollapseLevel: 1
  },
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">MIT {new Date().getFullYear()} FarHack.</p>
      </div>
    )
  }
};

export default config;
