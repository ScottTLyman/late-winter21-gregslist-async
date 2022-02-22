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

  // @ts-ignore
  async handleSubmit(id) {
    try {
      window.event.preventDefault()
      let form = window.event.target
      let rawData = {
        // @ts-ignore
        bedrooms: form.bedrooms.value,
        // @ts-ignore
        bathrooms: form.bathrooms.value,
        // @ts-ignore
        levels: form.levels.value,
        // @ts-ignore
        year: form.year.value,
        // @ts-ignore
        description: form.description.value,
        // @ts-ignore
        price: form.price.value,
        // @ts-ignore
        imgUrl: form.imgUrl.value
      }
      if (!id) {
        housesService.createHouse(rawData)
      } else {
        housesService.editHouse(rawData, id)
      }
      let modal = document.getElementById('new-listing')
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(modal).hide()
      Pop.toast('Submission Complete')
    }
    catch (error) {
      Pop.toast(error.message, 'error')
    }
  }
  async deleteHouse(houseId) {
    try {
      if (await Pop.confirm()) {
        housesService.deleteHouse(houseId)
      }
    } catch (error) {
      console.error(error)
      Pop.toast(error)
    }
  }
  editHouse(houseId) {
    const house = ProxyState.houses.find(h => h.id == houseId)
    document.getElementById('modal-body-slot').innerHTML = getHouseForm(house)
    let modal = document.getElementById('new-listing')
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
  }
}