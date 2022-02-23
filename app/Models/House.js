

export class House {
  constructor({ id, bedrooms, bathrooms, levels, year, description, price, imgUrl }) {
    this.id = id || ''
    this.bedrooms = bedrooms || ''
    this.bathrooms = bathrooms || ''
    this.levels = levels || ''
    this.year = year || ''
    this.description = description || ''
    this.price = price || ''
    this.imgUrl = imgUrl || ''
  }
  get Template() {
    return `
      <div class="col-md-4">
        <div class="bg-dark text-light rounded shadow">
          <img class="object-fit-img rounded-top" src="${this.imgUrl}" alt="house image">
          <div class="p-3 clip-text">
            <p># of Bedrooms: ${this.bedrooms}</p>
            <p># of Bathrooms: ${this.bathrooms}</p>
            <p># of Levels: ${this.levels}</p>
            <p>Year Built: ${this.year}</p>
            <P>Description: ${this.description}</p>
            <p>$ ${this.price}</p>
          </div>
          <div class="text-end p-2">
            <button class="btn btn-outline-info" onclick="app.housesController.editHouse('${this.id}')"> Edit </button>
            <button class="btn btn-outline-danger" onclick="app.housesController.deleteHouse('${this.id}')"> Delete </button>
          </div>
        </div>
      </div>
    `
  }
}