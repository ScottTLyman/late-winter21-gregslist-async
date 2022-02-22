
export class Car {
  constructor({ make, model, year, price, description, color, imgUrl, id }) {
    this.id = id || ''
    this.make = make || ''
    this.model = model || ''
    this.year = year || 2000
    this.price = price || 0
    this.description = description || ''
    this.color = color || '#ffffff'
    this.imgUrl = imgUrl || ''
  }

  get Template() {
    return `
      <div class="col-md-4">
        <div class="bg-white rounded shadow">
          <img class="object-fit-img rounded-top" src="${this.imgUrl}" alt="car image">
          <div class="p-3 clip-text">
            <p>${this.year} | ${this.make} | ${this.model}</p>
            <p></p>
            <p>${this.description}</p>
            <p>$${this.price}</p>
            <div class="d-flex align-items-center">
              <p class="m-0">Color:</p>
              <div class="color-box ms-2" style="background-color: ${this.color}"></div>
            </div>
            <div class="text-end">
            <button class="btn btn-outline-warning" onclick="app.carsController.editCar('${this.id}')"> Edit </button>
            <button class="btn btn-outline-danger" onclick="app.carsController.deleteCar('${this.id}')"> Delete </button>
            </div>
          </div>
        </div>
      </div>
    `
  }
}