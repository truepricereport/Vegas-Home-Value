// tests/apiGateway.hello.test.ts
// Test making a GET request to the real AWS backend via API Gateway
import axios from 'axios';

describe('API Gateway Hello World', () => {
  it('should return hello from AWS backend', async () => {
    // Replace with your actual API Gateway endpoint
    const url = process.env.AWS_API_GATEWAY_URL || 'https://your-api-id.execute-api.us-west-2.amazonaws.com/prod/hello';
    const response = await axios.get(url);
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('message');
    // Optionally check for a specific message
    // expect(response.data.message).toBe('Hello from Lambda!');
  });
});
