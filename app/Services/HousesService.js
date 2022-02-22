import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
  async editHouse(updatedHouse, id) {
    const res = await api.put('houses/' + id, updatedHouse)
    console.log('[HousesService]: editHouse', res.data)
    const houseIndex = ProxyState.houses.findIndex(h => h.id == id)
    ProxyState.houses.splice(houseIndex, 1, new House(res.data))
    ProxyState.houses = ProxyState.houses
  }

  async getAllHouses() {
    const res = await api.get('houses')
    console.log('[HousesService]: getAllHouses', res.data)
    ProxyState.houses = res.data.map(rd => new House(rd))
  }
  async createHouse(newHouse) {
    const res = await api.post('houses', newHouse)
    console.log('[HousesService] createHouse', newHouse)
    let realHouse = new House(res.data)
    ProxyState.houses = [realHouse, ...ProxyState.houses]
  }
  deleteHouse(houseId) {
    let indexToDelete = ProxyState.houses.findIndex(h => h.id == houseId)
    ProxyState.houses.splice(indexToDelete, 1)
    ProxyState.houses = ProxyState.houses
    console.log("deleted", ProxyState.houses);
  }
}

export const housesService = new HousesService()

