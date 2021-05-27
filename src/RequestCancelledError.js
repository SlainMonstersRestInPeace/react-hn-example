function RequestCancelledError(message) {
  Error.call(this);

  this.name = 'RequestCancelledError';
  this.message = message || 'Request was cancelled';
}

RequestCancelledError.prototype = Object.create(Error.prototype);

export default RequestCancelledError