import regeneratorRuntime from '../libs/regenerator-runtime'

class Api {
  options={
    url:'',
    method: 'GET',
    header:{
      'content-type': 'application/json'
    },
    dataType: 'json',
    responseType: 'text'
  }
  request = (options) => {
    const opts = Object.assign({}, this.options, options)
    if(!opts.url){
      console.log('没有异步请求地址')
      return false
    }
    if(!opts.data){
      delete opts.data
    }

    return new Promise((resolve,reject)=>{
      wx.request({
        ...opts,
        success: function (res) {
          resolve(res)
        },
        fail: function (res) {
          reject(res)
        }
      })
    })
  }
  get = async (url,data) => {
    const res = await this.request({ url,data})
    return res
  }
  post = (url,data) => {
    
  }
  put = (url,data) => {

  }
  dle = (url,data) => {

  }
}

export default Api