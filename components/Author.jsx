import {Avatar, Divider} from 'antd'
import "../public/style/components/author.css";
const Author = () => {
    return (
        <div className="author-div comm-box">
            <div><Avatar size="100" src="https://pic4.zhimg.com/v2-f21682fea24d52bf75e2ed3797fe2ab8_xl.jpg"/></div>
            <div className="author-introduction">
                菜鸟小周的学习经历,搭建一个React Hooks + Next + Egg.js 为基础的博客管理系统
                <Divider>社交帐号</Divider>
                <Avatar size={28} icon="github" />
                <Avatar size={28} icon="qq" />
                <Avatar size={28} icon="wechat" />
            </div>
        </div>
    )
}
export default Author