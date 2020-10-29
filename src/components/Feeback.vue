<template>
  <div>
    <div class="text-center">
      <button
        class="btn btn-success"
        data-toggle="modal"
        data-target="#feedbackModal"
      >Submit Feedback</button>
    </div>

    <div
      class="modal fade"
      id="feedbackModal"
      tabindex="-1"
      role="form"
      aria-labelledby="feedbackModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="form">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="feedbackModal">Submit Feedback</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form
              id="feedback"
              method="post"
              name="feedback"
              data-netlify="true"
              data-netlify-honeypot="bot-field"
            >
              <input type="hidden" name="form-name" value="feedback" />
              <div class="form-group">
                <label for="userEmail">Email Address</label>
                <input type="email" class="form-control" name="userEmail" id="userEmail" />
                <small class="form-text text-muted">**optional</small>
              </div>
              <div class="form-group">
                <label for="issue">Feedback</label>
                <textarea
                  class="form-control"
                  id="issue"
                  name="issue"
                  rows="8"
                  placeholder="Please describe your issue in detail, or any feedback you might have for the site"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="submit" form="feedback" class="btn btn-primary">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
