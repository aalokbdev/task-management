const express = require('express');
const { protect, authorize } = require('../middlewares/auth');
const { getTasks, createTask, updateTask, deleteTask , getSingleUser} = require('../controllers/taskController');

const router = express.Router();

router.get("/user", protect, getSingleUser)
router.route('/').get(protect, getTasks).post(protect, authorize('Admin'), createTask);
router.route('/:id').put(protect, authorize('Admin'), updateTask).delete(protect, authorize('Admin'), deleteTask);

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - status
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated ID of the task
 *         title:
 *           type: string
 *           description: Task title
 *         description:
 *           type: string
 *           description: Task description
 *         status:
 *           type: string
 *           enum:
 *             - Pending
 *             - In Progress
 *             - Completed
 *           default: Pending
 *         deadline:
 *           type: string
 *           format: date
 *           description: Task deadline
 *         assignedTo:
 *           type: string
 *           description: User ID the task is assigned to
 *       example:
 *         title: Complete backend
 *         description: Finish backend for Task Management
 *         status: InProgress
 *         deadline: 2024-12-31
 *         assignedTo: 60d0fe4f5311236168a109ca
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       200:
 *         description: The list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted
 */


module.exports = router;