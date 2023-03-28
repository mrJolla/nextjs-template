import { Head, Html, Main, NextScript } from 'next/document';

import { APP_NAME } from '~/constants/app';

export default function Document() {
  return (
    <Html className='flex h-full flex-col font-sans text-base antialiased' lang='ru' prefix='og: http://ogp.me/ns#'>
      <Head>
        <link href='/imgs/favicons/apple-touch-icon.png' rel='apple-touch-icon' sizes='180x180' />
        <link href='/imgs/favicons/favicon-32x32.png' rel='icon' sizes='32x32' type='image/png' />
        <link href='/imgs/favicons/favicon-16x16.png' rel='icon' sizes='16x16' type='image/png' />
        <link href='/imgs/favicons/site.webmanifest' rel='manifest' />
        <link color='#16171d' href='/imgs/favicons/safari-pinned-tab.svg' rel='mask-icon' />
        <link href='/imgs/favicons/favicon.ico' rel='shortcut icon' />
        <meta content={APP_NAME} name='apple-mobile-web-app-title' />
        <meta content={APP_NAME} name='application-name' />
        <meta content='#ffffff' name='msapplication-TileColor' />
        <meta content='/imgs/favicons/browserconfig.xml' name='msapplication-config' />
        <meta content='#16171D' name='theme-color' />
      </Head>

      <body className='flex flex-1 flex-col'>
        <Main />

        <NextScript />
      </body>
    </Html>
  );
}
