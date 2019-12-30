import React, { useState } from "react";
import Head from "next/head";
import axios from 'axios'
import { List, Affix, Row, Col, Icon, Breadcrumb } from "antd";
import Tocify from '../components/tocify.tsx'
import "markdown-navbar/dist/navbar.css";
import marked from 'marked'
import hljs from 'highlight.js'
import  'highlight.js/styles/monokai-sublime.css'
import servicePath from '../config/apiUrl'

import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../public/style/pages/detailed.css";
const Detailed = (props) => {
  const [list, setList] = useState(props)
  const renderer = new marked.Renderer()
  const tocify = new Tocify()
  renderer.heading = function(text,level,raw){
    const anchor = tocify.add(text,level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  }
  marked.setOptions({
    renderer:renderer,  //这个是必填的，你可以通过自定义的renderer渲染出自定义的格式
    gfm:true, //启动类似github样式的markdown的解析方法，
    pedantic:false, //true只解析符合markdown定义的内容，false可以增加容错率
    sanitize:false, //原始输出，忽略HTML标签，这个建议开发人员填false
    tables:true, //支持github形式的表格，必须打开gfm
    breaks:false, //支持github换行符，必须打开gfm
    smartLists:true, //优化列表输出，这个填true之后，你的样式会好看很多
    highlight:function(code){
      return hljs.highlightAuto(code).value      //高亮显示规则，这里我们用插件highlight.js来完成
    }
  })
  let markdown = marked(list.article_content)

  return (
    <div>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={18} sm={18} md={18} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>视频教程</Breadcrumb.Item>
              <Breadcrumb.Item>xxxx</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <div>
            <h2 className="center">{list.title}</h2>
          </div>
          <div className="list-icon center">
            <span>
              <Icon type="calendar" /> {list.addTime}
            </span>
            <span>
              <Icon type="folder" /> {list.typeName}
            </span>
            <span>
              <Icon type="fire" /> {list.view_count}人
            </span>
          </div>
          <div className="detailed-context"
            dangerouslySetInnerHTML={{__html:markdown}}
          >

          </div>
        </Col>
        <Col className="comm-right" xs={5} sm={5} md={5} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
            <div className="nac-title">文章目录</div>
            {/* <MarkNav
              className="article-menu"
              source={markdown}
              ordered={false}
            /> */}
            <div className="toc-list">
              {tocify && tocify.render()}
            </div>
          </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
}

Detailed.getInitialProps = async(context)=>{
  
  let id = context.query.id
  console.log(id)
  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleById+id).then(
      (res)=>{
        console.log(res.data.data[0])
        resolve(res.data.data[0])
      }
    )
  })
  console.log(promise)
  return promise
}


export default Detailed;
