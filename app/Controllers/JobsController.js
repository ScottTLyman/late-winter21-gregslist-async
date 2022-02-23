import { ProxyState } from "../AppState.js"
import { getJobForm } from "../Components/JobForm.js"
import { Job } from "../Models/Job.js"
import { api } from "../Services/AxiosService.js"
import { jobsService } from "../Services/JobsService.js"
import { Pop } from "../Utils/Pop.js"

function _drawJobs() {
  let template = ''
  console.log('DRAWING JOBS')
  ProxyState.jobs.forEach(j => template += j.Template)
  document.getElementById('listings').innerHTML = template
}
export class JobsController {
  constructor() {
    ProxyState.on('jobs', _drawJobs)
    console.log('jobs controller loaded')
  }
  async viewJobs() {
    try {
      await jobsService.getAllJobs()
      document.getElementById('modal-body-slot').innerHTML = getJobForm()
      document.getElementById('create-button').classList.remove('visually-hidden')
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }
  async handleSubmit(_id) {
    try {
      window.event.preventDefault()
      let form = window.event.target
      let rawData = {
        // @ts-ignore
        jobTitle: form.jobTitle.value,
        // @ts-ignore
        company: form.company.value,
        // @ts-ignore
        rate: form.rate.value,
        // @ts-ignore
        hours: form.hours.value,
        // @ts-ignore
        description: form.description.value
      }
      if (!_id) {
        // @ts-ignore
        jobsService.createJob(rawData)
      } else {
        // @ts-ignore
        jobsService.editJob(rawData, _id)
      }
      let modal = document.getElementById('new-listing')
      // @ts-ignore
      form.reset()
      // @ts-ignore
      bootstrap.Modal.getOrCreateInstance(modal).hide()
      Pop.toast('Submission Complete')
    } catch (error) {
      Pop.toast(error.message, 'error')
    }
  }
  async deleteJob(jobId) {
    try {
      if (await Pop.confirm()) {
        jobsService.deleteJob(jobId)
      }
    } catch (error) {
      console.error(error)
      Pop.toast(error)
    }
  }
  editJob(jobId) {
    const job = ProxyState.jobs.find(j => j._id == jobId)
    document.getElementById('modal-body-slot').innerHTML = getJobForm(job)
    let modal = document.getElementById('new-listing')
    // @ts-ignore
    bootstrap.Modal.getOrCreateInstance(modal).toggle()
  }
}
