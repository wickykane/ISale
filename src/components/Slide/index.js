import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';

const { SubMenu } = Menu;
const { Sider } = Layout;

export class SliderLayout extends React.Component {
    render() {
        return ( 
            <Sider breakpoint={'lg'} width={200} style={{ background: '#fff' }}>
                <Menu theme="light" defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="1">
                    <Icon type="pie-chart" />
                    <span>
                        <Link to="/contact">Contact</Link>
                    </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                    <Icon type="desktop" />
                    <span>Option 2</span>
                    </Menu.Item>
                    <SubMenu
                    key="sub1"
                    title={<span><Icon type="user" /><span>User</span></span>}
                    >
                    <Menu.Item key="3">Tom</Menu.Item>
                    <Menu.Item key="4">Bill</Menu.Item>
                    <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                    <SubMenu
                    key="sub2"
                    title={<span><Icon type="team" /><span>Team</span></span>}
                    >
                    <Menu.Item key="6">Team 1</Menu.Item>
                    <Menu.Item key="8">Team 2</Menu.Item>
                    </SubMenu>
                    <Menu.Item key="9">
                    <Icon type="file" />
                    <span>File</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default connect(
)(SliderLayout);