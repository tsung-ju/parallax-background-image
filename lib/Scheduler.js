class SchedulerImpl {
    constructor() {
        this.reads = [];
        this.writes = [];
    }
    read(task) {
        this.reads.push(task);
    }
    write(task) {
        this.writes.push(task);
    }
    runOnce() {
        const reads = this.reads;
        this.reads = [];
        reads.forEach(task => task());
        const writes = this.writes;
        this.writes = [];
        writes.forEach(task => task());
    }
    run() {
        const loop = () => {
            this.runOnce();
            window.requestAnimationFrame(loop);
        };
        loop();
    }
}
export const scheduler = new SchedulerImpl();
