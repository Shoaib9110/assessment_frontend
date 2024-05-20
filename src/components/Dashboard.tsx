import React, { useState, useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Legend, Tooltip, CartesianGrid } from 'recharts';
import { fetchProgress } from '../services/api';

interface ProgressData {
    id: number;
    user_id: number;
    date: string;
    value: number;
}

const Dashboard: React.FC = () => {
    const [progress, setProgress] = useState<ProgressData[]>([]);
    const [chartType, setChartType] = useState('line');

    useEffect(() => {
        const getData = async () => {
            const data = await fetchProgress();
            setProgress(data ?? []);
        };

        getData();

        const eventSource = new EventSource('http://localhost:5000/api/events');
        eventSource.onmessage = (event) => {
            const newProgress = JSON.parse(event.data);
            setProgress((prevProgress) => [...prevProgress, newProgress]);
        };

        return () => {
            eventSource.close();
        };
    }, []);

    const renderChart = () => {
        switch (chartType) {
            case 'line':
                return (
                    <LineChart width={600} height={300} data={progress}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="value" stroke="#8884d8" />
                    </LineChart>
                );
            case 'bar':
                return (
                    <BarChart width={600} height={300} data={progress}>
                        <XAxis dataKey="date" />
                        <YAxis />
                        <CartesianGrid stroke="#eee" strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" />
                        <Tooltip />
                    </BarChart>
                );
            case 'pie':
                return (
                    <PieChart width={400} height={400}>
                        <Pie
                            data={progress}
                            dataKey="value"
                            nameKey="date"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                        >
                            {
                                progress.map((entry, index) => <Cell key={`cell-${index}`} fill={index % 2 ? "#83a6ed" : "#8dd1e1"} />)
                            }
                        </Pie>
                        <Tooltip />
                    </PieChart>
                );
            default:
                return null;
        }
    };

    return (
        <div className='bg-white shadow-md p-5 rounded'>
            <div className='pb-4'>
                <select className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' onChange={(e) => setChartType(e.target.value)} value={chartType}>
                    <option value="line">Line Chart</option>
                    <option value="bar">Bar Chart</option>
                    <option value="pie">Pie Chart</option>
                </select>
            </div>
            {renderChart()}
        </div>
    );
};

export default Dashboard;
