import { ProxyState } from "../AppState.js"
import { House } from "../Models/House.js"
import { api } from "./AxiosService.js"

class HousesService {
  async getAllHouses() {
    const res = await api.get('houses')
    console.log('[HousesService]: getAllHouses', res.data)
    ProxyState.houses = res.data.map(rd => new House(rd))
  }
  async createHouse(newHouse) {
    const res = await api.post('houses', newHouse)
    console.log('[HousesService] createHouse', newHouse)
    let realHouse = new House(newHouse)
    ProxyState.houses = [realHouse, ...ProxyState.houses]
  }
  deleteHouse(houseID) {
    let indexToDelete = ProxyState.houses.findIndex(h => h.id == houseID)
    ProxyState.houses.splice(indexToDelete, 1)
    ProxyState.houses = ProxyState.houses
    console.log("deleted", ProxyState.houses);
  }
}

export const housesService = new HousesService()