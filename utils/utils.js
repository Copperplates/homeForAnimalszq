/**
 * 图片上传方法
 * @param {String} url上传图片接口的地址
 * @param {object} filePath要上传的文件对象
 * @param {String} fileType上传文件类型,可选image、video、audio
 */
export const upload = (filePath, fileType) => {

  return new Promise((resolve, reject) => {
    uni.showLoading({
      title: '上传中...'
    })
    uni.uploadFile({
      url: '填写你的服务器上传接口地址',
      filePath,
      name: 'file',
      fileType,
      success: (res) => {
        let data = JSON.parse(res.data)
        console.log(data)
        uni.hideLoading()
        if (data.code == 200) {
          uni.showToast({
            title: '上传成功'
          })
        } else {
          uni.showToast({
            title: '上传失败',
            icon: "error"
          })
        }
        resolve(data)
      },
      fail: (err) => {
        uni.hideLoading()
        reject(err)
      }
    });
  })
}