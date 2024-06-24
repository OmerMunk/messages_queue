import Queue from '../models/queue'

const queueMap = new Map<string, Queue>();

export const getMessageFromQueue = async (queueName: string, timeout: number): Promise<any> => { // todo: change to message interface

    const queue = queueMap.get(queueName) || new Queue(queueName);
    queueMap.set(queueName, queue);
    return await queue.dequeue(timeout);
}

export const addMessageToQueue = async (queueName: string, payload: any): Promise<boolean> => {
    const queue = queueMap.get(queueName) || new Queue(queueName);
    queueMap.set(queueName, queue);
    queue.enqueue(payload);
    return true;
}
