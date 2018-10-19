import React from 'react';
import styled from 'styled-components';
import './header.css';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../../containers/Home/selector';
import { connect } from 'react-redux';

import { Layout, Menu, Avatar, Dropdown } from 'antd';
const { Header } = Layout;

export class HeaderLayout extends React.Component {
    render() {
        const StyledHeader = styled(Header)`
        background-color: #fff;
        .logo {
            display: inline-block;
        }
        .menu-header {
            display: inline-block;
            float: right;
        }
        .anticon {
            font-size: 20px !important;
            svg {
                margin-top: -12px !important;
            }
        }
        `;
        const menu = (
            <Menu>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
                </Menu.Item>
                <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
                </Menu.Item>
            </Menu>
        );
        return ( 
            <StyledHeader> 
                <div className="logo">
                    <a href="#">
                        <img alt="logo" src="assets/images/logo.png" height="50"/>                    
                    </a>
                </div>
                <div className="menu-header">
                    <Dropdown trigger={['click']} overlay={menu} placement="bottomCenter">
                        <Avatar  size="large" icon="user" />
                    </Dropdown>
                </div>
            </StyledHeader>
        );
    }
}

export default connect(
    createStructuredSelector({
        user: makeSelectUser(),
    }),
)(HeaderLayout);