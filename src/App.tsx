import React from 'react';
import Dashboard from './components/Dashboard';
import DataEntry from './components/DataEntry';

const App: React.FC = () => {
    return (
        <div className='bg-gray-100 min-h-screen p-4'>
            <div className='pb-6'>
                <h1>Process Tracker</h1>
            </div>
            <div className='flex'>
                <div className='w-1/2 flex justify-center'>
                    <DataEntry />
                </div>
                <div className='w-1/2 flex justify-center'>
                    <Dashboard />
                </div>
            </div>
        </div>
    );
};

export default App;
