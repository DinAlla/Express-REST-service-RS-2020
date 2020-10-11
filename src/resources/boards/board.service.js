const boardsRepo = require('./board.memory.repository');
const tasksService = require('../tasks/task.service');

const getAll = () => {
  const boards = boardsRepo.getAll();
  return boards;
};

const create = async body => {
  return await boardsRepo.create(body);
};

const getById = async id => {
  return await boardsRepo.getById(id);
};

const updateById = async (id, body) => {
  return await boardsRepo.updateById(id, body);
};

const deleteById = async id => {
  const board = await boardsRepo.deleteById(id);
  await tasksService.deleteAllByBoard(id);
  return board;
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById
};
