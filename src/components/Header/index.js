import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import { push } from 'react-router-redux';

import { Layout, Menu, Avatar, Dropdown } from 'antd';
const { Header } = Layout;

const StyledHeader = styled(Header)`
background-color: #00B0D9;
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

export class HeaderLayout extends React.Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        localStorage.removeItem('app_token');
        this.props.dispatch(push('/login'));
    }

      
    render() {
        const menu = (
            <Menu onClick={this.handleMenuClick}>
                <Menu.Item key="profile">
                    My Profile
                </Menu.Item>
                <Menu.Item  onClick={ () => this.logOut() } key="logout">
                    Logout
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


export default connect()(HeaderLayout);