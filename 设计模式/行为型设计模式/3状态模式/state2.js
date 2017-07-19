/*
 * 对于状态模式,主要目的就是条件判断的不同结果转化为状态对象的内部状态
 * 既然是内部状态,所以一般作为状态对象内部的私有变量
 * 然后提供一个能够调用状态对象内部状态的接口方法对象
 * 这样方便了对某种状态的增删改查,也方便了对状态对象中内部状态的管理
 * */
//解决思路
/*
 *　首先创建一个状态对象,内部保存状态变量,然后内部封装好每种动作对应的状态
 *  最后状态对象返回一个接口对象,它可以对内部的状态修改或调用
 * */

// 创建超级玛丽状态类
var MarryState = function () {
  // 内部状态私有变量
  var _currentState = {};
  var states = {
    jump: function () {
      // 跳跃
      console.log('jump');
    },
    move: function () {
      // 移动
      console.log('move');
    },
    shoot: function () {
      // 射击
      console.log('shoot');
    },
    squat: function () {
      // 蹲下
      console.log('squat');
    }
  };
  //　动作控制类
  var Action = {
    // 改变状态方法
    changeState: function () {
      // 组合动作通过传递多个参数实现
      var arg = arguments;
      // 重置内部状态
      _currentState = {};
      // 如果有动作则添加动作
      if (arg.length) {
        // 遍历动作
        for (var i = 0,len = arg.length; i < len; i++) {
          // 向内部状态中添加动作
          _currentState[arg[i]] = true;
        }
      }
      // 返回动作控制类
      return this;
    },
    // 执行动作
    goes: function () {
      console.log('触发一次动作');
      // 遍历内部状态保存的动作
      for (var i in _currentState) {
        // 如果该动作存在则执行
        states[i] && states[i]();
      }
      return this;
    }
  }
  // 返回接口方法change\goes
  return {
    change: Action.changeState,
    goes: Action.goes
  }
}

// 测试
// 可以用函数方式直接执行这个状态类
MarryState()
  .change('jump', 'shoot') // 添加跳跃和射击动作
  .goes() // 执行动作
  .goes()
  .change('shoot')
  .goes();
// 为了更安全,还是实例化一下这个状态类,这样我们将使用这个状态类的副本
var marry  = new MarryState();
marry
  .change('jump', 'shoot') // 添加跳跃和射击动作
  .goes() // 执行动作
  .goes()
  .change('shoot')
  .goes();