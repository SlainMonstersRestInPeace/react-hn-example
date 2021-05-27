function ItemSetIsEmptyError(message) {
  Error.call(this, message);

  this.name = 'ItemSetIsEmptyError';
  this.message = message || 'Item set is empty';
}

ItemSetIsEmptyError.prototype = Object.create(Error.prototype);

export default ItemSetIsEmptyError