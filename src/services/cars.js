import {http} from './http.js'

const carsService = {
    async getAllCars() {
        try{
            console.log("get all")
            const response = await http.get('/cars');
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async getCarById(id) {
        try{
            const response = await http.get(`/cars/${id}`);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async createCar(car) {
        try{
            const response = await http.post('/cars', car);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async updateCar(id, body) {
        try{
            console.log(`aaa${id}jjj`);
            const response = await http.put(`/cars/${id}`, body);
            return response.data;
        }
        catch(error){
            throw error;
        }
    },
    async deleteCar(id) {
        try{
            await http.delete(`/cars/${id}`);
        }
        catch(error){
            throw error;
        }
    }
}

export default carsService;