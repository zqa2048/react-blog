import React,{useState, useEffect} from "react";
import "../public/style/components/header.css";
import { Row, Col, Menu, Icon } from "antd";
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'

const Header = () => {
  //得到列表的状态信息
  const [navArray, setNavArray] = useState([])
  useEffect(() => {
    const fetchData = async ()=>{
      const result = await axios(servicePath.getTypeInfo).then(
        (res)=>{
          // console.log('1111111',res.data)
          setNavArray(res.data.data)
          return res.data.data
        }
      ).catch((err)=>console.log(err))
      
      // setNavArray(result)
      // console.log('result',result)
    }
    fetchData()
    return () => {
      // console.log('type request ok !',navArray)
    };
  }, [])
  //跳转到列表页
  const handleClick = (e)=>{
    console.log('e',e)
    if(e.key==0){
      Router.push('/index')
    }else{
      Router.push('/list?id='+e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={15} lg={15} xl={15}>
          <span className="header-logo">
            <Link href={{pathname:'/index'}}>
              <a>小菜鸟</a>
            </Link>
          </span>
          <span className="header-text">专注前端开发,每年kan100集视频.</span>
        </Col>
        <Col className="menu-div" xs={0} sm={0} md={9} lg={8} xl={6}>
          <Menu mode="horizontal"
            onClick={handleClick}
          >
            <Menu.Item key="0">
              <Icon type="home" />
              首页
            </Menu.Item>
            {
              navArray.map((item)=>{
                return (
                  <Menu.Item key={item.id}>
                    <Icon type={item.icon}/>
                    {item.typeName}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Col>
      </Row>
    </div>
)
};
export default Header;
