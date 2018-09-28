import api from '../../api/index'
import ajax from '../../api/ajax'

const app = getApp()

Page({
  data: {
    currentMonth: 0,
    total: 0,
    userList: [
      // {
      //   user_head: 'http://img1.3lian.com/2015/w7/85/d/101.jpg',
      //   user_name: '测试',
      //   user_sex: 1,
      //   look_time: '13:55'
      // }
    ]
  },
  onLoad: function() {
    // ajax({
    //   url: api.lookLog,
    //   method: 'POST',
    //   data: {
    //     master_user_token: app.globalData.token
    //   },
    //   success: res => {
    //     console.log(res.data.data)
    //     this.setData({
    //       userList: res.data.data.today_look_list,
    //       total: res.data.data.total_look_num,
    //       currentMonth: res.data.data.month_look_num
    //     })
    //   }
    // })
  }
})
