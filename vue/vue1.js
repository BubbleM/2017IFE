/*
 * course1任务:了解getter和setter hasOwnProperty ES5的defineProperty
 * */
// 观察者构造函数
function Observer(data) {
  this.data = data;
  this.walk(data);
}

let p = Observer.prototype;

/*
 * 此函数用于深层次遍历对象的各个属性
 * 采用的是递归的思路
 * 因为我们要为对象的每一个属性绑定getter和setter
 * */
p.walk = function (obj) {
  let val;
  for (let key in obj) {
    /*
     * 用hasOwnProperty过滤
     * 由于for...in循环会把对象原型链上的所有可枚举属性都循环出来
     * 而我们想要的仅仅是这个对象本身拥有的属性
     * */
    if (obj.hasOwnProperty(key)) {
      val = obj[key];
      //这里判断　如果还没有遍历到最底层,继续new Observer
      if (typeof  val === 'object') {
        new Observer(val);
      }
      this.convert(key, val);
    }
  }
};

p.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key);
      return val;
    },
    set: function (newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + '=' + newVal);
      if (newVal === val) return;
      val = newVal;
    }
  })
};

let data = {
  user: {
    name: 'bubble',
    age: "18"
  },
  address: {
    city: "xian"
  }
};

let app = new Observer(data);