const express = require('express')
const request = require('request-promise')
const app = express()
const PORT = process.env.PORT || 4000
/*
    npm install express --save
    npm install request --save
    npm install request-promise --save
*/
const HEADERS = {
    'accept':'applicetion/json',
    'authority': 'c.y.qq.com',
    'referer': 'htttp://m.y.qq.com/',
    'origin': 'https://m.y.qq.com',
    'user-agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3 like Mac OS X) AppleWebKit/602.1.50 (KHTML, like Gecko) CriOS/56.0.2924.75 Mobile/14E5239e Safari/602.1'
}

app.get('/',async (req,res)=>{
    const url = `https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=${+ new Date()}`
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS 
        }))
    }catch(e){
        res.json({error:e.message})
    }
})
app.get('/search',async (req,res) => {
    const {keyword,page=1} = req.query
    const url=`https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=${encodeURIComponent(keyword)}&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=${page}&remoteplace=txt.mqq.all&_=${+new Date()}`
    try{
        res.json(await request({
            uri: url,
            json: true,
            headers: HEADERS 
        }))
    }catch(e){
        res.json({error:e.message})
    }
})
app.listen(PORT)