import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selector';
import { connect } from 'react-redux';
import { compose } from 'redux';

import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

import { changeUser } from './action';

import HeaderLayout from '../../components/Header';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export class OverviewPage extends React.PureComponent {
    render() {
        return (
                <div>This Overview Page</div>
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

const withReducer = injectReducer({ key: 'overview', reducer });

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(OverviewPage)