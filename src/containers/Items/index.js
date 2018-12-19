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
import { fnListPrescription, actionPageData } from './action';

// Component
import { Layout } from 'antd';
import ActionTop from './top-action';
import TableItems from './table';
import CusomerCreateComponent from './customer.create';
import ItemsCreateComponent from './items.create';


export class ItemsPage extends React.PureComponent {
    componentWillMount() {
        this.props.getListPrescription();
    }

    render() {
        return (
            <Layout>
                <ActionTop  {...this.props}></ActionTop>       
                <TableItems  {...this.props}></TableItems>
                <CusomerCreateComponent {...this.props}></CusomerCreateComponent>
                <ItemsCreateComponent {...this.props}></ItemsCreateComponent>
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
        actionPageData: (key, data) => dispatch(actionPageData(key, data)),
    };
}

const withReducer = injectReducer({ key: 'prescription', reducer });

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(ItemsPage)