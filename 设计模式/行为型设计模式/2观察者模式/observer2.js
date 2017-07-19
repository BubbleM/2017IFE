/*
* 既然选择使用观察者模式来解决问题,
* 首先就要分析哪些模块应该注册消息，哪些模块应发布消息
* */
/*
* 发布留言与删除留言功能是用户主动触发的,应该是观察者发布消息
* 评论的追加以及用户信息的增减是被动触发的,应该是订阅者去注册信息
* */
// 实现消息注册功能模块,用户追加评论
//外观模式,简化获取元素
function $(id) {
  return document.getElementById(id);
}
// 工程师A
(function () {
  // 追加一则消息
  function addMsgItem(e) {
    var text = e.args.text; // 获取消息中用户添加的文本内容
    var ul = $('msg'); // 留言容器元素
    var li = document.createElement('li'); // 创建内容容器元素
    var span = document.createElement('span'); // 删除按钮
    li.innerHTML = text; // 写入评论
    // 关闭按钮
    span.onclick = function () {
      ul.removeChild(li); // 移除留言
      // 发布删除浏览信息
      Observer.fire('removeCommentMessage', {
        num: -1
      });
    }
    // 添加删除按钮
    li.appendChild(span);
    // 添加留言节点
    ul.appendChild(li);
  }
  // 注册添加评论信息
  Observer.regist('addCommentMessage', addMsgItem);
})();

// 实现递增用户信息功能
// 工程师B
(function () {
  // 更改用户消息数目
  function changeMsgNum(e) {
    // 获取需要增加的用户消息数目
    var num = e.args.num;
    // 增加用户消息数目并写入页面
    $('msg_num').innerHTML = parseInt($('msg_num').innerHTML) + num;
  }
  // 注册添加评论信息
  Observer
    .regist('addCommentMessage', changeMsgNum)
    .regist('removeCommentMessage', changeMsgNum);
})();

// 用户提交信息,触发消息发布功能
//　工程师C
(function () {
  // 用户点击提交按钮
  $('user_submit').onclick = function () {
    // 获取用户输入框中输入的信息
    var text = $('user_input');
    // 如果消息为空则提交失败
    if (text.value === '') return;
    //发布一则评论消息
    Observer.fire('addComentMessage', {
      text: text.value,
      num: 1
    });
    text.value = ''; // 将输入框置为0
  }
})();