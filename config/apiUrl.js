let ipUrl = 'http://127.0.0.1:7001/default'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList', //首页文章接口列表
    getArticleById:ipUrl + 'getArticleById/' //文章详细页内容接口，需要接受参数哦
}
export default servicePath;