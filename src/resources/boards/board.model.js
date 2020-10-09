const uuid = require('uuid');
const Column = require('./column.model');

class Board {
  constructor({ id = uuid(), title = 'BOARD', columns = [] } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns.map(column => new Column(column));
  }
}

module.exports = Board;
