const { createTask } = require('../controllers/taskController');
const Task = require('../models/Task');
const { errorHandler } = require('../middlewares/errorHandler');

jest.mock('../models/Task'); // Mock the Task model
jest.mock('../middlewares/errorHandler'); // Mock the errorHandler middleware

describe('Task Controller - createTask', () => {
  describe('createTask', () => {

    it('should successfully create a task', async () => {
      const req = {
        body: {
          title: "Complete backend",
          description: "Finish backend for Task Management",
          status: "InProgress",
          deadline: "2024-12-31",
          assignedTo: "60d0fe4f5311236168a109ca",
        },
      };
    
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    
      const next = jest.fn();
    
      Task.create.mockResolvedValue({
        title: "Complete backend",
        description: "Finish backend for Task Management",
        status: "InProgress",
        deadline: "2024-12-31",
        assignedTo: "60d0fe4f5311236168a109ca",
      });
    
      await createTask(req, res, next);
    
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        data: {
          title: "Complete backend",
          description: "Finish backend for Task Management",
          status: "InProgress",
          deadline: "2024-12-31",
          assignedTo: "60d0fe4f5311236168a109ca",
        },
      });
    });
    

    it('should call errorHandler if an error occurs', async () => {
      const req = {
        body: {
          title: "Complete backend",
          description: "Finish backend for Task Management",
          status: "InProgress",
          deadline: "2024-12-31",
          assignedTo: "60d0fe4f5311236168a109ca",
        },
      };

      const res = {};
      const next = jest.fn();

      const error = new Error('Some error');
      Task.create.mockRejectedValue(error);
      errorHandler.mockImplementation(() => {});

      await createTask(req, res, next);

      expect(errorHandler).toHaveBeenCalledWith(error, req, res, next);
    });
  });
});
