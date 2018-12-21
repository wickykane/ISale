import React from "react";
import {
  Form,
  Button,
  Input,
  Drawer,
  Row,
  Col,
  AutoComplete,
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
  /**
   * INIT STATE DATA
   */

  constructor(props) {
    super(props);
    this.state = {
      fileList: [],
      reviewList: [],
      attributes: []
    };
  }

  /**
   * DRAWER HANDLING
   */

  closeDrawer = () => {
    this.props.form.resetFields();
    this.props.actionPageData("current", null);
  };

  /**
   * FORM DATA AND VALIDATION
   */

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
      }
    });
  };

  hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  }

  /**
   * UPLOAD IMAGE HANDLING
   */

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

  /**
   * ATTRIBUE HANDLING
   */

  addAttribute = () => {
    let attributes = [...this.state.attributes];
    attributes.push({});
    this.setState({
      ...this.state,
      attributes
    });
  };

  removeAtribute = index => {
    console.log(this.props.form.getFieldsValue());

    let attributes = [...this.props.form.getFieldsValue().attributes];
    attributes.splice(index, 1);

    this.setState({
      ...this.state,
      attributes
    });
  };

  /**
   * RENDER HTML HANDLING
   */

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
                  {getFieldDecorator("avaiable_qty", { initialValue: 0 })(
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
              <Collapse.Panel header="Theo dõi thuộc tính" key="1">
                {this.state.attributes.length > 0 ? (
                  <table className="table-value">
                    <thead>
                      <tr>
                        <th>Thuộc tính</th>
                        <th>Giá trị</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      { this.state.attributes.map((item, index) => (
                        <tr key={index}>
                          <td>
                            <Select defaultValue="lucy" style={{ width: 200 }}>
                              <Select.OptGroup label="Chọn thuộc tính ...">
                                <Option value="jack">Jack</Option>
                                <Option value="lucy">Lucy</Option>
                              </Select.OptGroup>
                              <Option value="Yiminghe">
                                Tạo thuộc tính mới
                              </Option>
                            </Select>
                          </td>
                          <td>
                            <FormItem>
                              {getFieldDecorator("attributes["+ index + "].value", {
                              })(
                                <Input placeholder="Nhập giá trị và enter" />
                              )}
                            </FormItem>
                          </td>
                          <td>
                            <a
                              onClick={() => this.removeAtribute(index)}
                              href="javascrip:void(0)"
                            >
                              <Icon type="close" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  ""
                )}
                <Button onClick={this.addAttribute} icon="plus">
                  Thêm thuộc tính
                </Button>
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

    /**
     * Main render
     */

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
