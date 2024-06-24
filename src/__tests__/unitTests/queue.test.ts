import Queue from '../../models/queue';

describe('Queue', () => {


    describe('enqueue', () => {
        const queue = new Queue("testQueue1");
        it('should add a message to the queue', () => {
            queue.enqueue({ message: "Hello, world!" });
            expect(queue.dequeue(1000)).resolves.toEqual({ message: "Hello, world!" });

        });


        it('should return null if the queue is empty',
            ()=>{expect(queue.dequeue(1000)).resolves.toBeNull(); // Ensure queue starts empty
        })
    });



    describe('dequeue', () => {
        const queue = new Queue("testQueue2");

        it('should return null after the timeout if no message is enqueued', async () => {
            const result = await queue.dequeue(500);
            expect(result).toBeNull();
        });

        it('should immediately return the message if the queue is not empty', async () => {
            queue.enqueue({ message: "Immediate message" });
            const result = await queue.dequeue(500);
            expect(result).toEqual({ message: "Immediate message" });
        });

        it('should handle multiple consumers correctly', async () => {


            queue.enqueue({ message: "For consumer1" });
            queue.enqueue({ message: "For consumer2" });

            const consumer1Promise = queue.dequeue(2000);
            const consumer2Promise = queue.dequeue(2000);

            const consumer1 = await consumer1Promise;
            const consumer2 = await consumer2Promise;


            expect(consumer1).toEqual({ message: "For consumer1" });
            expect(consumer2).toEqual({ message: "For consumer2" });
        });
    });
});
