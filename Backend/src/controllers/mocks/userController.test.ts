import { getAllUsers } from '../Users';
import * as usersModule from '../../db/users';
import { jest } from '@jest/globals';

jest.mock('../../db/users');

describe('getAllUsers', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // It Mocks array of Users and call getAllUsers and check success if it returns Mock data otherwise fail
  it('should return all users', async () => {
    const mockUsers: any = [
      { email: 'user@users.com' },
      { email: 'user2@user.com' },
    ];

    jest.spyOn(usersModule, 'getUsers').mockResolvedValue(mockUsers);

    const mockRequest: any = {};
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    await getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
  });

  it('should handle errors', async () => {
    const mockRequest: any = {};
    const mockResponse: any = {
      status: jest.fn().mockReturnThis(),
    };

    jest.spyOn(usersModule, 'getUsers').mockRejectedValue(new Error('Database error'));

    await getAllUsers(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(400);
  });
});
