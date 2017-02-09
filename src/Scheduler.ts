export type Task = () => void

export interface Scheduler {
    read (task: Task): void
    write (task: Task): void
    run (): void
}

class SchedulerImpl implements Scheduler {
    private reads: Task[] = []
    private writes: Task[] = []

    read (task: Task): void {
        this.reads.push(task)
    }

    write (task: Task): void {
        this.writes.push(task)
    }

    runOnce (): void {
        const reads = this.reads
        this.reads = []
        reads.forEach(task => task())

        const writes = this.writes
        this.writes = []
        writes.forEach(task => task())
    }

    run (): void {
        const loop = () => {
            this.runOnce()
            window.requestAnimationFrame(loop)
        }
        loop()
    }
}

export const scheduler: Scheduler = new SchedulerImpl()