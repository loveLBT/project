import path from 'path'

const config={
	wechat:{
		appId:"wxa854db2039300d2f",
		appSecret:"17fe9f0743ca5c5a6a658851870ac845",
		token:"lbt930525",
		accessFile:path.join(__dirname,'../wechat/access.txt'),
		prefix:'https://api.weixin.qq.com/cgi-bin/',
		api:{
			accessToken:'token?grant_type=client_credential',
			uploadMedia:'media/upload?'
		}
	}
}

export default config