import React, { useState, useEffect } from "react";
import Head from "next/head";
import { List, Row, Col, Icon, Breadcrumb } from "antd";
import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";


import servicePath from '../config/apiUrl'
import Link from 'next/link'
import axios from 'axios'
//列表 markdown 解析
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const MyList = (lists) => {
  // console.log(list.data)
  const [list, setList] = useState(lists.data)
  useEffect(() => {
    setList(lists.data)
  })
  const renderer = new marked.Renderer();
  
  marked.setOptions({
    renderer:renderer,
    gfm:true,
    pedantic:false,
    sanitize:false,
    tables:true,
    breaks:true,
    smartLists:true,
    smartypants:true,
    highlight:function(code){
      return hljs.highlightAuto(code).value;
    }
  })
  return (
    <div>
      <Head>
        <title>MyList</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={18} sm={18} md={18} lg={18} xl={14}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">首页</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>最新数据</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List
            header={<div>最新数据</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                  <div className="list-title">
                    <Link href={{pathname:'/detailed',query:{id:item.id}}}>
                      {item.title}
                    </Link>
                  </div>
               
                <div className="list-icon">
                  <span>
                    <Icon type="calendar" /> {item.addTime}
                  </span>
                  <span>
                    <Icon type="folder" /> {item.typeName}
                  </span>
                  <span>
                    <Icon type="fire" /> {item.view_count}人
                  </span>
                </div>
                {/* <div className="list-context">{item.context}</div> */}
                 <div className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                 >
                 </div>
              </List.Item>
            )}
          />
        </Col>
        <Col className="comm-right" xs={5} sm={5} md={5} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>

      {/* <style jsx>{`
    `}</style> */}
      <Footer />
    </div>
  );
};

MyList.getInitialProps = async (context)=>{
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios(servicePath.getListById + id).then(
      (res)=>{resolve(res.data);console.log(res.data)}
    ).catch(e=>console.log('根据id获取文章失败:',e))
  })
  return await promise
};


export default MyList;
