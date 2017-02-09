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
        const { reads, writes } = this
        this.reads = []
        this.writes = []

        reads.forEach(task => task())
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