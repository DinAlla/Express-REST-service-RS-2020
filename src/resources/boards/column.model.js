const uuid = require('uuid');

class Column {
  constructor({ id = uuid(), title = 'COLUMN', order = null } = {}) {
    this.id = id;
    this.title = title;
    this.order = order;
  }
}

module.exports = Column;
