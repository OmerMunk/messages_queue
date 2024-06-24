import {IMessage} from "../interfaces/message";


class Queue {
    private messages: IMessage[] = [];
    private nextId: number = 1;
    public name: string;
    private waiting: { resolve: Function, timer: NodeJS.Timeout }[] = []

    constructor(name: string) {
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

    private processQueue(): void {
        while (this.messages.length > 0 && this.waiting.length > 0) {
            const { resolve, timer } = this.waiting.shift()!;
            clearTimeout(timer);
            resolve(this.messages.shift()!.payload)
        }
    }
}

export default Queue;
