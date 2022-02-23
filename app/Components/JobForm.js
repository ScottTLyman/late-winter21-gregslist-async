import { Job } from "../Models/Job.js"

export function getJobForm(job = {}) {
  // @ts-ignore
  const jobData = new Job(job)
  return `
  <form class="row  p-2" onsubmit="app.jobsController.handleSubmit('${jobData._id}')">
  <h3 class="col-12">Post a Job</h3>
  <div class="mb-3 col-3">
    <label for="" class="form-label">Job Title</label>
    <input required type="text" class="form-control" name="jobTitle" id="jobTitle" aria-describedby="helpId"
      placeholder="" value="${jobData.jobTitle}" min="1">
  </div>
  <div class="mb-3 col-3">
    <label for="" class="form-label">Company</label>
    <input required type="text" class="form-control" name="company" id="company" aria-describedby="helpId"
      placeholder="" value="${jobData.company}" min="1">
  </div>
  <div class="mb-3 col-3">
    <label for="" class="form-label">Rate</label>
    <input required type="text" class="form-control" name="rate" id="rate" aria-describedby="helpId"
      placeholder="" value="${jobData.rate}" min="1">
  </div>
  <div class="mb-3 col-3">
  <label for="" class="form-label">Hours</label>
  <input required type="text" class="form-control" name="hours" id="hours" aria-describedby="helpId"
  placeholder="" value="${jobData.hours}">
  </div>
  <div class="mb-3 col-12">
    <label for="" class="form-label">Description</label>
    <input maxlength="75" required type="text" class="form-control" name="description" id="description"
      aria-describedby="helpId" placeholder="" value="${jobData.description}">
      </div>
  <button class="col-4 offset-8 btn btn-success"> ${job._id ? 'Edit' : 'Create'}</button>
</form>
  `
}