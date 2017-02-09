export declare type Task = () => void;
export interface Scheduler {
    read(task: Task): void;
    write(task: Task): void;
    run(): void;
}
export declare const scheduler: Scheduler;
