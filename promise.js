const PEDNING = 'pending',
    FULFILLED = 'fulfilled'
    REJECTED = 'rejected';

function MyPromise(executor) {
    let self = this;
    self.value = null;
    self.error = null;
    this.status = PEDNING;
    self.onFulfilled = null;    // 成功回调
    self.onRejected = null;     // 失败回调

    const resolve = (value) => {
        if (self.status !== PEDNING) return;
        setTimeout(() => {
            self.status = FULFILLED;
            self.value = value;
            self.onFulfilled(self.value);
        })
    }

    const reject = (error) => {
        if (self.status !== PEDNING) return;
        setTimeout(() => {
            this.status = REJECTED;
            self.error = error;
            self.onRejected(self.error);
        })
    }
    executor(resolve, reject);
}

MyPromise.prototype.then = function(onFulfilled, onRejected) {
    if (this.status === PEDNING) {
        this.onFulfilled = onFulfilled;
        this.onRejected = onRejected;
    } else if (this.status === FULFILLED) {
        onFulfilled(this.value);
    } else {
        onRejected(this.error);
    }
    return this;
}

const thunk = (name) => {
    return (callback) => {
        fs.readFile(name, callback)
    }
}

const gen = function*() {
    let data1 = yield thunk('1.txt');
    let data2 = yield thunk('1.txt');
    console.log(data1, data2)
}

let g = gen()

function run(g) {  
    const next = function(err, data) {
        let result = g.next(data);
        if (result.done) return;
        result.value(next);
    }
    next()
}

const readFilePromise = (filename) => {
    return new Promise((resolve, reject) => {
      fs.readFile(filename, (err, data) => {
        if(err) {
          reject(err);
        }else {
          resolve(data);
        }
      })
    })
}

function* gen() {
    let data1 = yield readFilePromise('1.txt');
    let data2 = yield readFilePromise('2.txt');
}
var g = gen()
g.next().value.then(data => {
    g.next(data).value.then(data => {
        g.next(data);
    })
})

function run2(g) {
    const next = function(data) {
        var result = g.next(data);
        if (result.done) return;
        result.value.then(next)
    }
    next();
}