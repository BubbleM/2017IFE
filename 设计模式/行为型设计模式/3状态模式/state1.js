/*
* 需求:处理网友对图片投票结果的统计
* 注意：每张图片都有很多种可能的结果
* */
/*
* 可以将不同的判断结果封装在状态对象内,
* 然后该状态对象返回一个可被调用的接口方法,
* 用于调用状态对象内部某种方法
* */

// 投票结果状态对象
var ResultState = function () {
  // 判断结果保存在内部状态中
  var States = {
    // 每种状态作为一种独立方法保存
    state0: function () {
      // 处理结果0
      console.log('这是第一种情况');
    },
    state1: function () {
      console.log('这是第二种情况');
    },
    state2: function () {
      console.log('这是第三种情况');
    },
    state3: function () {
      console.log('这是第四种情况');
    }
  }
  // 获取某一种状态并执行其对应的方法
  function show(result) {
    States['state' + result] && States['state' + result]();
  }
  return {
    // 返回调用状态方法接口
    show: show
  }
}();

// 展示第四种结果
ResultState.show(3); //这是第四种情况

