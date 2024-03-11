import type { DocsThemeConfig } from 'nextra-theme-docs';

import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import FarhackLogo from '@components/logo/farhack-logo';
import { useMetadata } from '@hooks/useFrameMetadata';

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
    const url = 'https://farhack.xyz/api';
    const { metadata, isLoading, error } = useMetadata(url);

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
        <meta content={image} name="twitter:image" />
        <meta content={`FarHack`} name="og:title" />
        <meta content={image} name="og:image" />
        <meta content="FarHack" name="apple-mobile-web-app-title" />
        {metadata !== null &&
          !isLoading &&
          !error &&
          metadata
            .filter((item) => item.content !== 'Frog Frame')
            .map((item: any, key: number) => {
              return (
                <meta
                  key={`frame-tag-${key}`}
                  content={item.content}
                  name={item.property}
                />
              );
            })}
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
