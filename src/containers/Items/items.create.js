import React from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import moment from 'moment';
import { Form, Button, Input, Drawer, Row, Col, AutoComplete, DatePicker, Icon, Tabs, Select  } from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class  CreateDrawer extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            rxdetails: [] 
        }
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
        const formItemLayout = {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 },
          };

        const customerList =  [] ||   (this.props.page.list || [] ).map((item, index) => {
            return <AutoComplete.Option key={index}>{item.name}</AutoComplete.Option>;
        });

        const informationTab = (
            <Form layout='horizontal' onSubmit={ this.onSubmit}>
                <Row>
                    <Col md={6}>
                        <Row>
                            <Col md={24}>
                                <FormItem  {...formItemLayout} label='Mã hàng hóa'>
                                    {
                                        getFieldDecorator('code')(
                                            <Input placeholder='Mã hàng tự động'/>
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col md={24}>
                                <FormItem  {...formItemLayout} label='Tên hàng'>
                                    {
                                        getFieldDecorator('name', 
                                        { 
                                            rules: [
                                                {
                                                    required: true,
                                                    message: 'Required'
                                                }
                                            ]  
                                        }
                                        )(
                                            <Input />
                                        )
                                    }
                                </FormItem>
                            </Col>
                            <Col md={24}>
                                <FormItem  {...formItemLayout} label='Nhóm hàng'>
                                    {
                                        getFieldDecorator('parent', {
                                            initialValue: '',
                                        },
                                        )(
                                            <Select  style={ { width: 'calc(100% - 40px)', verticalAlign: 'middle' }} showSearch   optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }>
                                                <Option value="">--Lựa chọn--</Option>                                                
                                                <Option value="jack">Jack</Option>
                                                <Option value="lucy">Lucy</Option>
                                                <Option value="tom">Tom</Option>
                                            </Select>
                                        )
                                    }
                                    <Button style={ { width: '20px', verticalAlign: 'middle', marginLeft: '5px' }} >
                                        <Icon style={{ marginLeft: '-6px', verticalAlign: 'inherit'}} type="plus"/>
                                    </Button>
                                </FormItem>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={6}>
                    </Col>
                </Row>
               
                <FormItem className='text-center'>
                    <Button disabled={this.hasErrors(getFieldsError())} type='primary' htmlType='submit'>Save</Button>
                    <Button className='ml-2' onClick={this.closeDrawer}>Cancel</Button>                
                </FormItem>
              </Form>
        );

        return (
            <Drawer width={'100%'} onClose={ this.closeDrawer } visible={ this.props.page.current == 'items'} title="Thêm hàng hóa">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Thông tin" key="1">
                    {informationTab}
                </TabPane>
                <TabPane tab="Mô tả chi tiết" key="2"></TabPane>
                <TabPane tab="Thành phần" key="3"></TabPane>
              </Tabs>
            </Drawer>
        );
     }
  
}
const ItemsCreateComponent = Form.create()(CreateDrawer);
export default ItemsCreateComponent;
