// pages/posts/detail/detail.js
import regeneratorRuntime from '../../../libs/regenerator-runtime'
import { api } from '../../../util/index'

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.listenMusic()
    this.getData(options.id)
  },
  getData: async function (id) {
    const res = await api.get('http://rap2api.taobao.org/app/mock/11766//article/' + id)

    this.setData(res.data.data)
  },
  listenMusic:function(){
    wx.onBackgroundAudioPlay(()=>{
      this.setData({
        musicPlayState:true
      })
    })
    wx.onBackgroundAudioPause(()=>{
      this.setData({
        musicPlayState: false
      })
    })
    wx.onBackgroundAudioStop(()=>{
      this.setData({
        musicPlayState: false
      })
    })
  },
  onThumbsUp: function () {
    const thumbsUpState = this.data.thumbsUpState
    if (!thumbsUpState) {
      wx.showToast({
        title: '已收藏'
      })
    }
    this.setData({
      thumbsUpState: !thumbsUpState
    })
  },
  onComment: function () {
    const itemList = [
      '分享到微信好友',
      '分享到朋友圈',
      '分享到QQ',
      '分享到微博'
    ]

    wx.showActionSheet({
      itemList: itemList,
      itemColor: '#405f80',
      success: function (res) {
        console.log(res)
      }
    })
  },
  onMusicPlay:function(){
    var musicPlayState=this.data.musicPlayState
    if (musicPlayState){
      wx.pauseBackgroundAudio()
      musicPlayState = false
    }else{
      wx.playBackgroundAudio({
        dataUrl: 'http://ws.stream.qqmusic.qq.com/M500001VfvsJ21xFqb.mp3?guid=ffffffff82def4af4b12b3cd9337d5e7&uin=346897220&vkey=6292F51E1E384E06DCBDC9AB7C49FD713D632D313AC4858BACB8DDD29067D3C601481D36E62053BF8DFEAF74C0A5CCFADD6471160CAF3E6A&fromtag=46',
        title: '此时此刻-jellal',
        coverImgUrl: 'http://y.gtimg.cn/music/photo_new/T002R300x300M000003rsKF44GyaSk.jpg?max_age=2592000',
        success: function (res) {
          console.log(res)
        }
      })
      musicPlayState=true
    }
    this.setData({ musicPlayState})
  }
})