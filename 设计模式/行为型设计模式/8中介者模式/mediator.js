/*
* 需求:为导航模块添加一个设置层,让用户可以通过设置层,来设置导航展现样式
* 解决思路：使用中介者模式,设置层模块对象就应该是一个中介者对象.
* 他负责向各个导航模块对象发送用户设置的消息,而各个导航模块则应作为消息的订阅者
* */
// 中介者对象
var Mediator = function () {
  // 消息对象
  var _msg = {};
  return {
    /*
    * 订阅消息方法
    * @param type 消息名称
    * @param action 消息回调函数
    * */
    register: function (type, action) {
      //如果该消息存在
      if (_msg[type])
        // 存入回调函数
        _msg[type].push(action);
      else {
        // 不存在　则建立该消息容器
        _msg[type] = [];
        // 存入新消息回调函数
        _msg[type].push(action);
      }
    },
    /*
    * 发布消息方法
    * @param type 消息名称
    * */
    send: function (type) {
      // 如果该消息已经被订阅
      if (_msg[type]) {
        // 遍历已存储的消息回调函数
        for (var i = 0,len = _msg[type].length; i < len; i++) {
          // 执行该回调函数
          _msg[type][i] && _msg[type][i]();
        }
      }
    }
  }
}();

// 单元测试
//　订阅demo消息 执行回调函数　－－输出first
Mediator.register('demo', function () {
  console.log('first');
});
//　订阅demo消息 执行回调函数　－－输出send
Mediator.register('demo', function () {
  console.log('send');
});
// 发布demo消息
Mediator.send('demo'); // 依次输出first send

// 订阅消息
/*
* 显隐导航小组件
* @param mod 模块
* @param tag 处理的标签(消息提醒b,网址span)
* @param showOrHide 显示还是隐藏
* */
var showHideNavWidget = function (mod, tag, showOrHide) {
  // 获取导航模块
  var mod = document.getElementById(mod);
  // 获取下面的标签名为tag的元素
  var tag = mod.getElementsByTagName(tag);
  // 如果设置为false或hide则值为hidden,否则为visible
  var showOrHide = (!showOrHide || hide) ? 'hidden' : 'visible';
  // 占位隐藏这些标签
  for (var i = tag.length - 1; i >= 0; i--) {
    tag.style.visibility = showOrHide;
  }
};


// 用户收藏导航模块里面的导航有消息提醒与导航网址功能
(function () {
  // 其他交互逻辑
  //　订阅隐藏用户收藏导航消息提醒消息
  Mediator.register('hideAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', false);
  });
  // 订阅显示用户收藏导航消息提醒消息
  Mediator.register('showAllNavNum', function () {
    showHideNavWidget('collection_nav', 'b', true);
  });
  //　订阅隐藏用户收藏导航网址消息
  Mediator.register('hideAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', false);
  });
  // 订阅显示用户收藏导航网址消息
  Mediator.register('showAllNavUrl', function () {
    showHideNavWidget('collection_nav', 'span', true);
  });
})();
// 最近常用导航内有导航网址功能　类似上面为其注册事件

// 发布消息
// 设置层模块
(function () {
  // 消息提醒选框
  var hideNum = document.getElementById('hide_num');
  // 网址选框
  var hideUrl = document.getElementById('hide_url');
  // 消息提醒选框事件
  hideNum.onchange = function () {
    // 如果勾选
    if (hideNum.checked) {
      Mediator.send('hideAllNavNum'); // 中介者发布隐藏消息提醒功能消息
    } else {
      Mediator.send('showAllNavNum');
    }
  }
  // 网址选框事件
  hideUrl.onchange = function () {
    // 如果勾选
    if (hideUrl.checked) {
      Mediator.send('hideAllNavUrl'); // 中介者发布隐藏导航网址消息
    } else {
      Mediator.send('showAllNavUrl');
    }
  }
})();