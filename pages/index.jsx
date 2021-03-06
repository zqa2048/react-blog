import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link"
import axios from "axios";
import { List, Row, Col, Icon } from "antd";
import Header from "../components/Header";
import "../public/style/pages/index.css";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import servicePath from '../config/apiUrl'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const Home = myList => {
  console.log("myList", myList);
  const [list, setList] = useState(myList.data);
  const renderer = new marked.Renderer();
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }

  }); 
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row type="flex" justify="center" className="comm-main">
        <Col className="comm-left" xs={18} sm={18} md={18} lg={18} xl={14}>
          <List
            header={<div>最新数据</div>}
            itemLayout="vertical"
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detailed',query:{id:item.id}}}  >
                  <a>{item.title}</a>
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
export default Home;

Home.getInitialProps = async () => {
  const promise = new Promise(resolve => {
    // http://127.0.0.1:7001/default/getArticleList
    axios(servicePath.getArticleList).then(res => {
      resolve(res.data);
      // console.log('远程获取数据结果:',res.data.data)
    }).catch(err=>console.log(err));
  });
  return await promise;
};
