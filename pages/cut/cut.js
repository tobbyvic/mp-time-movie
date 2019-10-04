// pages/cut/cut.js
import WeCropper from "../../we-cropper/we-cropper.js";
// aliyun
const uploadImage = require("../../utils/uploadFile.js");
// timeStamp
const util = require('../../utils/util.js');

const app = getApp();

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    cropperOpt: {
      id: "cropper",
      targetId: "targetCropper",
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      boundStyle: {
        color: "#04b00f",
        mask: "rgba(0,0,0,0.8)",
        lineWidth: 1
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    const { cropperOpt } = this.data;

    cropperOpt.boundStyle.color = "#04b00f";

    this.setData({
      cropperOpt
    });

    this.cropper = new WeCropper(cropperOpt)
      .on("ready", ctx => {
        console.log(`wecropper is ready for work!`);
      })
      .on("beforeImageLoad", ctx => {
        wx.showToast({
          title: "上传中",
          icon: "loading",
          duration: 20000
        });
      })
      .on("imageLoad", ctx => {
        wx.hideToast();
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
   * 插件通过touchStart、touchMove、touchEnd方法来接收事件对象
   */
  touchStart(e) {
    this.cropper.touchStart(e);
  },
  touchMove(e) {
    this.cropper.touchMove(e);
  },
  touchEnd(e) {
    this.cropper.touchEnd(e);
  },
  getCropperImage() {
    this.cropper
      .getCropperImage()
      .then(src => {
        console.log("裁剪后的图片", src);
        //显示消息提示框
        wx.showLoading({
          title: "上传中",
          mask: true
        });
        // wx.previewImage({
        //   current: '', // 当前显示图片的http链接
        //   urls: [src] // 需要预览的图片http链接列表
        // })
        app.globalData.currentImg = src;
        let nowTime = util.formatTime(new Date());
        //上传图片
        //你的域名下的/cbb文件下的/当前年月日文件下的/图片.png
        //图片路径可自行修改
        uploadImage(
          src,
          "face/" + nowTime + "/",
          function(result) {
            console.log("======上传成功图片地址为：", result);
            wx.hideLoading();
          },
          function(result) {
            console.log("======上传失败======", result);
            wx.hideLoading();
          }
        );
        wx.navigateBack();
      })
      .catch(err => {
        wx.showModal({
          title: "温馨提示",
          content: err.message
        });
      });
  },
  // 点击上传
  uploadTap() {
    const self = this;

    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ["compressed"], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0];
        //  获取裁剪图片资源后，给data添加src属性及其值

        self.cropper.pushOrign(src);
      }
    });
  }
});
