// pages/one/one.js
//index.js
import request from "../../common/noBaseRequest";
const WxParse = require("../../wxParse/wxParse.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    todayArticle: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 获取影片列表
    this.getTodayArticle()
      .then(res => {
        this.setData({
          todayArticle: { ...res.data }
        });

        const article = this.data.todayArticle.content;
        const that = this;
        WxParse.wxParse("article", "html", article, that, 5);
      })
      .catch(err => {
        console.log(err);
      });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {},

  /**
   * 获取今日文章
   */
  getTodayArticle: function() {
    return new Promise((resolve, reject) => {
      request
        .get(`https://interface.meiriyiwen.com/article/today`, { dev: 1 })
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }
});
