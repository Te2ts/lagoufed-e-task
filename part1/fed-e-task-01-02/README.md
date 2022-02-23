# Part1-2 作业

( 请在当前文件直接作答 )

## 简答题

### 1. 请说出下列最终执行结果，并解释为什么?

```javascript
var a = [];
for(var i = 0; i < 10; i++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6]()
```

```
答：10。
因为a数组里所有函数里的i都指向全局变量i，由于i在遍历10次自增之后，i的值变为10，所以输出10。
```

### 2. 请说出此案列最终执行结果，并解释为什么?

```javascript
var tmp = 123;
if (true) {
  console.log(tmp);
  let tmp;
}
```

```
答：报错，ReferenceError。
因为通过let声明的变量直到它们的定义被执行时才初始化，存在暂存死区。在初始化前是访问不到tmp的，所以此处报引用错误。
```

　

### 3. 结合ES6语法，用最简单的方式找出数组中的最小值

```javascript
var arr = [12, 34, 32, 89, 4]
```

```
答：Math.min(...arr)
```
　

### 4. 请详细说明var、let、const三种声明变量的方式之间的具体差别
　
```
答：
var声明的变量会被变量提升，let和const不存在变量提升，存在暂存死区。
let和const的作用域为块作用域，而var作用于函数作用域或全局作用域
let和var可以先声明后赋值，而const不可以
const声明初始化后的变量无法再被修改
```
　
### 5. 请说出下列代码最终输出结果，并解释为什么？

```javascript
var a = 10;
var obj = {
  a: 20,
  fn() {
    setTimeout(() => {
      console.log(this.a)
    })
  }
}
obj.fn()
```

```
答：输出20。
this的指向由执行上下文执行阶段确定，取决于单独调用还是被调用。
setTimeout里的回调函数为箭头函数，箭头函数的this是指向定义该函数时所在的作用域指向的对象，所以此时setTimeout的this指向fn的this。fn被obj调用，所以fn的this指向obj，obj.a = 20，所以输出20。
若令b = obj.fn; b()。 此时fn的this指向windows，即this.a输出10。
```
　

### 6. 简述Symbol类型的用途

　
```
答：构建对象的不可变隐藏属性，避免冲突以及序列化。
const symbolVal = Symbol('foo')
const object = { [symbolVal]: 1 }
Object.keys(object).forEach(key => console.log(key)) // 无法打印Symbol属性的值
console.log(JSON.stringify(object)) // {}
```
　

### 7. 说说什么是浅拷贝，什么是深拷贝？


```
答：
浅拷贝只拷贝数值，
例如
a = 1
b = a
console.log(b) // 输出1，因为b拷贝了a的数值

const a = { x:1 }
const b = a
b.x = 2
console.log(a.x) // 输出2, 因为b只拷贝了a对象的地址，修改的是同一对象

深拷贝则是深度完全拷贝，不会只拷贝地址
const a = { x:1 }
const b = JSON.parse(JSON.stringify(a))
a.x = 2
b.x = 3
console.log(a.x) // 2
console.log(b.x) // 3
```
　

### 8. 请简述TypeScript与JavaScript之间的关系？


```
答：TypeScript是JavaScript的超集，TypeScript在JavaScript的基础上扩展了类型系统。TypeScript在经过编译之后可以转化为JavaScript代码。
```
　

### 9. 请谈谈你所认为的typescript优缺点

　
```
答：
优点：支持强类型的声明，使错误更早的暴露。增强了代码的可读性和可维护性。重构更牢靠，减少不必要的类型判断
缺点：增加学习、开发成本

```
　

### 10. 描述引用计数的工作原理和优缺点

　
```
答：
工作原理：使用一个引用计数器来计算变量对象的引用数，通过判断当前引用数是否为0来决定该变量对象是否需要被回收。
优点：发现垃圾时立即回收，最大限度减少程序暂停
缺点：无法回收循环引用的对象，时间开销大（需要时刻维护引用数是否需要修改）
```
　

### 11. 描述标记整理算法的工作流程

　
```
答：
标记整理是标记清除的增强，标记阶段的操作和标记清除一致
1、遍历所有对象寻找并标记活动对象
2、遍历所有对象，先整理空间移动对象位置（避免内存空间碎片化），然后再清除没有被标记的对象。
3、回收对应的空间
```
　

### 12.描述V8中新生代存储区垃圾回收的流程

　
```
答：
1、回收过程采用复制算法+标记整理
2、新生代内存区分为两个等大小空间
3、使用空间为From，空闲空间为To
4、活动对象存储于From空间
5、标记整理后将活动对象拷贝至To
6、From与To交换空间完成释放
```
　

### 13. 描述增量标记算法在何时使用及工作原理

```
答：
增量标记的存在是为了解决标记清除可能造成长停顿的问题。
1、将一整段垃圾回收操作分成几个小段
2、垃圾回收与程序执行交替完成
3、程序执行一段时间后，产生垃圾对象，开始遍历对象进行标记，第一次标记可能就标记第一层活动对象，第二次标记所有活动对象，最后对空间进行回收。
```

　