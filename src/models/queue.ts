// import { EventEmitter } from 'events';

interface Message {
    id: number;
    payload: any;
}

class Queue {
    private messages: Message[] = [];
    private nextId = 1;
    public name;
    private waiting: { resolve: Function, timer: NodeJS.Timeout }[] = []

    constructor(name: string, isTest: boolean = false) {
        this.name = name;
    }




    enqueue(payload: any): void {
        const message = { id: this.nextId++, payload };
        this.messages.push(message);
        this.processQueue();
    }

    async dequeue(timeout: number): Promise<any> {
        if (this.messages.length > 0) {
            // although it is immediate in this case, we still want to return a consistent type
            return Promise.resolve(this.messages.shift()!.payload);
        }

        return new Promise((resolve, reject): void => {
            const timer: NodeJS.Timeout = setTimeout(() => {
                this.waiting = this.waiting.filter(request => request.resolve !== resolve)
                resolve(null);
            }, timeout);

            this.waiting.push({ resolve, timer });
        });
    }

    private processQueue() {
        while (this.messages.length > 0 && this.waiting.length > 0) {
            const { resolve, timer } = this.waiting.shift()!;
            clearTimeout(timer);
            resolve(this.messages.shift()!.payload)
        }
    }
}

export default Queue;
