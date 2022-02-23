import { ProxyState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { api } from "./AxiosService.js"

class JobsService {
  async deleteJob(jobId) {
    const res = await api.delete(`jobs/${jobId}`)
    console.log('[JobsService]: deleteJob', res.data)
    ProxyState.jobs = ProxyState.jobs.filter(j => j._id != jobId)

  }
  async getAllJobs() {
    const res = await api.get('jobs')
    console.log('[JobsService]: getAllJobs', res.data)
    ProxyState.jobs = res.data.map(rd => new Job(rd))
  }
  async createJob(newJob) {
    const res = await api.post('jobs', newJob)
    console.log('[JobsService]: createJob', newJob)
    let realJob = new Job(res.data)
    ProxyState.jobs = [realJob, ...ProxyState.jobs]
  }
  async editJob(updatedJob, _id) {
    const res = await api.put('jobs/' + _id, updatedJob)
    console.log('[JobsService]: editJob', res.data)
    const jobIndex = ProxyState.jobs.findIndex(j => j._id == _id)
    ProxyState.jobs.splice(jobIndex, 1, new Job(res.data))
    ProxyState.jobs = ProxyState.jobs
  }
}

export const jobsService = new JobsService()