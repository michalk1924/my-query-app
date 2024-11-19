

import cars from './Gcars.js';
import carsService from './cars.js';

export async function loadDatabase () {
    for (var i in cars) {
        try {
            const result = await carsService.createCar(cars[i]);
            console.log(`Created car ${i}:`, result);
        }
        catch (error) {
            console.error(`Error creating car ${i}:`, error);
        }
    }
}

loadDatabase();