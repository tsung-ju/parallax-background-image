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
        const { reads, writes } = this;
        this.reads = [];
        this.writes = [];
        reads.forEach(task => task());
        writes.forEach(task => task());
    }
    run() {
        const loop = () => {
            this.runOnce();
            window.requestAnimationFrame(this.runOnce);
        };
        loop();
    }
}
export const scheduler = new SchedulerImpl();
