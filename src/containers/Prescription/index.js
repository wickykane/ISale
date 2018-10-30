import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// Selector
import { createStructuredSelector } from 'reselect';
import { makeSelectPageData } from './selector';

// Reducer
import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

// Action
import { fnListPrescription } from './action';

// Component
import { Layout, Input, Button  } from 'antd';
import FilterWrap from '../../components/FilterWrap'
import ActionTop from './top-action';
import TablePrescription from './table';


const { Content } = Layout;

export class PrescriptionPage extends React.PureComponent {
    componentWillMount() {
        this.props.getListPrescription();
    }

    render() {
        return (
            <Layout>
                <ActionTop  {...this.props}></ActionTop>       
                <TablePrescription  {...this.props}></TablePrescription>
            </Layout>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    page: makeSelectPageData(),
})

export function mapDispatchToProps(dispatch) {
    return {
        getListPrescription: () => dispatch(fnListPrescription()),
    };
}

const withReducer = injectReducer({ key: 'prescription', reducer });

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(PrescriptionPage)