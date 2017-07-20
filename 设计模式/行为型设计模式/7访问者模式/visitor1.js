/*
* 需求:解决IE在attachEvent事件中this指向不是该元素而是window 获取事件对象需要用window.e
* */
var bindEvent = function (dom, type, fn, data) {
  var data = data || {};
  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    // dom.attachEvent('on' + type, fn);
    dom.attachEvent('on' + type, function (e) { // 访问者模式修复bug
      fn.call(dom, e, data); // 核心就是调用call 使得事件源方法在回调函数中执行　同时传入额外参数data
    });
  } else {
    dom['on' + type] = fn;
  }
}
var demo = document.getElementById('demo');
bindEvent(demo, 'click', function () {
  this.style.background = 'red';
});