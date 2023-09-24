import { useEffect, useMemo, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { QueryClient } from '@tanstack/query-core';
import { Hydrate, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { fork, Scope, serialize } from 'effector';
import { Provider } from 'effector-react/scope';
import NProgress from 'nprogress';

import '../../public/styles/app.css';

let clientScope: Scope;

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            cacheTime: Number.POSITIVE_INFINITY,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: Number.POSITIVE_INFINITY,
          },
        },
      }),
  );

  const scope = useMemo(
    () =>
      fork({
        ...(clientScope && serialize(clientScope)),
        ...pageProps.initialState,
      }),
    [pageProps.initialState],
  );

  if (typeof window !== 'undefined') {
    clientScope = scope;
  }

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router.events]);

  return (
    <Provider value={scope}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ReactQueryDevtools />

          <Component {...pageProps} />
        </Hydrate>
      </QueryClientProvider>
    </Provider>
  );
}
