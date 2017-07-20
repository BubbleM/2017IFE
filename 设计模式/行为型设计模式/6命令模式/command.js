/*
* 需求:通过执行命令语句自由创建图片.
* 分析需求,明确那些是变动的,哪些可以命令化,然后搭出命令对象
* 要提供一个命令接口,来合理化接受并处理你的命令
* */

// 模块实现模块
/*因为是动态展示不同模块,所以创建元素这一需求就是变化的,因此创建元素方法,展示方法应该被命令化*/
var viewCommand = (function () { // 命令对象
  // 方法集合
  var Action = {
    // 创建方法
    create: function () {},
    // 展示方法
    display: function () {}
  }
  // 命令接口
  return function excute() {}
})();

/*
* 创建视图过程如果单纯用DOM操作拼凑页面的开销太大
* 索性格式化字符串模板来创建页面
* */
var viewCommand = (function () {
  var tp1 = {
    // 展示图片结构模板
    product: [
      '<div>',
        '<img src="{#src#}"/>',
        '<p>{#text#}</p>',
      '</div>'
    ].join(''),
    // 展示标题结构模板
    title: [
      '<div class="title">',
        '<div class="main">',
          '<h2>{#title#}</h2>',
          '<p>{#tips#}</p>',
        '</div>',
      '</div>'
    ].join(''),
  };
  // 格式化字符串缓存字符串
  var html = '';
  /*
  * 格式化字符串,如'<div>{#content#}</div>'用{content:'demo'}替换后可得到字符串'<div>demo</div>'
  * */
  function formateString(str, obj) {
    // 替换'{#'与'#}'之间的字符串
    return str.replace(/\{#(\w+)#\}/g, function(match, key){
      return obj[key]
    })
  }
  // 方法集合
  var Action = {
    /*
    * @param data 指定模块视图数据
    * @param view 指定视图模板
    * */
    create: function (data, view) {
      if (data.length) {　 // 解析数据,如果数据是一个数组
        for (var i = 0,len = data.length; i < len; i++) {
          // 将格式化后的字符串缓存到html中
          html += formateString(tp1[view], data[i]);
        }
      } else {　// 如果是对象,直接将格式化字符串缓存到html中
        html += formateString(tp1[view], data);
      }
    },
    display: function (container, data, view) {
      if (data) { // 如果传入数据
        console.log('执行display');
        this.create(data, view); // 根据给定数据创建视图
      }
      // console.log(html) //查看创建的元素
      // 展示模块
      document.getElementById(container).innerHTML = html;
      // 展示后清空缓存的字符串
      html = '';
    }
  }
  // 返回命令接口
  /* 接口参数应包括两部分　命令对象内部的方法名称;命令对象内部方法对应的参数
  * */
  return function excute(msg) {
    // 解析命令,如果msg.param不是数组则将其转换为数组 apply要求第二个参数为数组
    msg.param = Object.prototype.toString.call(msg.param) === '[object Array]' ?
      msg.param : [msg.param];
    // Action内部调用的方法引用this 所以此处为保证作用域this执行传入Action
    Action[msg.command].apply(Action, msg.param);
  }
})();

// 测试数据
// 产品展示数据
var productData = [
  {
    src: 'http://pic1.cxtuku.com/00/07/70/b90090a53de9.jpg',
    text: '绽放的花'
  },
  {
    src: '...',
    text: '阳光'
  },
  {
    src: '...',
    text: '绿色'
  }
];
// 模拟标题数据
var titleData = {
  title: '夏日里的一片温馨',
  tips: '带给家人的感受'
};

// 创建一个标题模块
viewCommand({
  command: 'display',
  param: ['title', titleData, 'title']
});

// 创建一个图片
viewCommand({
  command: 'display',
  param: ['product', productData, 'product']
});