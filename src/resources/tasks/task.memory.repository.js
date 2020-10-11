const tasks = [];

const getAllByBoard = boardId => tasks.filter(task => task.boardId === boardId);

const create = async task => {
  try {
    await tasks.push(task);
    return { status: 200, task };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const getById = async (boardId, taskId) => {
  try {
    const foundTask = await tasks.find(
      task => task.id === taskId && task.boardId === boardId
    );
    if (!foundTask) {
      return {
        status: 404,
        error: `Task with id: ${taskId} does not defined.`
      };
    }
    return { status: 200, task: foundTask };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const updateById = async (boardId, taskId, body) => {
  try {
    const index = tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (index === -1) {
      return {
        status: 404,
        error: `Task with id: ${taskId} does not defined.`
      };
    }
    tasks[index] = {
      ...tasks[index],
      ...body
    };
    return { status: 200, task: tasks[index] };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const deleteById = async (boardId, taskId) => {
  try {
    const index = tasks.findIndex(
      task => task.id === taskId && task.boardId === boardId
    );
    if (index === -1) {
      return {
        status: 404,
        error: `Task with id: ${taskId} does not defined.`
      };
    }
    await tasks.splice(index, 1);
    return {
      status: 200,
      success: `Task with id:${taskId} successfully deleted.`
    };
  } catch {
    return { status: 500, error: 'Something went wrong.' };
  }
};

const cleanUser = async userId => {
  const indexes = [];
  tasks.forEach((task, i) => {
    if (task.userId === userId) {
      indexes.push(i);
    }
  });
  indexes.forEach(index => {
    tasks[index] = {
      ...tasks[index],
      userId: null
    };
  });
};

module.exports = {
  getAllByBoard,
  create,
  getById,
  updateById,
  deleteById,
  cleanUser
};
