import { ProxyState } from "../AppState.js"
import { Car } from "../Models/Car.js"
import { api } from "./AxiosService.js"



class CarsService {
  async editCar(updatedCar, id) {
    const res = await api.put('cars/' + id, updatedCar)
    console.log('[CarsService]: editCar', res.data)
    // this.getAllCars()
    const carIndex = ProxyState.cars.findIndex(c => c.id == id)
    ProxyState.cars.splice(carIndex, 1, new Car(res.data))
    ProxyState.cars = ProxyState.cars

  }

  async getAllCars() {
    const res = await api.get('cars')
    console.log('[CarsService]: getAllCars', res.data)
    // itterate over the ARRAY of data and turn everything into a Car object
    ProxyState.cars = res.data.map(rd => new Car(rd))
  }


  async createCar(newCar) {
    // post request takes 2 arguments, the endpoint/collection & the data to create (payload)
    const res = await api.post('cars', newCar)
    console.log('[CarsService]: createCar', res.data)
    // Handle the single object, turning it into a Car class object
    let realCar = new Car(res.data)
    ProxyState.cars = [realCar, ...ProxyState.cars]
  }

  async deleteCar(carId) {
    console.log('service deleting car', carId)
    //change in server 
    const res = await api.delete(`cars/${carId}`)
    console.log('[CarsService]: deleteCar', res.data)
    ProxyState.cars = ProxyState.cars.filter(c => c.id != carId)
  }

}

export const carsService = new CarsService()