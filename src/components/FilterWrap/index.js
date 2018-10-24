import React from 'react';
import styled from 'styled-components';

const FilterWrap = styled.div`
padding: 10px 5px;
padding-right: 150px;
position: relative;

.actionGroup {
    position: absolute;
    top: 40px;
    right: 10px;
}

.filter-form {
    .form-group {
        display: inline-block;
    }
    input {
        width: 125px;
        height: 30px;
        border-radius: 0;
    }
}

`;
 export default FilterWrap;