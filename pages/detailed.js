import React, { useState } from "react";
import Head from "next/head";
import axios from 'axios'
import { List, Affix, Row, Col, Icon, Breadcrumb } from "antd";
import ReactMarkdown from "react-markdown";
import MarkNav from "markdown-navbar";
import "markdown-navbar/dist/navbar.css";

import Header from "../components/Header";
import Author from "../components/Author";
import Advert from "../components/Advert";
import Footer from "../components/Footer";
import "../public/style/pages/detailed.css";
const Detailed = () => {
  let markdown =
    "# P01:课程介绍和环境搭建\n" +
    "[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n" +
    "> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n" +
    "**这是加粗的文字**\n\n" +
    "*这是倾斜的文字*`\n\n" +
    "***这是斜体加粗的文字***\n\n" +
    "~~这是加删除线的文字~~ \n\n" +
    "`console.log(111)` \n\n" +
    "# p02:来个Hello World 初始Vue3.0\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n" +
    "***\n\n\n" +
    "# p03:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p04:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# 5 p05:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p06:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "# p07:Vue3.0基础知识讲解\n" +
    "> aaaaaaaaa\n" +
    ">> bbbbbbbbb\n" +
    ">>> cccccccccc\n\n" +
    "``` var a=11; ```";

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
            <h2 className="center">react 实战教程 小菜鸟(第10集)</h2>
          </div>
          <div className="list-icon center">
            <span>
              <Icon type="calendar" /> 2019-12-21
            </span>
            <span>
              <Icon type="folder" /> 视频教程
            </span>
            <span>
              <Icon type="fire" /> 5021人
            </span>
          </div>
          <div className="detailed-context">
            <ReactMarkdown source={markdown} escapeHtml={false} />
          </div>
        </Col>
        <Col className="comm-right" xs={5} sm={5} md={5} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
            <div className="nac-title">文章目录</div>
            <MarkNav
              className="article-menu"
              source={markdown}
              ordered={false}
            />
          </div>
          </Affix>
        </Col>
      </Row>
      {/* <style jsx>{`
    `}</style> */}
      <Footer />
    </div>
  );
}

Detailed.getInitialProps = async(context)=>{
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve)=>{
    axios('http://127.0.0.7002/default/getArticleById/'+id).then(
      (res)=>{
        console.log(title)
        resolve(res.data.data[0])
      }
    )
  })
  return promise
}


export default Detailed;
