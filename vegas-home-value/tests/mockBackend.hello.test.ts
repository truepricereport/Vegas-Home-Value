// tests/mockBackend.hello.test.ts
// Test using a local mock backend that returns a predefined JSON
import axios from 'axios';
import http from 'http';

describe('Mock Backend Hello World', () => {
  let server: http.Server;
  const port = 4000;
  const mockResponse = { message: 'Hello from Mock Backend!' };

  beforeAll((done) => {
    server = http.createServer((req, res) => {
      if (req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(mockResponse));
      } else {
        res.writeHead(404);
        res.end();
      }
    }).listen(port, done);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('should return hello from mock backend', async () => {
    const response = await axios.get(`http://localhost:${port}/hello`);
    expect(response.status).toBe(200);
    expect(response.data).toEqual(mockResponse);
  });
});
