import { ProxyState } from "../AppState.js"
import { Job } from "../Models/Job.js"
import { api } from "./AxiosService.js"

class JobsService {
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
}

export const jobsService = new JobsService()