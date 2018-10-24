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

const { Content } = Layout;

export class PrescriptionPage extends React.PureComponent {

    render() {
        return (
            <Layout>
            <Content style={{ background: '#fff', padding: 10, margin: 0, minHeight: 280 }}>
                <h5 className="header-title">Prescription</h5>
                <FilterWrap>
                   <form className="form filter-form">
                            <div className="form-group">
                                <label>Code</label>
                                <Input className="mr-2 form-control"/>
                            </div>
                            <div className="form-group">
                                <label>Name</label>
                                <Input className="mr-2 form-control "/>
                            </div>        
                   </form>
                   <div className="actionGroup text-right">
                        <Button className="mr-1" type="primary">Search</Button>
                        <Button>Reset</Button>
                   </div>
                </FilterWrap>
                
            </Content>
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