// pages/posts/posts.js
import regeneratorRuntime from '../../libs/regenerator-runtime'
import { api } from '../../util/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
      'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    articles:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getList()
  },

  getList: async function () {
    const res = await api.get('http://rap2api.taobao.org/app/mock/11766//articles')
   
    this.setData({
      articles:res.data.list
    })

    console.log(res.data.list[0])
  },
  onPostTap: function (e) {
    const id = e.currentTarget.id
    wx.navigateTo({
      url: 'detail/detail?id='+id,
    })
  } 
 
})