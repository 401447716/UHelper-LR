//index.js
import {
  getClass as _getClass,
  getExam as _getExam,
  getScore as _getScore
} from '../../network/request.js';
import {
  formatDate,
  getDates,
  getMonth,
  getDay,
  getYear
} from '../../utils/utils.js';
const app = getApp()
    //     wx.cloud.callFunction({
    //       // 云函数名称
    //       name: 'readURL',
    //       // 传给云函数的参数
    //       data: {
    //         url: 'http://47.102.205.190:8080/JW/TimeTable?username=201710098068&password=abc112233'
    //       },
    //       success: function(res) {
    // //        var jsObject = JSON.parse(res.result)
    //         console.log(res)
    //       },
    //       fail: console.error
    //     })
Page({
  data: {
    openid: '',
    year: '',
    month: '',
    day: '',
    week2: '',
    week: '',
    courses: '',

    background: [
      'cloud://test-1-52ab98.7465-test-1-52ab98/fcb6e557ce4cef625aa27d1f38d28be.jpg',
      'cloud://test-1-52ab98.7465-test-1-52ab98/7ffb4ffdf6a3e64ef2c3c7e9f64c127.jpg',
      'cloud://test-1-52ab98.7465-test-1-52ab98/study.jpg'
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3500,
    duration: 500,
    previousMargin: 0,
    nextMargin: 0,
    coursess: [],
    category: [{
        id: 1,
        icon: '/images/course.png',
        name: '课表'
      },
      {
        id: 2,
        icon: '/images/grade.png',
        name: '成绩'
      },
      {
        id: 3,
        icon: '/images/exam.png',
        name: '考试'
      },
      {
        id: 4,
        icon: '/images/market.png',
        name: '服务'
      },
      {
        id: 5,
        icon: '/images/activity.png',
        name: '校内江湖'
      },
      {
        id: 6,
        icon: '/images/commission.png',
        name: '选课'
      },
    ],
    test: [],
    datedata: [],
    queryResult: '',
    timeout: true,
    bottomtext: '<----- 我是有底线的 ----->'
  },

  onLoad: function (options) {
    var _this = this;
    let time = formatDate(new Date());
    let date = getDates(1, time);
    var year = date["0"].year;
    var month = date["0"].month;
    var day = date["0"].day;
    var week = date["0"].week;
    _this.setData({
      year: year,
      month: month,
      day: day,
      week2: week
    })

    

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              app.globalData.nickname = res.userInfo.nickName;
              //              console.log(app.globalData.nickname)
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userInfo: res.userInfo,
                logged: true,
              })
            }
          })
        }
      }
    })

    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        this.onQuery(res.result.openid);
        // this.setData({
        //   openid: res.result.openid
        // })
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },

  getclass: function () {
    var that = this;
    this.GetCourses();
    let month = getMonth(new Date());
    let day = getDay(new Date());
    let week;
    if (that.CountDay(month, day) % 7 == 0) {
      week = that.CountDay(month, day) / 7 + 1;
    } else {
      week = that.CountDay(month, day) / 7;
    }
    that.setData({
      week: Math.ceil(week),
    })
    //    console.log(that.data.week);
  },

  GetCourses: function (e) {
    let that = this;
    var cur_weekday = "6012345".charAt(new Date().getDay()) //今天星期几
    //防止网络问题出现(添加loading动画)
    wx.getStorage({
      key: 'class',
      success(res) {
        if(res.data !== ""){
          that.setData({
            courses: res.data[0][cur_weekday]
          })
          wx.hideLoading()
          var res = that.MakeData()
          for (let k = 0; k < res.length; k++) {
            if (res[k].time == "第1,2节") {
              res[k].url = '/images/1.png'
            }
            if (res[k].time == "第3,4节") {
              res[k].url = '/images/2.png'
            }
            if (res[k].time == "第5,6节") {
              res[k].url = '/images/3.png'
            }
            if (res[k].time == "第7,8节") {
              res[k].url = '/images/4.png'
            }
            if (res[k].time == "第9,10节") {
              res[k].url = '/images/5.png'
            }
            if (res[k].time == "第11,12节") {
              res[k].url = '/images/6.png'
            }
          }
          that.setData({
            coursess: res,
          })
        }
      }
    })

    // 获取课表
    _getClass().then(res => {
      if (res.data !== "") {
        let data1 = new Array();
        data1[0] = res.data;
        wx.setStorage({
          key: "class",
          data: data1
        })
        that.setData({
          courses: data1[0][cur_weekday],
          cur_weekday: cur_weekday,
        })
        let _res = that.MakeData()
        for (let k = 0; k < _res.length; k++) {
          if (_res[k].time == "第1,2节") {
            _res[k].url = '/images/1.png'
          }
          if (_res[k].time == "第3,4节") {
            _res[k].url = '/images/2.png'
          }
          if (_res[k].time == "第5,6节") {
            _res[k].url = '/images/3.png'
          }
          if (_res[k].time == "第7,8节") {
            _res[k].url = '/images/4.png'
          }
          if (_res[k].time == "第9,10节") {
            _res[k].url = '/images/5.png'
          }
          if (_res[k].time == "第11,12节") {
            _res[k].url = '/images/6.png'
          }
        }
        that.setData({
          coursess: _res,
        })
        
      }
    }).catch(err => {
      console.log(err)
    })

    //  获取成绩
    _getScore().then(res => {
      if (res.data != "" && res.data.code != 40001) {
        wx.setStorage({
          key: "score",
          data: res.data
        })
      }
    })

    //  获取考试
    _getExam().then(res => {
      if (res.data != '') {
        wx.setStorage({
          key: "exam",
          data: res.data
        })
      }
    })
  },

  CountDay: function (month, day) {
    var countDay = 0;
    if (month >= 2 && month < 8) {
      let beginMonth = 2;
      let beginDay = 25;
      for (let i = beginMonth; i <= month; i++) {
        switch (i) {
          case 2: {
            if (i == month) {
              countDay = countDay + day - beginDay;
              break;
            } else {
              if ((getYear(new Date()) % 4 == 0 && getYear(new Date()) % 100 != 0) || getYear(new Date()) % 400 == 0) {
                //是闰年
                countDay = countDay + 29 - beginDay;
                break;
              } else {
                //不是闰年
                countDay = countDay + 28 - beginDay;
                break;
              }
            }
          }
          case 3: {
            if (i == month)
              countDay = countDay + day;
            else
              countDay = countDay + 31;
            break;
          }
          case 4: {
            if (i == month)
              countDay = countDay + day;
            else
              countDay = countDay + 30;
            break;
          }
          case 5: {
            if (i == month)
              countDay = countDay + day;
            else
              countDay = countDay + 31;
            break;
          }
          case 6: {
            if (i == month)
              countDay = countDay + day;
            else
              countDay = countDay + 30;
            break;
          }
          case 7: {
            if (i == month)
              countDay = countDay + day;
            else
              countDay = countDay + 31;
            break;
          }
        }
      }
      if (countDay > 28 - beginDay + 31 + 30 + 31 + 30 + 7) {
        countDay = 28 - beginDay + 31 + 30 + 31 + 30 + 7;
      }
    } else if (month >= 8 || month <= 1) {
      let beginMonth = 8;
      let beginDay = 25;
      if (month >= 8) {
        for (let i = beginMonth; i <= month; i++) {
          switch (i) {
            case 8: {
              if (i == month)
                countDay = countDay + day - beginDay;
              else
                countDay = countDay + 30 - beginDay;
              break;
            }
            case 9: {
              if (i == month)
                countDay = countDay + day;
              else
                countDay = countDay + 30;
              break;
            }
            case 10: {
              if (i == month)
                countDay = countDay + day;
              else
                countDay = countDay + 31;
              break;
            }
            case 11: {
              if (i == month)
                countDay = countDay + day;
              else
                countDay = countDay + 30;
              break;
            }
            case 12: {
              if (i == month)
                countDay = countDay + day;
              else
                countDay = countDay + 30;
            }
          }
        }
      } else {
        countDay = countDay + 30 - beginDay + 31 + 30 + 31 + 31 + day;
        if (countDay > 30 - beginDay + 31 + 30 + 31 + 31 + 15)
          countDay = countDay + 30 - beginDay + 31 + 30 + 31 + 31 + 15;
      }
    }
    return countDay;
  },

  ArrayCourse: function (array) { //判断这一周的这一天有没有上这一门课
    let that = this;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == that.data.week) {
        return true;
      }
    }
    return false;
  },
  MakeData: function () {
    let that = this;
    let courses = that.data.courses;
    for (let i = 0; i < courses.length; i++) {
      courses[i].have = that.ArrayCourse(courses[i].week_arr);
    }
    return courses;
  },

  //  获取账号密码
  onQuery: function (openid) {
    const db = wx.cloud.database()
    this.setData({
      datedata: []
    })
    db.collection('EducationSystem').where({
      _openid: openid
    }).get({
      success: res => {
        app.globalData.account = res.data[0].account;
        app.globalData.password = res.data[0].password;
        this.getclass()
      },
      fail: err => {}
    })
  },

  onShow: function (options) {
    var _this = this;
    if (this.data.openid != '') {
      this.onQuery(this.data.openid);
    }
  },

  // 功能模块点击事件
  tabClick: function (e) {
    var Id = e.currentTarget.id;
    if (app.globalData.account == '') {
      wx.showModal({
        title: '提示',
        content: '未绑定教务系统信息',
        showCancel: false
      })
      return
    }
    if (Id == 6) {
      // wx.showModal({
      //   title: '提示',
      //   content: '此功能未开发完全，敬请期待',
      //   showCancel: false
      // })
      wx.navigateTo({
        url: '../selectcourse/selectcourse',
      })
    } else if (Id == 4) {
      wx.showModal({
        title: '提示',
        content: '敬请期待',
        showCancel: false
      })
      // wx.navigateTo({
      //   url: '../first/first',
      // })
    } else if (Id == 2) {
      wx.navigateTo({
        url: '../score/score',
      })
    } else if (Id == 1) {
      wx.navigateTo({
        url: '../course/course',
      })
    } else if (Id == 5) {
      wx.showModal({
        title: '提示',
        content: '将打开其他小程序',
        success: function (res) {
          if (res.confirm) {
            console.log('确定跳转小程序')
            wx.navigateToMiniProgram({
              appId: 'wx22e26cceea9c93af',
              success(res) {
                // 打开其他小程序成功同步触发
                wx.showToast({
                  title: '跳转成功'
                })
              },
              fail(res) {
                // 打开其他小程序失败同步触发
                wx.showToast({
                  title: '跳转失败'
                })
              },
            })
          }
        }
      })
    } else if (Id == 3) {
      wx.navigateTo({
        url: '../exam/exam',
      })
    }
  },

})