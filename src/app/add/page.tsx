'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import carsService from '../../services/cars';
import { useRouter } from 'next/navigation';
import styles from '../styles/AddEditCar.module.css';
import Link from 'next/link';

export default function AddCar() {
    const [newCar, setNewCar] = useState({ make: '', model: '', year: '' });
    const queryClient = useQueryClient();
    const router = useRouter();

    const createCarMutation = useMutation({
        mutationFn: carsService.createCar,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cars'] });
            router.push('/');
        },
    });

    return (
        <div className={styles.container}>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createCarMutation.mutate(newCar);
                }}
            >
                <input
                    type="text"
                    placeholder="Make"
                    value={newCar.make}
                    onChange={(e) => setNewCar({ ...newCar, make: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Model"
                    value={newCar.model}
                    onChange={(e) => setNewCar({ ...newCar, model: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Year"
                    value={newCar.year}
                    onChange={(e) => setNewCar({ ...newCar, year: e.target.value })}
                />
                <button type="submit">Add Car</button>
            </form>
        </div>
    );
}
