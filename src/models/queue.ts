import { EventEmitter } from 'events';

interface Message {
    id: number;
    payload: any;
}

class Queue {
    private messages: Message[] = [];
    private emitter = new EventEmitter();
    private nextId = 1;
    public name;
    private isTest: boolean;

    constructor(name: string, isTest: boolean = false) {
        this.name = name;
        this.isTest = isTest;
    }

    // expose the emitter for testing only, this.isTest is a hack
    public getEmitter() {
        if (this.isTest) {
            return this.emitter;
        }
        return null;
    }


    enqueue(payload: any): void {
        console.log(`inside enqueue with payload: ${JSON.stringify(payload)}`)
        const message = { id: this.nextId++, payload };
        this.messages.push(message);
        this.emitter.emit('new_message'); // todo: change to enum
    }

    async dequeue(timeout: number): Promise<any> {
        console.log(`Dequeue called on queue: ${this.name}, current messages: ${JSON.stringify(this.messages)}`);
        console.log(`inside dequeue with timeout: ${timeout}`)
        // console.log(`name is ${this.name}`)
        // console.log(`this.messages is ${JSON.stringify(this.messages)}`)
        if (this.messages.length > 0) {
            // although it is immediate in this case, we still want to return a consistent type
            return Promise.resolve(this.messages.shift()!.payload);
        }

        return new Promise((resolve, reject) => {
            // console.log(`queueName: ${this.name} timer init`)
            const timer: NodeJS.Timeout = setTimeout(() => {
                this.emitter.removeListener('new_message', listener);
                resolve(null);
            }, timeout);

            // console.log(`queueName: ${this.name} listener init`)
            const listener = () => {
                clearTimeout(timer);
                this.emitter.removeListener('new_message', listener);
                // console.log(`this.messages is ${JSON.stringify(this.messages)}`)
                const result = this.messages.shift();
                resolve(result?.payload);
            };

            this.emitter.once('new_message', listener);
        });
    }
}

export default Queue;
