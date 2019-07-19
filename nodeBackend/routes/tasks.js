const express = require('express');
const router = express.Router();

const taskController = require('../controller/tasks');

router.post('/',taskController.createTask);
router.get('/:userId',taskController.getTaskByUserId);
router.put('/:taskId',taskController.updateById);


module.exports = router;