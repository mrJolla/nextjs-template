import { useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';

import { EffectorNext } from '@effector/next';
import { QueryClient } from '@tanstack/query-core';
import { HydrationBoundary, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import NProgress from 'nprogress';

import '../../public/styles/app.css';

export default function MyApp({
  Component,
  pageProps,
}: AppProps<{
  dehydratedState: unknown;
  initialState: Record<string, unknown>;
}>) {
  const router = useRouter();

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 5 * 60 * 1000,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
            retry: 0,
            staleTime: 60 * 60 * 1000,
          },
        },
      }),
  );

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
    <EffectorNext values={pageProps.initialState}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ReactQueryDevtools />

          <Component {...pageProps} />
        </HydrationBoundary>
      </QueryClientProvider>
    </EffectorNext>
  );
}
