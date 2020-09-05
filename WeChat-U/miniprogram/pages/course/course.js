import { getClass } from '../../network/request.js';
import { getYear, getMonth, getDay } from "../../utils/utils.js";
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeout: true,
    week_day: ['一', '二', '三', '四', '五', '六', '日'],
    // course: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}], //单周的课程表
    courses: [], //整个学期的课程表
    coursess: '',
    cur_weekday: "", //今天星期几
    swiper: {
      current: 0,
      weeks: ['第一周', '第二周', '第三周', '第四周', '第五周', '第六周', '第七周', '第八周', '第九周', '第十周', '十一周', '十二周', '十三周', '十四周', '十五周', '十六周', '十七周', '十八周', '十九周', '二十周']
    },

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.executeData()
    // 获取缓存课表信息
    wx.getStorage({
      key: 'class',
      success(res) {
        that.setData({
          courses: res.data
        })
        if (!that.data.courses) {
          wx.showLoading({
            title: '获取课表中',
          })
          that.getclassData(1)
          return
        } else {
          that.executeData()
        }
      },
      fail(res) {
        wx.showLoading({
          title: '获取课表中',
        })
        that.getclassData(1)
        return
      }
    })

  },

  // 获取课表信息
  getclassData: function (time) {
    let that = this
    if (time < 5) {
      getClass().then(res => {
        if (res.data != '' && res.data.code != 40001) {
          let data1 = new Array()
          data1[0] = res.data
          wx.setStorage({
            key: "class",
            data: data1,
            success() {
              wx.hideLoading()
              wx.redirectTo({
                url: '../course/course'
              })
            }
          })
        } else {
          that.getclassData(time + 1)
        }
      }).catch(err => {
        that.getclassData(time + 1)
      })
    } else {
      wx.hideLoading()
      wx.showToast({
        title: '课表获取失败',
        icon: 'none'
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getCourses()
  },

  /**
   * 点击切换周数
   */
  SwiperChange: function (e) {
    var that = this;
    let direction = e.currentTarget.dataset.direction;
    let swiper = this.data.swiper;
    let current = swiper.current;

    if (direction == "left") {
      swiper.current = current > 0 ? current - 1 : swiper.weeks.length - 1;
    } else if (direction == "right") {
      swiper.current = current < (swiper.weeks.length - 1) ? current + 1 : 0;
    }
    that.MakeData(swiper.current + 1);
    that.setData({
      swiper: swiper
    });
    that.setData({
      coursess: that.MakeData(),
    })
    that.GetCourse();
  },

  getCourses: function (e) {
    let that = this;
    let cur_weekday = "天一二三四五六 ".charAt(new Date().getDay()) //今天星期几
    //防止网络问题出现(添加loading动画)

    //  更新swiper
    let swiper = that.data.swiper;
    that.setData({
      cur_weekday: cur_weekday,
      swiper: swiper,
      coursess: that.MakeData(),
    })
    that.GetCourse();
  },

  //课程整理数据
  MakeData: function () {
    var that = this;
    let courses = that.data.courses[0];
    if (!courses) {
      return
    }
    for (let i = 0; i < courses.length; i++) {
      for (let j = 0; j < courses[i].length; j++) {
        courses[i][j].have = that.ArrayCourse(courses[i][j].week_arr);
      }
    }
    return courses;
  },

  //  判断当前周是否有该课程
  ArrayCourse: function (array) {
    let that = this;
    for (let i = 0; i < array.length; i++) {
      if (array[i] == that.data.swiper.current + 1) {
        return true;
      }
    }
    return false;
  },

  // 筛选当周课表
  GetCourse: function () {
    let that = this;
    if (!that.data.coursess) {
      return
    }
    let coursess1 = {},
      coursess2 = {},
      coursess3 = {},
      coursess4 = {},
      coursess5 = {},
      coursess6 = {};
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess1[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第1,2节' && that.data.coursess[i][j].have == true) {
          coursess1[i] = that.data.coursess[i][j];
        }
      }
    }
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess2[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第3,4节' && that.data.coursess[i][j].have == true) {
          coursess2[i] = that.data.coursess[i][j];
        }
      }
    }
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess3[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第5,6节' && that.data.coursess[i][j].have == true) {
          coursess3[i] = that.data.coursess[i][j];
        }
      }
    }
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess4[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第7,8节' && that.data.coursess[i][j].have == true) {
          coursess4[i] = that.data.coursess[i][j];
        }
      }
    }
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess5[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第9,10节' && that.data.coursess[i][j].have == true) {
          coursess5[i] = that.data.coursess[i][j];
        }
      }
    }
    for (let i = 0; i < that.data.coursess.length; i++) {
      coursess6[i] = {
        have: false
      }
      for (let j = 0; j < that.data.coursess[i].length; j++) {
        if (that.data.coursess[i][j].time == '第11,12节' && that.data.coursess[i][j].have == true) {
          coursess6[i] = that.data.coursess[i][j];
        }
      }
    }
    that.setData({
      coursess1: coursess1,
      coursess2: coursess2,
      coursess3: coursess3,
      coursess4: coursess4,
      coursess5: coursess5,
      coursess6: coursess6,
    })
  },

  //  计算开学到现在过去多少天
  CountDay: function (month, day) {
    var countDay = 0;
    if (month >= 2 && month < 8) {
      let beginMonth = 2;
      let beginDay = 24;
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
      let beginDay = 31;
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

  // 计算现在为第几周
  executeData: function () {
    let that = this
    let month = getMonth(new Date());
    let day = getDay(new Date());
    let week;
    if (that.CountDay(month, day) % 7 == 0) {
      week = that.CountDay(month, day) / 7 + 1;
    } else {
      week = that.CountDay(month, day) / 7;
    }
    that.data.swiper.current = Math.ceil(week) - 1;
    if (that.data.swiper.current < 0 || that.data.swiper.current >= 20) { //默认第一周
      that.data.swiper.current = 0;
    }
  },
})