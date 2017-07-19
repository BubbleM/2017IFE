// 将观察者放在闭包中，当页面加载就立即执行
var Observer = (function () {
  // 防止消息队列暴露而被篡改故将消息容器作为静态私有变量保存
  var __messages = {}
  return {
    // 注册消息接口
    /*
     * 注册方法的作用是将订阅者注册的消息推入到消息队列中
     * @param type 消息类型
     * @param fn 相应的处理动作
     */
    regist: function (type, fn) {
      // 如果消息不存在则应该创建一个该消息类型
      if (typeof __messages[type] === 'undefined') {
        // 将动作推入到该消息对应的动作执行队列中
        __messages[type] = [fn]
        // 如果此消息存在
      } else {
        // 将动作方法推入该消息对应的动作执行序列中
        __messages[type].push(fn)
      }
    },
    // 发布消息接口
    /*
     * 发布消息方法的功能是当观察者发布一个消息时将所有订阅者订阅的消息一次执行
     * @param type 消息类型
     * @param args 动作执行时需要传递的参数
     */
    fire: function (type, args) {
      // 如果该消息没有被注册，则返回
      if (!__messages[type])
        return;
      // 定义消息信息
      var events = {
        type: type, // 消息类型
        args: args || {}　// 消息携带数据
      };
      var i = 0; // 消息动作循环变量
      var len = __messages[type].length; // 消息动作长度
      // 遍历消息动作
      for (; i < len; i++) {
        // 依次执行注册的消息对应的动作序列
        __messages[type][i].call(this, events);
      }
    },
    // 移除消息接口
    /*
     * 消息注销方法，功能是将订阅这注销的消息从消息队列中清除
     * @param type 消息类型
     * @param fn 执行的某一动作
     * */
    remove: function (type, fn) {
      // 如果消息动作队列存在
      if (__messages[type] instanceof Array) {
        // 从最后一个消息动作遍历
        var i = __messages[type].length - 1 ;
        for (; i >= 0; i--) {
          // 如果存在该动作则在消息动作序列中移除相应动作
          __messages[type][i] === fn && __messages[type].splice(i, 1);
        }
      }
    }
  }
})()
// 测试
Observer.regist('test', function (e) {
  console.log(e.type, e.args.msg);
});
// 发布这条消息
Observer.fire('test', {msg: '传递参数'}); // test 传递参数