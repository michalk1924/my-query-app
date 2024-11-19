'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import carsService from '@/services/cars';
import EditCar from './components/edit/EditCar';
import styles from './home.module.css';
import { Car } from './types';

export default function CarList() {

  const queryClient = useQueryClient();
  const [editingCarId, setEditingCarId] = useState<string | null>(null);
  const [isMutating, setIsMutating] = useState(false);

  const { data, isLoading, isFetching } = useQuery({ queryKey: ['cars'], queryFn: carsService.getAllCars, staleTime: 10000 })

  const deleteMutation = useMutation({
    mutationFn: carsService.deleteCar,
    onMutate: async (id: string) => {
        setIsMutating(true);
        await queryClient.cancelQueries({ queryKey: ['cars'] })
        const previousCars = queryClient.getQueryData(['cars'])
        queryClient.setQueryData(['cars'], (old: any) => old.filter((car: any) => car._id !== id))
        return { previousCars }
    },
    onSuccess: () => setIsMutating(false),
})

  const updateCarMutation = useMutation({
    mutationFn: ({ id, car }: { id: string, car: any }) => carsService.updateCar(id, car),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['cars'] }) },
  });

  const handleEditClick = (carId: string) => {
    setEditingCarId(carId);
  };

  if (isLoading || isFetching) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p>Loading, please wait...</p>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <h1>Cars</h1>
      <ul>
        {data && data.map((car: Car) => (
          <li key={car._id}>
            <span>{car.make} {car.model} ({car.year})</span>
            <div>
              <button onClick={() => deleteMutation.mutate(car._id)}>Delete</button>
              <button onClick={() => handleEditClick(car._id)}>Edit</button>
            </div>
            {editingCarId === car._id && (
              <EditCar
                carId={car._id}
                initialCarData={{ make: car.make, model: car.model, year: car.year }}
                onUpdateSuccess={() => setEditingCarId(null)}
                updateCarMutation={updateCarMutation.mutate}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
