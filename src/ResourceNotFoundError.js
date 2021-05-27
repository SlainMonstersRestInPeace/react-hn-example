function ResourceNotFoundError(message, status, statusText) {
  Error.call(this, message);

  this.name = 'ResourceNotFoundError';
  this.message = message || 'Resource Not Found';
  this.status = status;
  this.statusText = statusText;
}

ResourceNotFoundError.prototype = Object.create(Error.prototype);

export default ResourceNotFoundError