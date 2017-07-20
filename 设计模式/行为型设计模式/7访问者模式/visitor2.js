/*创建一个访问器,将必要的方法封装在内部,这样使用和管理都方便*/

// 访问器　　实现像操作数组一样操作一个对象
var Visitor = (function () {
  return {
    // 截取方法
    splice: function () {
      // splice参数　从原参数第二个参数开始算起
      var args = Array.prototype.splice.call(arguments, 1);
      //对第一个参数对象执行splice方法
      return Array.prototype.splice.apply(arguments[0], args);
    },
    // 追加数据方法
    push: function () {
      // 强化类数组对象,使其拥有length属性
      var len = arguments[0].length || 0;
      // 添加的数据从原参数的第二个参数算起
      var args = this.splice(arguments, 1);
      // 校正length属性
      arguments[0].length = len + arguments.length - 1;
      // 对第一个参数对象执行push
      return Array.prototype.push.apply(arguments[0], args);
    },
    // 弹出最后一次添加的元素
    pop: function () {
      // 对第一个参数对象执行pop
      return Array.prototype.pop.apply(arguments[0]);
    }
  }
})();

// 测试
var a = new Object();
console.log(a.length); // undefined 调用a对象时它没有length属性,但调用push后就有了
Visitor.push(a, 1,2,3,4); // 向a里面添加数据
console.log(a.length); //4
Visitor.push(a, 4,5,6);
console.log(a); // object{1,2,3,4,4,5,6}
console.log(a.length); // 7
Visitor.pop(a);
console.log(a); // object{1,2,3,4,4,5}
console.log(a.length); // 6
Visitor.splice(a, 2);
console.log(a); // object{1,2}