const fp = require('lodash/fp')
// 数据
// horsepower 马力, dollar_value 价格, in_stock 库存
const cars = [{
  name: 'Ferrari FF',
  horsepower: 660,
  dollar_value: 700000,
  in_stock: true
},
{
  name: 'Spyker C12 Zagato',
  horsepower: 650,
  dollar_value: 648000,
  in_stock: false
},
{
  name: 'Jaguar XKR-S',
  horsepower: 550,
  dollar_value: 132000,
  in_stock: false
},
{
  name: 'Audi R8',
  horsepower: 625,
  dollar_value: 114200,
  in_stock: false
},
{
  name: 'Aston Martin One-7',
  horsepower: 750,
  dollar_value: 1850000,
  in_stock: true
},
{
  name: 'Pagani Huayara',
  horsepower: 700,
  dollar_value: 1300000,
  in_stock: true
}
]

/*
  练习1:  
    let last_car = fp.last(cars)   获取最后一条数据
    fp.prop('in_stock', last_car)  获取最后一条数据的 in_stock 属性值

  实现 isLastInStock 函数, 要求使用 fp.flowRight() 
  把 fp.last(), fp.prop() 组合而成
*/

// 1.实现 isLastInStock 函数
const isLastInStock = fp.flowRight(fp.prop('in_stock'), fp.last)
// 2.打印测试
console.log(isLastInStock(cars))  // 最终返回 true

/*
  练习2: 
  实现 firstName 函数, 要求使用 fp.flowRight()
  把 fp.prop(), fp.first() 组合而成
*/
// 1.实现 firstName 函数
const firstName = fp.flowRight(fp.prop('name'), fp.first)
// 2.打印测试
console.log(firstName(cars))  // 最终返回 Ferrari FF (第一个 car 的 name) 


/*
  练习3: 
  实现函数 averageDollarValue, 要求使用 fp.flowRight()
  把 fp.map(), _average() 组合而成
  
  参考代码:
    let averageDollarValue = function (cars) {
        let dollar_values = fp.map(function (car) {
            return car.dollar_value
        }, cars)
        return _average(dollar_values)
    }
*/
let _average = function (xs) {
  return fp.reduce(fp.add, 0, xs) / xs.length
} // <- 无须改动

// 1.实现 averageDollarValue 函数
const averageDollarValue = fp.flowRight(_average, fp.map(car => car.dollar_value))
// 2.打印测试
console.log(averageDollarValue(cars))  // 最终返回 

/*
  练习4: 
  实现 sanitizeNames() 函数，要求使用 fp.flowRight()
  最终把 cars 当作参数, 应该得到下面结果
    [
      'ferrari_ff',
      'spyker_c12_zagato',
      'jaguar_xkr-s',
      'audi_r8',
      'aston_martin_one_7',
      'pagani_huayara'
    ]
  即:
  1) 生成名字数组
  2) 名字全部小写
  3) 空格等字符替换成下划线 (直接使用 _underscore 即可)
*/
// 把非字母数字替换为下划线
let _underscore = fp.replace(/\W+/g, '_') // <--无须改动

// 1.实现 sanitizeNames 函数
// const sanitizeNames = fp.flowRight(fp.map(car => _underscore(fp.lowerCase(car.name))))
const sanitizeNames = fp.flowRight(fp.map(name => _underscore(name)), fp.map(car => fp.lowerCase(car.name)))
// 2.打印测试
console.log(sanitizeNames(cars))

/*
    [
      'ferrari_ff',
      'spyker_c12_zagato',
      'jaguar_xkr-s',
      'audi_r8',
      'aston_martin_one_7',
      'pagani_huayara'
    ]
*/