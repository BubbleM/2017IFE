/*
 * course1任务:了解getter和setter hasOwnProperty  ES5的defineProperty
 * */

// 观察者构造函数
function Observer(data) {
  this.data = data;
  this.walk(data);
}

let p = Observer.prototype;

/*
* 深层次遍历对象的各个属性　
* */
p.walk = function (obj) {
  let val; // 存储属性的值
  for (let key in obj) {
    // console.log(key)
    // 因为for...in循环会把对象原型链上所有可枚举属性都循环出来　
    // 而我们仅需要这个对象本身拥有的属性
    if (obj.hasOwnProperty(key)) {　
      val = obj[key];
      // 这里判断,如果还没有遍历到最底层,继续new Observer
      if (typeof val === 'object') {
        new Observer(val);
      }
      console.log(key + '---' + val )
      this.convert(key, val);
    }
  }
};

/*
* 添加get和set方法
* */
p.convert = function (key, val) {
  /*
  * @param this.data 要在this.data上定义属性
  * @param key 要定义或修改的属性的名称
  * @param {} 定义或修改属性的描述符
  * */
  Object.defineProperty(this.data, key, {
    configurable: true, // 可删除或改变
    enumerable: false, // 可枚举
    get: function () { // 函数返回值将被用作属性的值
      console.log('你访问了' + key);
      return val;
    },
    set: function (newVal) { // 该函数将仅接收参数赋值给该属性的新值
      console.log('你设置了' + key);
      console.log('新的' + key + ' = ' + newVal);
      if (newVal == val) return;
      val = newVal;
    }
  })
};

let data = {
  user: {
    name: 'BubbleM',
    age: 19
  },
  address: {
    city: 'xian'
  }
};

let app = new Observer(data);