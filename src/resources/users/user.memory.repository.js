const User = require('./user.model');

const users = [];

const getAll = async () => {
  return users;
};

const add = async newUserData => {
  try {
    const newUser = await new User(newUserData);
    await users.push(newUser);
    return { status: 200, user: User.toResponse(newUser) };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const getById = async userId => {
  try {
    const foundUser = await users.find(user => user.id === userId);
    if (foundUser) {
      return { status: 200, user: User.toResponse(foundUser) };
    }
    return { status: 404, error: `User with id: ${userId} does not defined.` };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const updateById = async (userId, userData) => {
  try {
    const index = users.findIndex(user => user.id === userId);
    users[index] = {
      ...users[index],
      ...userData
    };
    return { status: 200, user: User.toResponse(users[index]) };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const deleteById = async userId => {
  try {
    const index = users.findIndex(user => user.id === userId);
    if (index === -1) {
      return {
        status: 404,
        error: `User with id: ${userId} does not defined.`
      };
    }
    await users.splice(index, 1);
    return {
      status: 200,
      success: `USer with id:${userId} successfully deleted.`
    };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

module.exports = {
  getAll,
  add,
  getById,
  updateById,
  deleteById
};
