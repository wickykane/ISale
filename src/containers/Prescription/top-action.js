import React from 'react';
import styled from 'styled-components';
import { Icon, Button  } from 'antd';

const Wrapper = styled.div`
    padding: 15px 30px;
    background-color: #fff;
    display: flex;
    border-bottom: 1px solid #f4f4f4;
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
    constructor(props) {
        super(props);
        this.addCustomer = this.addCustomer.bind(this);
        this.addPrescription = this.addPrescription.bind(this);
    }

    addPrescription() {
        this.props.actionPageData('current', 'prescription');
    }

    addCustomer() {
        this.props.actionPageData('current', 'customer');
    }

    render() {
        return (
           <Wrapper>
                <div onClick={ this.addPrescription } className="block-action">
                    <Icon style={{ fontSize: '30px', marginBottom: '10px'}} type="file-add" theme="outlined" />
                    <p className="text-uppercase">Add Prescription</p>
                </div>
                <div onClick={ this.addCustomer } className="block-action">
                    <Icon style={{ fontSize: '30px', marginBottom: '10px'}} type="user-add" theme="outlined" />
                    <p className="text-uppercase">Add Customer</p>
                </div>
           </Wrapper>
        );
    }
}