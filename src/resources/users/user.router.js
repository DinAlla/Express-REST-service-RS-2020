const router = require('express').Router();
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    await res.json(users);
  })
  .post(async (req, res) => {
    const response = await usersService.create(req.body);
    res.status(response.status).send(response.user || response.error);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const response = await usersService.getById(req.params.id);
    res.status(response.status).send(response.user || response.error);
  })
  .put(async (req, res) => {
    const response = await usersService.updateById(req.params.id, req.body);
    res.status(response.status).send(response.user || response.error);
  })
  .delete(async (req, res) => {
    const response = await usersService.deleteById(req.params.id);
    res.status(response.status).send(response.success || response.error);
  });

module.exports = router;
