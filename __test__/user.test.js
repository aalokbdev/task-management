const { registerUser, loginUser, getUser } = require('../controllers/userController');
const User = require('../models/User');
const { errorHandler } = require('../middlewares/errorHandler');
const mongoose = require('mongoose');

jest.mock('../models/User'); // Mock the User model
jest.mock('../middlewares/errorHandler'); // Mock the errorHandler middleware

describe('User Controller', () => {

  // Test for registerUser
  describe('registerUser', () => {
    it('should successfully register a user', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'User'
        }
      };
      
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      User.create.mockResolvedValue({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'User'
      });

      await registerUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ success: true, message: 'Signup successfully' });
    });

    it('should call errorHandler if an error occurs', async () => {
      const req = {
        body: {
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123',
          role: 'User'
        }
      };

      const res = {};
      const next = jest.fn();
      const error = new Error('Some error');
      User.create.mockRejectedValue(error);
      errorHandler.mockImplementation(() => {});

      await registerUser(req, res, next);

      expect(errorHandler).toHaveBeenCalledWith(error, req, res, next);
    });
  });

  // Test for loginUser
  describe('loginUser', () => {
    it('should log in a user and return a token', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      const mockUser = {
        email: 'test@example.com',
        matchPassword: jest.fn().mockResolvedValue(true),
        getSignedJwtToken: jest.fn().mockReturnValue('some-jwt-token')
      };
      
      User.findOne.mockResolvedValue(mockUser);

      await loginUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, token: 'some-jwt-token' });
    });

    it('should return 401 for invalid credentials', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'wrongpassword'
        }
      };

      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      User.findOne.mockResolvedValue(null);

      await loginUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
    });

    it('should call errorHandler if an error occurs', async () => {
      const req = {
        body: {
          email: 'test@example.com',
          password: 'password123'
        }
      };

      const res = {};
      const next = jest.fn();
      const error = new Error('Some error');
      User.findOne.mockRejectedValue(error);
      errorHandler.mockImplementation(() => {});

      await loginUser(req, res, next);

      expect(errorHandler).toHaveBeenCalledWith(error, req, res, next);
    });
  });

  // Test for getUser
  describe('getUser', () => {
    it('should return all users excluding admins', async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      };
      const next = jest.fn();

      const mockUsers = [{ name: 'User1', role: 'User' }, { name: 'User2', role: 'User' }];
      User.find.mockResolvedValue(mockUsers);

      await getUser(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ success: true, data: mockUsers });
    });

    it('should call errorHandler if an error occurs', async () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const error = new Error('Some error');
      User.find.mockRejectedValue(error);
      errorHandler.mockImplementation(() => {});

      await getUser(req, res, next);

      expect(errorHandler).toHaveBeenCalledWith(error, req, res, next);
    });
  });
});
