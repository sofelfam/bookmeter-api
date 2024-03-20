import app from "../src"

describe('GET /', () => {
  it('Should return 200 response', async () => {
    const res = await app.request('http://localhost/');
    expect(res.status).toBe(200);
  });
});