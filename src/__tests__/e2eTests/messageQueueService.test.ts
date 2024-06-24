import request from 'supertest';
import app from '../../app'


describe('queue Routes', () => {
    it('should enqueue a message', async () => {
        const response = await request(app).post('/api/testQueue').send({sender: 'sender1', text:'hi there'});
        expect(response.status).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toEqual('Message added to queue');
    });
})

describe('queue Routes', () => {
    it('should dequeue a message', async () => {
        const response = await request(app).get('/api/testQueue');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message.text).toEqual('hi there');
    });
})
