import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

export class FooterLayout extends React.Component {
    render() {
        const Footer = styled.div`
            line-height: 50px;
            background-color: #111;
            color: #fff;
        `;

        return ( 
          <Footer>
              <div className="text-center">Power by wickykane</div>
          </Footer>
        );
    }
}

export default connect(
)(FooterLayout);