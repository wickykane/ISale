import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { Form, Button, Input, Drawer, Row, Col, AutoComplete, DatePicker, Icon } from 'antd';

const FormItem = Form.Item;
class  CreateDrawer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rxdetails: [] 
        }
    }
    componentWillMount() {
        console.log(1);
    }
    componentWillUnmount() {
        console.log(23)
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if(!err) {
                console.log(value);
            }
        });
    }

    closeDrawer = () => {
        this.props.form.resetFields();
        this.setState({ rxdetails: [] });
        this.props.actionPageData('current', null);
    }

    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    
    searchCustomer = debounce((value) => {
        console.log(value);
    }, 500)

    searchDiagnostic = debounce((value) => {
        console.log(value);
    }, 500)

    addDrug = () => {
        const list = [...this.state.rxdetails];
        list.push({ name: 'This is test'});
        this.setState({
            rxdetails: list
        })
        console.log(this.state);
    }

     render() {
        const { getFieldDecorator, getFieldsError } =this.props.form;
        const customerList =  [] ||   (this.props.page.list || [] ).map((item, index) => {
            return <AutoComplete.Option key={index}>{item.name}</AutoComplete.Option>;
        });

        const rxdetails = (this.state.rxdetails || []).map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.name}</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            )
        });
        return (
            <Drawer width={'85%'} onClose={ this.closeDrawer } visible={ this.props.page.current == 'prescription'} title="New Prescription">
              <Form onSubmit={ this.onSubmit}>
                <Row gutter={16}>
                    <Col md={8}>
                        <FormItem label='Diagnostics'>
                            {
                                getFieldDecorator('diagnostic')(
                                    <AutoComplete onSearch={this.searchDiagnostic} >
                                        {customerList}
                                    </AutoComplete>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col md={4}>
                        <FormItem label='Customer'>
                            {
                                getFieldDecorator('name')(
                                    <AutoComplete onSearch={this.searchCustomer} >
                                        {customerList}
                                    </AutoComplete>
                                )
                            }
                        </FormItem>
                    </Col>
                    <Col md={4}>
                        <FormItem label='Date'>
                            {
                                getFieldDecorator('create_date', { 
                                    initialValue: moment()
                                })(
                                    <DatePicker />
                                )
                            }
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col md={24}>
                        <h5>
                            RX Details
                        </h5>
                        <table className='table'>
                            <thead>
                                <tr>
                                    <th>Drug Name</th>
                                    <th>Quantity/Amount</th>
                                    <th>Frequency</th>
                                    <th>Unit Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                               { rxdetails }
                            </tbody>
                        </table>
                        <a onClick={ this.addDrug } href='javascript:void(0)'>
                            <Icon type="plus-square" theme="outlined" />
                            <span className='align-middle'> Add drug</span>
                        </a>
                    </Col>
                </Row>
               
                <FormItem className='text-center'>
                    <Button disabled={this.hasErrors(getFieldsError())} type='primary' htmlType='submit'>Save</Button>
                    <Button className='ml-2' onClick={this.closeDrawer}>Cancel</Button>                
                </FormItem>
              </Form>
          
            </Drawer>
        );
     }
  
}
const PrescriptionCreateComponent = Form.create()(CreateDrawer);
export default PrescriptionCreateComponent;
