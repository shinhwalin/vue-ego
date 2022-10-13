//引入mockjs
const Mock = require("mockjs"); //安装的mockjs，并不是创建的mock.js
// 获取 mock.Random 对象
const Random = Mock.Random;
//使用mockjs模拟数据
Mock.mock("/api/data", (req, res) => {
  //当post或get请求到/api/data路由时Mock会拦截请求并返回上面的数据
  let list = [];
  for (let i = 0; i < 30; i++) {
    let listObject = {
      title: Random.csentence(5, 10), //随机生成一段中文文本。
      company: Random.csentence(5, 10),
      attention_degree: Random.integer(100, 9999), //返回一个随机的整数。
      photo: Random.image("114x83", "#00405d", "#FFF", "Mock.js"),
    };
    list.push(listObject);
  }
  return {
    data: list,
  };
});

//=====订单接口模拟==================================================
/**
 * 订单列表
 */
var MockRandom = Mock.Random;
var pageCount = MockRandom.integer(1, 10); //7
var haseMore = true; //是否还有更多数据  true有数据  false无更多数据 结束分页展示
var ids = 100; //自增长id
var result = {}; //数据模板

Mock.mock("/order-list", (req, res) => {
  var currPage = 2; //页码
  ids = currPage * 100;
  if (currPage === pageCount) {
    haseMore = false;
    result = {
      hasMore: false,
      totalPage: pageCount,
      "list|1-10": [
        //最后一页的数据在1-10的区间产生
        {
          "id|+1": ids,
          title: "@cword(3,20)", //随机汉字,
          address: "@province()/@city()/@county()",
          "num|1-100": 1,
          user: {
            avator: MockRandom.image("200x100", "#4A7BF7"), //图片大小
            name: "@cname",
            isvip: "@integer(0,1)",
            level: "@integer(0,20)",
          },
          created: "@date('yyyy-MM-dd-HH-mm-ss')", //日期
          time: MockRandom.now("yyyy-MM-dd"),
        },
      ],
    };
  } else {
    result = {
      hasMore: true,
      totalPage: pageCount,
      "list|10": [
        //有分页的时候一页10条数据
        {
          "id|+1": ids,
          title: "@cword(3,20)", //随机汉字,
          address: "@province()/@city()/@county()",
          "num|1-100": 1,
          user: {
            avator: MockRandom.image("200x100", "#4A7BF7"), //图片大小
            name: "@cname",
            isvip: "@integer(0,1)",
            level: "@integer(0,20)",
          },
          created: "@date('yyyy-MM-dd-HH-mm-ss')", //日期
          time: MockRandom.now("yyyy-MM-dd"),
        },
      ],
    };
  }
  //返回数据
  let mockData = Mock.mock(result);
  if (pageCount >= currPage) {
    return {
      status: 200,
      data: mockData,
      total: pageCount,
    };
  } else {
    return {
      status: 403,
      data: [],
    };
  }
});

Mock.mock("/sellTotal", (req, res) => {
  return Mock.mock({
    success: true,
    status: 200,
    info: {
      "id|+1": 100,
      date: function () {
        var category = [];
        var dottedBase = +new Date();
        for (var i = 30; i > 0; i--) {
          var date = new Date((dottedBase -= 1000 * 3600 * 24 * 30));
          category.push([date.getFullYear(), date.getMonth() + 1].join("-"));
        }
        return category.slice(0, 6);
      },
      "xResult|3": [
        {
          "xName|+1": ["家具", "手机", "家电"],
          "data|6": [{ "num|100-1000": 10 }],
        },
      ],
    },
  });
});
