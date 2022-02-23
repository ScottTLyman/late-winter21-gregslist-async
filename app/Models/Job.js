export class Job {
  constructor({ _id, jobTitle, company, rate, hours, description }) {
    this._id = _id || ''
    this.jobTitle = jobTitle || ''
    this.company = company || ''
    this.rate = rate || ''
    this.hours = hours || ''
    this.description = description || ''
  }
  get Template() {
    return `
      <div class="col-md-4">
        <div class="bg-dark text-light rounded shadow">
          <img class="object-fit-img rounded-top" src="https://hips.hearstapps.com/amv-prod-alt.s3.amazonaws.com/wp-content/uploads/2018/11/ATA010819jobs_img01.jpg?resize=480:*" alt="house image">
          <div class="p-3 clip-text">
            <p>Job Title: ${this.jobTitle}</p>
            <p>Company Name: ${this.company}</p>
            <p>Rate(hourly):$ ${this.rate.toFixed(2)}</p>
            <p>Hours: ${this.hours}</p>
            <P>Description: ${this.description}</p>
          </div>
          <div class="text-end p-2">
            <button class="btn btn-outline-info" onclick="app.jobsController.editJob('${this._id}')"> Edit </button>
            <button class="btn btn-outline-danger" onclick="app.jobsController.deleteJob('${this._id}')"> Delete </button>
          </div>
        </div>
      </div>
    `
  }
}