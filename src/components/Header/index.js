import React from 'react';
import './header.css';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from '../../containers/Home/selector';
import { connect } from 'react-redux';

export  class Header extends React.Component {
    render() {
        return (
            <section>
                this is 1 header. Welcome {this.props.user}
            </section>
        );
    }
}

export default connect(
    createStructuredSelector({
        user: makeSelectUser(),
    }),
)(Header);

