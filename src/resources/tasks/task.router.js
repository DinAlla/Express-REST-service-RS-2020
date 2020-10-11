const router = require('express').Router();
const tasksService = require('./task.service');

router
  .route('/:boardId/tasks')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllByBoard(req.params.boardId);
    await res.json(tasks);
  })
  .post(async (req, res) => {
    const response = await tasksService.create(req.params.boardId, req.body);
    await res.status(response.status).send(response.task || response.error);
  });

router
  .route('/:boardId/tasks/:taskId')
  .get(async (req, res) => {
    const { boardId, taskId } = req.params;
    const response = tasksService.getById(boardId, taskId);
    await res.status(response.status).send(response.task || response.error);
  })
  .put(async (req, res) => {
    const {
      params: { boardId, taskId },
      body
    } = req;
    const response = await tasksService.updateById(boardId, taskId, body);
    await res.status(response.status).send(response.task || response.error);
  })
  .delete(async (req, res) => {
    const { boardId, taskId } = req.params;
    const response = await tasksService.deleteById(boardId, taskId);
    await res.status(response.status).send(response.success || response.error);
  });

module.exports = router;
