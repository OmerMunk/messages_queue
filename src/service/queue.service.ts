import Queue from '../models/queue'

const queueMap = new Map<string, Queue>();

export const getMessageFromQueue = async (queueName: string, timeout: number): Promise<any> => { // todo: change to message interface
    // console.log(`inside getMessageFromQueue with queueName: ${queueName}`)
    const queue = queueMap.get(queueName) || new Queue(queueName);
    // console.log(`queue is ${queue}`);
    queueMap.set(queueName, queue);
    // console.log(`queueName: ${queueName} calling dequeue`)
    const result = await queue.dequeue(timeout);
    // console.log(`result from dequeue: ${result}`)
    return result
}

export const addMessageToQueue = async (queueName: string, payload: any): Promise<boolean> => {
    const queue = queueMap.get(queueName) || new Queue(queueName);
    queueMap.set(queueName, queue);
    queue.enqueue(payload);
    return true;
}
