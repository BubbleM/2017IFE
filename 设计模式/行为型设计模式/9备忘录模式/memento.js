/*
* 可以通过备忘录模式来缓存你请求过的数据.
* 也就是说每次发送请求的时候对当前状态做一次记录,将你请求下的数据以及对应的页码缓存下来
* 如果将来某一时刻想返回到某一浏览过的新闻页,直接在缓存中查询即可
* 直接恢复记录过的状态而不必触发新的请求行为　高效
* */

// page备忘录类
var Page = function () {
  // 信息缓存对象
  var cache = {};
  /*
  * 主函数
  * @param page 页码
  * @param fn 成功回调函数
  * */
  return function (page, fn) {
    // 判断该页数据是否在缓存中
    if (cache[page]) {
      // 恢复到该页状态,显示该页内容
      showPage(page, cache[page]);
      // 执行成功回调函数
      fn && fn();
    } else {
      // 若缓存Cache中无该页数据
      $.post('./data/getNewsData.php', {
        // 请求携带数据page页码
        page: page
      }, function (res) {
        // 成功返回
        if (res.errNo == 0) {
          // 显示该页数据
          showPage(page, res.data);
          // 将该页数据添加缓存中
          cache[page] = res.data;
          // 执行成功回调函数
          fn && fn();
        } else {
          // 处理异常
        }
      })
    }
  }
}()
/*
* 这样以后如果用户想回看某页新闻数据,就不需要发送不必要的请求了,
* 而且用户也不必要因等待请求响应而造成时间延迟了
* */
// 下一页按钮点击事件
$('#next_page').click(function () {
  // 获取新闻内容元素
  var $news = $('#news_content');
  // 获取新闻内容元素当前页数据
  var page = $news.data('page');
  // 获取并显示新闻
  Page(page, function () {
    // 修正新闻内容元素当前页数据
    $news.data('page', page + 1);
  })
});