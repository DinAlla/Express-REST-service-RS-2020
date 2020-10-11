const User = require('./user.model');
const taskService = require('../tasks/task.service');
const usersRepo = require('./user.memory.repository');

const getAll = async () => {
  const users = await usersRepo.getAll();
  return users.map(user => User.toResponse(user));
};

const create = async reqBody => {
  return await usersRepo.add(new User(reqBody));
};

const getById = async userId => {
  return await usersRepo.getById(userId);
};

const updateById = async (userId, userData) => {
  return await usersRepo.updateById(userId, userData);
};

const deleteById = async userId => {
  await taskService.cleanUser(userId);
  return await usersRepo.deleteById(userId);
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById
};
