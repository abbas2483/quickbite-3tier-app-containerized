const request = require('supertest');
const express = require('express');
const authRoutes = require('../routes/auth');
const foodRoutes = require('../routes/food');
const orderRoutes = require('../routes/order');

const app = express();
app.use(express.json());
app.use('/api', authRoutes);
app.use('/api', foodRoutes);
app.use('/api', orderRoutes);

describe('QuickBite API', () => {
  describe('GET /', () => {
    it('returns the API health message', async () => {
      app.get('/', (req, res) => {
        res.send('QuickBite / FoodieHub API is running...');
      });

      const response = await request(app).get('/');

      expect(response.statusCode).toBe(200);
      expect(response.text).toContain('QuickBite');
    });
  });

  describe('GET /api/foods', () => {
    it('returns the food catalogue', async () => {
      const response = await request(app).get('/api/foods');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expect.any(Array));
      expect(response.body.length).toBeGreaterThan(0);
      expect(response.body[0]).toEqual(expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        price: expect.any(Number)
      }));
    });
  });

  describe('POST /api/register', () => {
    it('rejects requests without username or password', async () => {
      const response = await request(app)
        .post('/api/register')
        .send({ username: 'testuser' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Username and password are required'
      });
    });
  });

  describe('POST /api/login', () => {
    it('rejects requests without username or password', async () => {
      const response = await request(app)
        .post('/api/login')
        .send({ password: 'password123' });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Username and password are required'
      });
    });
  });

  describe('POST /api/order', () => {
    it('rejects an empty cart', async () => {
      const response = await request(app)
        .post('/api/order')
        .send({ username: 'testuser', items: [], totalAmount: 0 });

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Missing required order fields or empty cart'
      });
    });
  });

  describe('GET /api/orders', () => {
    it('requires a username', async () => {
      const response = await request(app).get('/api/orders');

      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({
        error: 'Username is required to fetch orders'
      });
    });
  });
});