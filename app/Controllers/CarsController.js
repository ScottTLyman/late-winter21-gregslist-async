import { ProxyState } from "../AppState.js"
import { getCarForm } from "../Components/CarForm.js"
import { carsService } from "../Services/CarsService.js"
import { Pop } from "../Utils/Pop.js"

function _drawCars() {
  let template = ''
  ProxyState.cars.forEach(c => template += c.Template)
  document.getElementById('listings').innerHTML = template
}

export class CarsController {
  constructor() {
    ProxyState.on('cars', _drawCars)
    console.log('cars controller loaded')

  }

  async viewCars() {
    try {
      await carsService.getAllCars()
      document.getElementById('modal-body-slot').innerHTML = getCarForm()
      document.getElementById('create-button').classList.remove('visually-hidden')
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async handleSubmit(id) {
    try {
      window.event.preventDefault()
      let form = window.event.target
      let rawData = {
        // @ts-ignore
        make: form.make.value,
        // @ts-ignore
        model: form.model.value,
        // @ts-ignore
        year: form.year.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        price: form.price.value,
        // @ts-ignore
        color: form.color.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value
      }
      if (!id) {
        carsService.createCar(rawData)
      } else {
        carsService.editCar(rawData, id)
      }
      let modal = document.getElementById('new-listing')
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(modal).hide() //NOTE closes bootstrap modal
      Pop.toast('Complete')
    }
    catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  async deleteCar(carId) {
    try {
      if (await Pop.confirm()) {
        // NOTE just passes the ID of the car to be deleted
        await carsService.deleteCar(carId)
      }
    } catch (error) {
      console.error(error)
      Pop.error(error)
    }
  }

  editCar(carId) {
    const car = ProxyState.cars.find(c => c.id == carId)
    document.getElementById('modal-body-slot').innerHTML = getCarForm(car)
    let modal = document.getElementById('new-listing')
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(modal).toggle()

  }




}