import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from '@/shared/components/ui/sonner.tsx';
import { TooltipProvider } from '@/shared/components/ui/tooltip.tsx';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 5, retryDelay: 1000 } },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <App />
          <Toaster position="top-center" />
          <ReactQueryDevtools initialIsOpen={false} />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>
);
