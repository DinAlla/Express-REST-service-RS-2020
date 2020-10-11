const Board = require('./board.model');

const boards = [];

const getAll = () => {
  return boards;
};

const create = async body => {
  try {
    const newBoard = await new Board(body);
    await boards.push(newBoard);
    return { status: 200, board: newBoard };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const getById = async id => {
  try {
    const foundBoard = await boards.find(board => board.id === id);
    if (!foundBoard) {
      return {
        status: 404,
        error: `Board with id: ${id} does not defined.`
      };
    }
    return { status: 200, board: foundBoard };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const updateById = async (id, body) => {
  try {
    const index = boards.findIndex(board => board.id === id);
    if (index === -1) {
      return {
        status: 404,
        error: `Board with id: ${id} does not defined.`
      };
    }
    boards[index] = {
      ...boards[index],
      ...body
    };
    return { status: 200, board: boards[index] };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const deleteById = async id => {
  try {
    const index = await boards.findIndex(board => board.id === id);
    if (index === -1) {
      return {
        status: 404,
        error: `Board with id: ${id} does not defined.`
      };
    }
    await boards.splice(index, 1);

    return {
      status: 200,
      success: `Board with id:${id} successfully deleted.`
    };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById
};
