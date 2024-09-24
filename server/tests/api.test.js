const request = require('supertest');
const app = require('../app/app');

describe('API Tests', () => {
  it('should return a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toContain('Welcome to the real-time chat app');
  });

  it('should authenticate a user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  it('should register a new user', async () => {
    const response = await request(app).post('/api/auth/register').send({
      email: 'newuser@example.com',
      password: 'password123',
    });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('token');
  });

  it('should return user details', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('email', 'test@example.com');
  });

  it('should send a message', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginResponse.body.token;

    const response = await request(app)
      .post('/api/messages/send')
      .set('Authorization', `Bearer ${token}`)
      .send({
        recipientId: 'recipientUserId',
        content: 'Hello!',
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty(
      'message',
      'Message sent successfully'
    );
  });

  it('should fetch messages for a user', async () => {
    const loginResponse = await request(app).post('/api/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });
    const token = loginResponse.body.token;

    const response = await request(app)
      .get('/api/messages')
      .set('Authorization', `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.messages)).toBe(true);
  });

  it('should return 404 for non-existent route', async () => {
    const response = await request(app).get('/non-existent-route');
    expect(response.statusCode).toBe(404);
    expect(response.body).toHaveProperty('message', 'Not Found');
  });
});
