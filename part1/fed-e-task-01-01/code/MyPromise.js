/*
尽可能还原 Promise 中的每一个 API, 并通过注释的方式描述思路和原理.
*/
const test = require('./test')
const STATUSTYPES = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected'
}

// 没有注册rejected状态的回调函数时，抛出的错误
// const uncaughtCatchError = reason => new Error(`Uncaught (in promise) ${reason}`)

class MyPromise {
  // Promise实例初始状态都为pending
  status = STATUSTYPES.PENDING
  // fulfilled状态的结果
  result = undefined
  // rejected状态的原因
  reason = undefined
  // then任务队列
  thenTasks = []
  // catch任务队列
  catchTasks = []

  // 构造器，负责调用new实例对象时的参数的回调函数
  constructor(executor) {
    // 执行回调函数
    executor(this.resolve, this.reject)
  }

  // 判断当前实例对象的状态是否为初始状态pending
  isPending = () => {
    return this.status === STATUSTYPES.PENDING
  }

  // 判断当前实例对象的状态是否为fulfilled状态
  isFulfilled = () => {
    return this.status === STATUSTYPES.FULFILLED
  }

  // 判断当前实例对象的状态是否为rejected状态
  isRejected = () => {
    return this.status === STATUSTYPES.REJECTED
  }

  // 更改状态
  changeStatus(status) {
    this.status = status
  }

  /* 静态方法resolve
  * 1. 如果传入值非Promise对象，则返回status为fulfilled的Promise对象
  * 2. 如果传入值为Promise对象，则直接返回这个Promise对象
  */
  static resolve(val) {
    if (val instanceof MyPromise) return val
    return new MyPromise(resolve => resolve(val))
  }

  /* 静态方法reject
  * 1. 如果传入值非Promise对象，则返回status为rejected的Promise对象
  * 2. 如果传入值为Promise对象，则直接返回这个Promise对象
  */
  static reject(val) {
    if (val instanceof MyPromise) return val
    return new MyPromise((undefined, reject) => reject(val))
  }

  resolve = val => {
    if (this.isPending()) {
      this.changeStatus(STATUSTYPES.FULFILLED)
      this.result = val
      this.thenTasks.length && this.thenTasks.shift()(this.result)
    }
  }
  reject = val => {
    if (this.isPending()) {
      this.changeStatus(STATUSTYPES.REJECTED)
      this.reason = val
      this.catchTasks.length && this.catchTasks.shift()(this.reason)
    }
  }
  then(thenCallback, catchCallback) {
    const awaitPromise = new MyPromise((resolve, reject) => {
      if (this.isPending()) {
        thenCallback && this.thenTasks.push(() => {
          setTimeout(() => {
            try {
              const thenValue = thenCallback(this.result)
              // 如果回调返回为自己，则抛出cycle错误
              if (awaitPromise === thenValue) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
              // 如果返回为Promise对象，则返回这个Promise对象，并且结果状态都保留
              if (thenValue instanceof MyPromise) {
                return thenValue(resolve, reject)
              } else {
                // 如果返回普通值，则保留这个状态回调这个普通值
                return resolve(thenValue)
              }
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        catchCallback && this.catchTasks.push(() => {
          setTimeout(() => {
            try {
              const catchValue = catchCallback(this.reason)
              if (awaitPromise === catchValue) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
              if (catchValue instanceof MyPromise) {
                return catchValue(resolve, reject)
              } else {
                return resolve(catchValue)
              }
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
  
      if (this.isFulfilled()) {
        // 等待微任务结束，以便获取回调的值
        thenCallback && setTimeout(() => {
          try {
            const thenValue = thenCallback(this.result)
            if (awaitPromise === thenValue) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
            if (thenValue instanceof MyPromise) {
              return thenValue(resolve, reject)
            } else {
              return resolve(thenValue)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
  
      if (this.isRejected()) {
        catchCallback && setTimeout(() => {
          try {
            const catchValue = catchCallback(this.reason)
            if (awaitPromise === catchValue) return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
            if (catchValue instanceof MyPromise) {
              return catchValue(resolve, reject)
            } else {
              return resolve(catchValue)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
    })

    return awaitPromise
  }
  finally (callback) {
    return this.then(value => {
      return MyPromise.resolve(callback()).then(() => value)
    }, reason => {
      return MyPromise.resolve(callback()).then(() => { throw reason })
    })
  }
  catch(catchCallback) {
    // catch就是没有resolve回调的then
    return this.then(undefined, catchCallback)
  }
}

const mircoTask = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    // resolve('timeout resolve')
    // reject('timeout reject')
  }, 1500)
  // resolve(1)
  // reject(2)
})

// console.log(MyPromise.resolve('status fulfilled'))

// mircoTask.then((val) => {
//   console.log('then value', val)
// })

// mircoTask.catch(val => console.log(val))

// mircoTask.then(val => {
//   console.log('then value', val)
//   return 3
// }, reason => {
//   console.log(reason)
//   return MyPromise.reject
// }).then(val => {
//   console.log('then2 value', val)
// }).catch(val => {
//   console.log('catch value', val)
// })
