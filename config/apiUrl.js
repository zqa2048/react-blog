let ipUrl = 'http://127.0.0.1:7001/default/'

let servicePath = {
    getArticleList:ipUrl + 'getArticleList', //首页文章接口列表
    getArticleById:ipUrl + 'getArticleById/', //文章详细页内容接口，需要接受参数哦
    getTypeInfo:ipUrl + 'getTypeInfo', //得到类别名称和编号
    getListById:ipUrl + 'getListById/', //根据类别ID获取文章
    
}
export default servicePath;