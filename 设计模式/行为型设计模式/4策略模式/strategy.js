/*
* 需求：商品促销
* 由于每种商品的促销策略只用一种情况,而不需要其他促销策略,此时采用策略模式更合理
* */
/*
* 为实现对每种商品的策略调用.你首先要将这些算法封装在一个策略对象内,
* 然后对每种商品的策略调用时,直接对策略对象中的算法调用即可
* 而策略算法又独立地分装在策略对象内
* */

// 价格策略对象
var PriceStrategy = function () {
  // 内部算法对象
  var strategy = {
    // 100返30
    return30: function (price) {
      // +price 转换为数字类型
      return +price + parseInt(price / 100) * 30;
    },
    // 100返50
    return50: function (price) {
      return +price + parseInt(price / 100) * 50;
    },
    // 9折
    percent90: function (price) {
      return price * 100 * 90 / 10000;
    },
    // 8折
    percent80: function (price) {
      return price * 100 * 80 / 10000;
    },
    // 5折
    percent50: function (price) {
      return price * 100 * 50 / 10000;
    }
  }
  // 策略算法调用接口
  return function (alogorithm, price) {
    // 如果算法存在,则调用算法,否则返回false
    return strategy[alogorithm] && strategy[alogorithm](price)
  }
}();

// 测试
var price = PriceStrategy('return50', '314.67');
console.log(price); //464.67