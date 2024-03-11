import { Inter } from 'next/font/google';

import '../styles/global.css';
import { openGraphBanner } from '@utils/index';

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

const sans = Inter({
  adjustFontFallback: true,
  display: 'optional',
  fallback: [
    'ui-sans-serif',
    'system-ui',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    '"Noto Sans"',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
    '"Noto Color Emoji"'
  ],
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans'
});

export const fonts = { sans };

export default App;
