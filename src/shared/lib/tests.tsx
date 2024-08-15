import { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
    },
  },
});

export const renderProvider = (component: ReactElement, includeRouter: boolean = true) => {
  return render(component, {
    wrapper: ({ children }) => (
      <QueryClientProvider client={queryClient}>
        {includeRouter ? <BrowserRouter>{children}</BrowserRouter> : children}
      </QueryClientProvider>
    ),
  });
};
