import React from 'react';
import { Form, Button, Input, Drawer } from 'antd';

const FormItem = Form.Item;

class  CreateDrawer extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    /**
     * DRAWER FUNCTION HANDLING
     */

    closeDrawer = () => {
        this.props.form.resetFields();
        this.props.actionPageData('current', null);
    }

    /**
     * FORM DATA AND FUNCTION HANDLING 
     */

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, value) => {
            if(!err) {
                console.log(value);
            }
        });
    }

   
    hasErrors(fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
    }
    
    
    /**
     * RENDER HTML HANDLING
     */

     render() {
        const { getFieldDecorator, getFieldsError } =this. props.form;
        return (
            <Drawer onClose={ this.closeDrawer } visible={ this.props.page.current == 'customer'} title="Create Customer">
              <Form onSubmit={ this.onSubmit}>
                <FormItem label='Customer Name'>
                    {
                        getFieldDecorator('name', { 
                        rules: [
                            {
                                required: true,
                                message: 'Required'
                            }
                        ]  
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label='Email'>
                    {
                        getFieldDecorator('email', { 
                            rules: [
                                {
                                   pattern: '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$',
                                    message: 'Invalid Email'
                                }
                            ]  
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem label='Phone'>
                    {
                        getFieldDecorator('phone', { 
                        rules: [{
                                required: true,
                                message: 'Required'
                            }, {
                                pattern: '[0-9]+',
                                message: 'Invalid Phone Number'
                            }
                        ]  
                        })(
                            <Input />
                        )
                    }
                </FormItem>
                <FormItem className='text-center'>
                    <Button disabled={this.hasErrors(getFieldsError())} type='primary' htmlType='submit'>Save</Button>
                </FormItem>
              </Form>
            </Drawer>
        );
     }
  
}
const CusomerCreateComponent = Form.create()(CreateDrawer);
export default CusomerCreateComponent;
