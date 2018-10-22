import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { Layout, Menu, Icon } from 'antd';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom'

const { SubMenu } = Menu;
const { Sider } = Layout;



export class SideLayout extends React.Component {
    render() {
        const { location } = this.props;

        const StyledSider = styled(Sider)`
        .ant-menu {
            height: calc(100% - 50px);
        }
        `;
        return ( 
            <StyledSider breakpoint={'lg'} width={200} style={{ background: '#fff' }}>
                <div className="text-center">
                    <Link to="/">
                        <img alt="logo" src="assets/images/logo.png" height="50"/>     
                    </Link>
                </div>
                <Menu theme="light"   selectedKeys={[location.pathname]} defaultSelectedKeys={['1']} mode="inline">
                    <Menu.Item key="/">
                        <Link to="/">
                            <Icon type="pie-chart" />
                            <span>
                                Overview
                            </span>
                        </Link>
                    </Menu.Item>
                    <Menu.Item key="/prescription">
                        <Link to="/prescription">
                            <Icon type="snippets" theme="outlined" />
                            <span>
                                Prescription                    
                            </span>
                        </Link>    
                    </Menu.Item>
                    <SubMenu nkey="sub1" title={<span><Icon type="user" /><span>User</span></span>}>
                        <Menu.Item key="3">Tom</Menu.Item>
                        <Menu.Item key="4">Bill</Menu.Item>
                        <Menu.Item key="5">Alex</Menu.Item>
                    </SubMenu>
                </Menu>
            </StyledSider>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return {
      
    };
}

export default withRouter(connect(
    mapDispatchToProps
)(SideLayout));