import { ProxyState } from "../AppState.js"
import { getHouseForm } from "../Components/HouseForm.js"
import { housesService } from "../Services/HousesService.js"
import { Pop } from "../Utils/Pop.js";

function _drawHouses() {
  let template = ''
  console.log("DRAWING HOUSES");
  ProxyState.houses.forEach(h => template += h.Template)
  // console.log('drawing houses')
  document.getElementById('listings').innerHTML = template
}

export class HousesController {
  constructor() {
    ProxyState.on('houses', _drawHouses)
    console.log('houses controller loaded')
  }
  async viewHouses() {
    try {
      await housesService.getAllHouses()
      document.getElementById('modal-body-slot').innerHTML = getHouseForm()
      document.getElementById('create-button').classList.remove('visually-hidden')
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }

  createHouse(event) {
    event.preventDefault()
    let form = event.target
    let newHouse = {
      bedrooms: form.bedrooms.value,
      bathrooms: form.bathrooms.value,
      levels: form.levels.value,
      year: form.year.value,
      description: form.description.value,
      price: form.price.value,
      imgUrl: form.imgUrl.value
    }
    housesService.createHouse(newHouse)
    let modal = document.getElementById('new-listing')
    form.reset()
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(modal).hide()
  }
  deleteHouse(houseID) {
    housesService.deleteHouse(houseID)
  }
}