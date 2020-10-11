const Task = require('./task.model');
const tasksRepo = require('./task.memory.repository');

const getAllByBoard = async boardId => {
  const tasks = await tasksRepo.getAllByBoard(boardId);
  return tasks;
};

const create = async (boardId, body) => {
  const task = await tasksRepo.create(new Task({ ...body, boardId }));
  return task;
};

const getById = async (boardId, taskId) => {
  const task = await tasksRepo.getById(boardId, taskId);
  return task;
};

const updateById = async (boardId, taskId, body) => {
  const task = await tasksRepo.updateById(boardId, taskId, body);
  return task;
};

const deleteById = async (boardId, taskId) => {
  const task = await tasksRepo.deleteById(boardId, taskId);
  return task;
};

const cleanUser = async userId => {
  const task = await tasksRepo.cleanUser(userId);
  return task;
};

const deleteAllByBoard = async id => {
  const tasks = await getAllByBoard(id);
  const indexes = [];
  await Promise.all(
    tasks.map(async task => {
      const deletedTask = await deleteById(id, task.id);
      indexes.push(deletedTask.id);
    })
  );
  return indexes;
};

module.exports = {
  getAllByBoard,
  create,
  getById,
  updateById,
  deleteById,
  cleanUser,
  deleteAllByBoard
};
