import React, { useState, useEffect } from 'react';
import { addProgress, fetchUsers } from '../services/api';

interface UsersData {
    id: number;
    firstName: number;
}

const DataEntry: React.FC = () => {
    const [userId, setUserId] = useState('');
    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [users, setUsers] = useState<UsersData[]>([]);

    useEffect(() => {
        const getUsers = async () => {
            try {
                const usersData = await fetchUsers();
                setUsers(usersData ?? []);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };

        getUsers();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addProgress({ user_id: parseInt(userId), date, value: parseFloat(value) });
        setUserId('');
        setDate('');
        setValue('');
    };

    return (
        <div>
            <div className="w-full max-w-sm">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userId">
                            User
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Select a user</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.firstName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                            Date
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="value">
                            Value
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="value"
                            type="number"
                            step="0.1"
                            placeholder="Value"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Add Progress
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DataEntry;
