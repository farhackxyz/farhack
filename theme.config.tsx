import type { DocsThemeConfig } from 'nextra-theme-docs';

import React from 'react';
import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

import { tvs } from '@components';
import FarcasterKitLogo from '@components/logo/farhack-logo';

const config: DocsThemeConfig = {
  darkMode: false,
  nextThemes: {
    defaultTheme: 'dark'
  },
  logo: (
    <div className="flex items-center">
      <FarcasterKitLogo height={50} width={50} />
      <b className="ml-2 hidden text-sm font-semibold sm:block sm:text-base">
        FarHack
      </b>
    </div>
  ),
  head: function useHead() {
    const config = useConfig();
    const description =
      config.frontMatter.description ||
      'React hooks for the best Farcaster apps';
    const image =
      config.frontMatter.image || 'https://tailwind-variants.org/banner.png';
    // TODO: change banner image
    // || "https://assets.vercel.com/image/upload/v1572282926/swr/twitter-card.jpg";

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
        <meta content={`${config.title} – FarHack`} name="og:title" />
        <meta content={image} name="og:image" />
        <meta content="FarHack" name="apple-mobile-web-app-title" />
      </>
    );
  },
  useNextSeoProps: function SEO() {
    const router = useRouter();
    const { frontMatter } = useConfig();

    const defaultTitle = frontMatter.overrideTitle || 'FarHack';

    return {
      description: frontMatter.description,
      defaultTitle,
      titleTemplate: router.pathname !== '/' ? `%s – ${defaultTitle}` : ''
    };
  },
  project: {
    link: 'https://github.com/dylsteck/farhack'
  },
  docsRepositoryBase: 'https://github.com/dylsteck/farhack/tree/main/apps/web',
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
