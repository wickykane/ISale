import React from 'react';
import styled from 'styled-components';
import './header.css';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../../containers/Home/selector';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { Layout, Menu, Avatar, Dropdown } from 'antd';
const { Header } = Layout;

export class HeaderLayout extends React.Component {
    render() {
        const StyledHeader = styled(Header)`
        background-color: #ffffff7d;
        line-height: 55px;
        height: 55px;
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
                margin-top: -15px !important;
            }
        }
        `;
        const menu = (
            <Menu>
                <Menu.Item>
                    <a href="#">My Profile</a>
                </Menu.Item>
                <Menu.Item>
                    <a href="#">Logout</a>
                </Menu.Item>
            </Menu>
        );
        return ( 
            <StyledHeader> 
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