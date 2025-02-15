import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      retry: 2
    }
  }
});
