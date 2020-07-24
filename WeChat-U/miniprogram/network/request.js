const app = getApp() //获取app实例
//  获取考试信息
export function getExam() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/JW/exam?username=' + app.globalData.account + '&password=' + app.globalData.password,
      method: 'GET',
      success: (res) => {
        resolve(res)
      },
      fail: (res) => {
        reject(res)
      }
    })
  })
}

//  获取成绩信息
export function getScore() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/JW/score?username=' + app.globalData.account + '&password=' + app.globalData.password,
      method: 'GET',
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}
//  获取课表信息
export function getClass() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/JW/TimeTable?username=' + app.globalData.account + '&password=' + app.globalData.password,
      method: 'GET',
      success: function (res) {
        resolve(res)
      },
      fail: function (res) {
        reject(res)
      },
    })
  })
}
//  登录
export function login() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/JW/login',
      method: 'GET',
      data: {
        username: app.globalData.account,
        password: app.globalData.password
      },
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
// 获取选课信息
export function getCourseMessage(aId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/course/findByAcademyService?aid=' + aId,
      method: 'POST',
      success(res) {
        resolve(res)
      },
      fail(res) {
        reject(err)
      }
    })
  })
}

// 获得未选课程信息
export function getNoSelectedCourseMessage() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/bx/' + app.globalData.account,
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail() {
        reject(err)
      }
    })
  })
}

//获取选课和补选的信息
export function getAllSelectedCourseMessage() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/Selected/' + app.globalData.account,
      method: 'GET',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//通过sId查找选课信息
export function findquerySelected(sid) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/Selected/findquerySelected',
      method: 'POST',
      data: {
        sid: sid
      },
      success(res) {
        resolve(res)
      }
    })
  })
}

//一次性提交选课信息
export function addSelectedJ(courses){
  return new Promise((resolve,reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/Selected/batch',
      method: 'POST',
      data: JSON.stringify(courses),
      success(res) {
        resolve(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  })
}

//一次性添加退课信息
export function addDeSelectedJ(ids){
  return new Promise((resolve,reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/delselected/batch',
      method: 'delete',
      data: ids,
      success(res) {
        resolve(res)
      },
      fail(res) {
        console.log(res)
      }
    })
  })
}

//一次性提交补选信息
export function addRepairSelectedJ(courses){
  return new Promise((resolve,reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/bx/batch',
      method: 'POST',
      data: JSON.stringify(courses),
      success(res) {  
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}
//删除选课信息
export function deleteSelected(id){
  return new Promise((resolve,reject) => {
    wx.request({
      url: app.globalData.yumin + '/xk/Selected/' + id,
      method: 'delete',
      success(res) {
        resolve(res)
      }
    })
  })
}

// export default {
//   getExam,
//   getScore,
//   getClass,
//   login,
//   getCourseMessage,
//   getNoSelectedCourseMessage,
//   getAllSelectedCourseMessage,
//   findquerySelected,
//   addDeSelectedJ,
//   addSelectedJ,
//   addRepairSelectedJ,
//   deleteSelected
// }