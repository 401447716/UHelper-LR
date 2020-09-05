import { getScore } from "../../network/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showMessage: false,
    image: '/images/arrowright.png',
    count: "1",
    // timeout: true,
    results: '',
    res: '',
    showList: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //  获取缓存的成绩信息
    wx.getStorage({
      key: 'score',
      success(res) {
        if (res.data == "") {
          wx.showLoading({
            title: '获取成绩中',
          })
          that.getscoreData(1)
          return
        } else {
          that.dealWithData(res.data)
        }
      },
      fail: function (res) {
        wx.showLoading({
          title: '获取成绩中',
        })
        that.getscoreData(1)
        return
      }
    })
  },
  //  获取成绩信息
  getscoreData: function (time) {
    let that = this
    if (time < 5) {
      getScore().then(res => {
        if (res.data != '' && res.data.code != 40001) {
          wx.setStorage({
            key: "score",
            data: res.data,
            success() {
              wx.hideLoading()
              that.onLoad()
            }
          })
        } else {
          that.getscoreData(time + 1)
        }
      }).catch(err => {
        that.getscoreData(time + 1)
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '成绩获取失败',
        icon: 'none'
      })
    }
  },
  showMore: function (e) {
    var cardType = e.currentTarget.dataset.index;
    var that = this;
    let list = this.data.showList
    let data = this.data.results
    list[cardType] = !list[cardType]
    if (list[cardType]) {
      data[cardType.substr(0, 9)][cardType.substr(-1)][0].image = '/images/arrowdown.png'
    } else {
      data[cardType.substr(0, 9)][cardType.substr(-1)][0].image = '/images/arrowright.png'
    }
    that.setData({
      showList: list,
      results: data
    })
  },
  dealWithData: function (results) {
    let that = this
    let gpaData = results.gpa
    for (let key in results) {
      if (key != 'credit' && key != 'gpa' && key != 'name') {
        for (let key2 in results[key]) {
          let gpa = {}
          gpa.gpa = gpaData[key][key2].gpa.toFixed(2)
          gpa.required = gpaData[key][key2].credit['必修课'] ? gpaData[key][key2].credit['必修课'] : 0
          gpa.elective = gpaData[key][key2].credit['选修课'] ? gpaData[key][key2].credit['选修课'] : 0
          gpa.general = gpaData[key][key2].credit['通选课'] ? gpaData[key][key2].credit['通选课'] : 0
          gpa.all = gpa.required + gpa.elective + gpa.general
          if (key2 == '1') {
            results[key].gpa1 = gpa
          } else if (key2 == '2') {
            results[key].gpa2 = gpa
          }
          results[key][key2][0].image = '/images/arrowright.png'
          that.data.showList[key + key2] = false
        }
      }
    }
    const ordered = {};
    Object.keys(results).sort().forEach(function (key) {
      ordered[key] = results[key];
    });
    that.setData({
      results: ordered,
      res: ordered
    })
  }
})