const User = require('./user.model');
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
  // todo: tasks calling
  return await usersRepo.deleteById(userId);
};

module.exports = {
  getAll,
  create,
  getById,
  updateById,
  deleteById
};
