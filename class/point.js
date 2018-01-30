class Point {
    constructor(time, open, high, low, close) {
        this.time = time;
        this.open = open;
        this.high = high;
        this.low = low;
        this.close = close;
        this.isFinalBar = true;
    }

    clone() {
        let clone = new Point(this.time, this.open, this.high, this.low, this.close)
        clone.isFinalBar = this.isFinalBar
        return clone
    }

    print() {
        console.log("++++++++++++")
        console.log(new Date(this.time))
        console.log("open", this.open);
        console.log("high", this.high);
        console.log("low", this.low);
        console.log("close", this.close);
        console.log("isFinalBar", true);
        console.log("------------")
    }

    // get time() {
    //     return this.time;
    // }
    //
    // get open() {
    //     return this.open;
    // }
    //
    // get high() {
    //     return this.high;
    // }
    //
    // get low() {
    //     return this.low;
    // }
    //
    // get close() {
    //     return this.close;
    // }
    //
    // get isFinalBar() {
    //     return this.isFinalbar;
    // }
    //
    // set time(time) {
    //     this.time = time;
    // }
    //
    // set open(open) {
    //     this.open = open;
    // }
    //
    // set high(high) {
    //     this.high = high;
    // }
    //
    // set low(low) {
    //     this.low = low;
    // }
    //
    // set close(close) {
    //     this.close = close;
    // }
    //
    // set isFinalBar(isFinalbar) {
    //     this.isFinalbar = isFinalbar;
    // }
}

module.exports = Point
