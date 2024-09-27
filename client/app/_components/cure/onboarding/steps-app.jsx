import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Steps from './components/Steps'; // Adjust path as needed

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Steps />
        </QueryClientProvider>
    );
}

export default App;