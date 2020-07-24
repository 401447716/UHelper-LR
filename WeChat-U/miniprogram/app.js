//app.js
App({
  globalData: {
    openid:'',
    nickname:'',
    account:'',
    password:'',
    name:'',
    class_name:'',
    res: null,
    examres: null,
    scoreres: null,
    url:'',
    yumin:'https://www.nishishei.xyz'
  },

  onLaunch() {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true
      })
    }
  }
})