import React from 'react';
import Header from '../../components/Header';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from './selector';
import { connect } from 'react-redux';
import { compose } from 'redux';

import reducer from './reducer';
import injectReducer from '../../utils/injectReducer';

import { changeUser } from './action';
export class HomePage extends React.PureComponent {
    render() {
        return (
            <section>
                <Header></Header>
                <div>'this is home page'</div>
                <input onChange={this.props.onUserChange} defaultValue={this.props.user}   />
            </section>
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

export default compose(withReducer, connect(mapStateToProps, mapDispatchToProps))(HomePage)