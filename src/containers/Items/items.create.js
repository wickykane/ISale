import React from "react";
import styled from "styled-components";
import debounce from "lodash/debounce";
import moment from "moment";
import {
  Form,
  Button,
  Input,
  Drawer,
  Row,
  Col,
  AutoComplete,
  DatePicker,
  Upload,
  Modal,
  Icon,
  Tabs,
  Select,
  InputNumber,
  Collapse
} from "antd";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class CreateDrawer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: false,
      fileList: [],
      reviewList: []
    };
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
      }
    });
  };

  closeDrawer = () => {
    this.props.form.resetFields();
    this.props.actionPageData("current", null);
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  // Image Handle

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleRemove = e => {
    const { fileList, reviewList } = this.state;
    const newFileList = [...fileList].filter(item => item.uid != e.uid);
    const newReviewList = [...reviewList].filter(item => item.uid != e.uid);
    this.setState({
      ...this.state,
      fileList: newFileList,
      reviewList: newReviewList
    });
  };

  handleChange = e => {
    if (!e.file.status) {
      this.getBase64(e.file, url => {
        const { fileList, reviewList } = this.state;
        const newFileList = [...fileList, e.file];
        const newReviewList = [
          ...reviewList,
          {
            uid: e.file.uid,
            url
          }
        ];
        this.setState({
          ...this.state,
          fileList: newFileList,
          reviewList: newReviewList
        });
      });
    }
  };

  render() {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const { reviewList } = this.state;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Chọn ảnh</div>
      </div>
    );

    const informationTab = (
      <Form layout="horizontal" onSubmit={this.onSubmit}>
        <Row>
          <Col md={8}>
            <Row>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Mã hàng hóa">
                  {getFieldDecorator("code")(
                    <Input placeholder="Mã hàng tự động" />
                  )}
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Tên hàng">
                  {getFieldDecorator("name", {
                    rules: [
                      {
                        required: true,
                        message: "Bắt buộc"
                      }
                    ]
                  })(<Input />)}
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Nhóm hàng">
                  {getFieldDecorator("parent", {
                    initialValue: ""
                  })(
                    <Select
                      style={{
                        width: "calc(100% - 40px)",
                        verticalAlign: "middle"
                      }}
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="">--Lựa chọn--</Option>
                      <Option value="jack">Jack</Option>
                      <Option value="lucy">Lucy</Option>
                      <Option value="tom">Tom</Option>
                    </Select>
                  )}
                  <Button
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginLeft: "5px"
                    }}
                  >
                    <Icon
                      style={{ marginLeft: "-6px", verticalAlign: "inherit" }}
                      type="plus"
                    />
                  </Button>
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Giá vốn">
                  {getFieldDecorator("cost_price", { initialValue: 0 })(
                    <InputNumber min={0} />
                  )}
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Giá bán">
                  {getFieldDecorator("sale_price", { initialValue: 0 })(
                    <InputNumber min={0} />
                  )}
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Tồn kho">
                  {getFieldDecorator("sale_price", { initialValue: 0 })(
                    <InputNumber min={0} />
                  )}
                </FormItem>
              </Col>
              <Col md={24}>
                <FormItem {...formItemLayout} label="Vị trí">
                  {getFieldDecorator("location", {
                    initialValue: ""
                  })(
                    <AutoComplete
                      style={{
                        width: "calc(100% - 40px)",
                        verticalAlign: "middle"
                      }}
                    />
                  )}
                  <Button
                    style={{
                      width: "20px",
                      verticalAlign: "middle",
                      marginLeft: "5px"
                    }}
                  >
                    <Icon
                      style={{ marginLeft: "-6px", verticalAlign: "inherit" }}
                      type="plus"
                    />
                  </Button>
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col md={12}>
            <div className="clearfix pl-3 pr-3">
              <Upload
                beforeUpload={() => false}
                listType="picture-card"
                fileList={reviewList}
                onChange={this.handleChange}
                showUploadList={{ showPreviewIcon: false }}
                onRemove={this.handleRemove}
              >
                {uploadButton}
              </Upload>
            </div>
          </Col>
          <Col md={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="This is panel header 1" key="1">
                    this is text
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
        <FormItem className="text-center">
          <Button
            disabled={this.hasErrors(getFieldsError())}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button className="ml-2" onClick={this.closeDrawer}>
            Cancel
          </Button>
        </FormItem>
      </Form>
    );

    return (
      <Drawer
        width={"100%"}
        onClose={this.closeDrawer}
        visible={this.props.page.current == "items"}
        title="Thêm hàng hóa"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="Thông tin" key="1">
            {informationTab}
          </TabPane>
          <TabPane tab="Mô tả chi tiết" key="2" />
          <TabPane tab="Thành phần" key="3" />
        </Tabs>
      </Drawer>
    );
  }
}
const ItemsCreateComponent = Form.create()(CreateDrawer);
export default ItemsCreateComponent;
