import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selector';
import { connect } from 'react-redux';
import { compose } from 'redux';

import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

import { changeUser } from './action';

import styled from 'styled-components';


import { Layout , Input, Icon, Button } from 'antd';
const { Content } = Layout;

const LoginContent = styled(Content)`
    background: #fafafa;
    font-size: 12px;
    padding: 10px;
    margin: 0;
    min-height: 100vh;
    .login-form {
        background-color: #fff;
        padding: 100px 50px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 10px;
        -webkit-box-shadow: 0px 0px 30px 1px rgba(99,99,99,1);
        -moz-box-shadow: 0px 0px 30px 1px rgba(99,99,99,1);
        box-shadow: 0px 0px 30px 1px rgba(99,99,99,1);
        .login-title {
            color: #4F6BF5;
            font-size: 14px;
            text-align: center;
            margin-bottom: 30px;
        }

        width: 300px;
        margin: 0 auto;
    }
`;

export class LoginPage extends React.PureComponent {
    render() {
        return (
            <Layout>
                <LoginContent>
                    <form className="login-form">
                        <h1 className="login-title">LOG - IN</h1>
                        <div className="mb-2">
                            <Input className="email" placeholder="Email" addonBefore={  (<Icon type="user" theme="outlined" />)} />
                        </div>
                        <div className="mb-2">
                            <Input type="password" className="password" placeholder="Password" addonBefore={ (<Icon type="lock" theme="outlined" />)} />
                        </div>
                        <div className="text-center mb-4">
                            <a style={{color: '#ccc'}} href="#">Forget Password?</a>
                        </div>
                        <div className="text-center">
                           <Button style={{color: '#fff', backgroundColor: '#4CD493', width: '100%', borderColor: '#4CD493'}} type="primary">Continue</Button>
                        </div>
                    </form>
                </LoginContent>
        </Layout>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
})

export function mapDispatchToProps(dispatch) {
    return {
        onUserChange: (e) => dispatch(changeUser(e.target.value)),
    };
}

const withReducer = injectReducer({ key: 'home', reducer });

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(LoginPage)