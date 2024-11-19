'use client';

import { useState } from 'react';
import styles from './EditCar.module.css';

interface EditCarProps {
  carId: string; // ID of the car to be edited
  initialCarData: { make: string; model: string; year: number }; // Initial car data
  onUpdateSuccess: () => void; // Callback for successful update
  updateCarMutation: (variables: { id: string; car: any }) => void; // The mutation function passed from the parent
}

export default function EditCar({ carId, initialCarData, onUpdateSuccess, updateCarMutation }: EditCarProps) {
  const [editCar, setEditCar] = useState<any>({ ...initialCarData, id: carId });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Call the mutation function passed from the parent
    updateCarMutation({ id: carId, car: editCar });
    onUpdateSuccess(); // Optionally call the onUpdateSuccess callback to hide the form
  };

  return (
    <div className={styles.container}>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Make"
          value={editCar.make}
          onChange={(e) => setEditCar({ ...editCar, make: e.target.value })}
        />
        <input
          type="text"
          placeholder="Model"
          value={editCar.model}
          onChange={(e) => setEditCar({ ...editCar, model: e.target.value })}
        />
        <input
          type="number"
          placeholder="Year"
          value={editCar.year}
          onChange={(e) => setEditCar({ ...editCar, year: Number(e.target.value) })}
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}