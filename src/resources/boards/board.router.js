const router = require('express').Router();
const boardService = require('./board.service');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardService.getAll();
    await res.json(boards);
  })
  .post(async (req, res) => {
    const response = await boardService.create(req.body);
    res.status(response.status).send(response.board || response.error);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const response = await boardService.getById(req.params.id);
    res.status(response.status).send(response.board || response.error);
  })
  .put(async (req, res) => {
    const response = await boardService.updateById(req.params.id, req.body);
    res.status(response.status).send(response.board || response.error);
  })
  .delete(async (req, res) => {
    const response = await boardService.deleteById(req.params.id);
    res.status(response.status).send(response.success || response.error);
  });

module.exports = router;
