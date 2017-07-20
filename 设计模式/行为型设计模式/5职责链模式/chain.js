/*
职责链条模式Chain of Responsibility:解决请求的发送者与请求的接受者之间的耦合
通过职责链上的多个对象对分解请求流程,实现请求在多个对象之间的传递,直到最后一个对象完成请求的处理
*/
/*
* 将事件源,异步请求,创建组件的逻辑分开处理
* 将整个需求分解为独立模块,每个模块只做自己份内的事,无关的事情传到下一个模块,直到需求完成.
* 好处是:即便前一个对象不确定也不会影响到其他对象.通过这种方式创建出的对象可以进行单元测试,
* 测试每个模块对象对各种情况的处理情况,保证每个组件对象的处理逻辑的安全性
* */

/*
* 需求:表单输入提示和输入验证处理
* 模块:1.绑定事件;2.创建XHR进行异步请求获取数据;
* 3.对适配响应数据,将接收到的数据格式化成可处理的形式;4.向组件创建器传入相应数据生成组件
* */

// 异步请求模块
/*
* 异步请求对象
* @param　data  请求数据
* @param dealType 响应数据处理对象
* @param dom 事件源
* */
var sendData = function (data, dealType, dom) {
  // XHR对象
  var xhr = new XMLHttpRequest();
  // 请求路径
  var url = 'getData.php?mod=userInfo';
  // 请求返回事件
  xhr.onload = function (event) {
    // 请求成功
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
      dealData(xhr.responseText, dataType, dom);
    } else {
      // 请求失败
    }
  }
  // 拼接请求字符串
  for (var i in data) {
    url += '&' + i + '-' + data[i];
  }
  // 发送异步请求
  xhr.open('get', url, true);
  xhr.send(null);
}

// 响应数据适配模块
/*
* 处理响应数据
* @param data 响应数据
* @param dealType 响应数据处理对象
* @param dom 事件源
* */
var dealData = function (data, dealType, dom) {
  // 对象toString方法简化引用
  var dataType = Object.prototype.toString.call(data);
  // 判断相应数据处理对象
  switch (dealType) {
    // 输入框提示功能
    case 'sug':
      // 如果数据为数组
      if (dataType === '[object Array]') {
        // 创建提示框组件
        return createSug(data, dom);
      }
      // 将响应的对象数据转化为数组
      if (dataType === '[object Object]') {
        var newData = [];
        for (var i in data) {
          newData.push(data[i]);
        }
        // 创建提示框组件
        return createSug(newData, dom);
      }
      // 将响应的其他数据转换为数组
      return createSug([data], dom);
      break;
    case 'validate':
      // 创建校验组件
      return createValidataResult(data, dom);
      break;
  }
}

// 创建组件模块
/*
* 创建提示框组件
* @param data 响应适配数据
* @param dom 事件源
* */
var createSug = function (data, dom) {
  var i = 0;
  var len = data.length;
  var html = '';
  // 拼接每一条提示语句
  for (; i < len; i++) {
    html += '<li>' + data[i] + '</li>';
  }
  // 显示提示框
  dom.parentNode.getElementByTagName('ul')[0].innerHTML = html;
}
// 创建校验组件
var createValidataResult = function (data, dom) {
  // 显示校验结果
  dom.parentNode.getElementByTagName('span')[0].innerHTML = data;
}


// 单元测试
dealData('用户名不正确', 'validate', input[0]);
dealData(123, 'sug', input[1]);
dealData(['爱奇异', '阿里巴巴', '爱漫画'], 'sug', input[1]);
dealData({
  'iqy': '爱奇艺',
  'albb': '阿里巴巴',
  'imh': '爱漫画'
}, 'sug', input[1]);
// 模拟创建测试方法
var createSug = function (data, dom) {
  console.log(data, dom, 'createSug');
}
var createValidataResult = function (data, dom) {
  console.log(data, dom, 'createValidataResult');
}
