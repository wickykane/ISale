import React from 'react';
import styled from 'styled-components';
import { Icon, Button  } from 'antd';

const Wrapper = styled.div`
    padding: 15px 30px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #fafafa;
    .block-action {
        flex: 0 0 1; 
        margin-right: 50px;
        text-align: center;
        color: #7F969F;
        cursor: pointer;
        transition: all 0.5s ease-in-out;
        &:hover {
            color: #0084C5;
        }
    }
`;

export default class ActionTop extends React.PureComponent {
    render() {
        return (
           <Wrapper>
                <div className="block-action">
                    <Icon style={{ fontSize: '30px', marginBottom: '10px'}} type="file-add" theme="outlined" />
                    <p className="text-uppercase">Add Prescription</p>
                </div>
                <div className="block-action">
                    <Icon style={{ fontSize: '30px', marginBottom: '10px'}} type="user-add" theme="outlined" />
                    <p className="text-uppercase">Add Customer</p>
                </div>
           </Wrapper>
        );
    }
}