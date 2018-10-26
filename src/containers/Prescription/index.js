import React from 'react';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selector';
import { connect } from 'react-redux';
import { compose } from 'redux';

import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

import { changeUser } from './action';


import { Layout, Input, Button  } from 'antd';

// Component
import FilterWrap from '../../components/FilterWrap'
import ActionTop from './top-action';
import TablePrescription from './table';


const { Content } = Layout;

export class PrescriptionPage extends React.PureComponent {

    render() {
        return (
            <Layout>
                <ActionTop></ActionTop>       
                <TablePrescription></TablePrescription>
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

const withReducer = injectReducer({ key: 'prescription', reducer });

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(PrescriptionPage)