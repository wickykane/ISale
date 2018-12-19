import React from 'react';
import styled from 'styled-components';

const WrapInline = styled.div`
    display: inline-block;
    > * {
        display: inline-block;
        vertical-align: middle;
    }
    span {
        margin-left: 5px;
    }
`;
 export default WrapInline;