import React from "react";
import { withState, withHandlers, compose } from "recompose";
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

import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js";

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const DrawerContainer = compose(
  withState("attributes", "setAttributes", []),
  withState("currentTab", "setCurrentTab", "1"),
  withState("editor", "setEditor", EditorState.createEmpty()),
  withState("fileList", "setFileList", []),
  withState("reviewList", "setReviewList", []),
  withState("unitList", "setUnitList", [])
);

const CreateDrawer = props => {
  const {
    attributes,
    setAttributes,
    fileList,
    setFileList,
    reviewList,
    setReviewList,
    unitList,
    setUnitList,
    editor,
    setEditor,
    currentTab,
    setCurrentTab,
    form,
    page
  } = props;

  /**
   * DRAWER HANDLING
   */

  const closeDrawer = () => {
    form.resetFields();
    setAttributes([]);
    setFileList([]);
    setReviewList([]);
    setUnitList([]);
    setCurrentTab("1");
    setEditor(EditorState.createEmpty());
    props.actionPageData("current", null);
  };

  /**
   * FORM DATA AND VALIDATION
   */

  const onSubmit = e => {
    e.preventDefault();
    form.validateFields((err, value) => {
      if (!err) {
        console.log(value);
      }
    });
  };

  function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => {
      if(Array.isArray(field)) {
        return field.some( item => field[item]);
      }
      return fieldsError[field];
    });
  }

  /**
   * UPLOAD IMAGE HANDLING
   */

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  const handleRemove = e => {
    const newFileList = [...fileList].filter(item => item.uid != e.uid);
    const newReviewList = [...reviewList].filter(item => item.uid != e.uid);
    setFileList(newFileList);
    setReviewList(newReviewList);
  };

  const handleChange = e => {
    if (!e.file.status) {
      getBase64(e.file, url => {
        const newFileList = [...fileList, e.file];
        const newReviewList = [
          ...reviewList,
          {
            uid: e.file.uid,
            url
          }
        ];
        setFileList(newFileList);
        setReviewList(newReviewList);
      });
    }
  };

  /**
   * ATTRIBUE HANDLING
   */

  const addAttribute = () => {
    const newAttribute = [...attributes];
    newAttribute.push({ id: attributes.length });
    setAttributes(newAttribute);
  };

  const removeAtribute = id => {
    const newAttribute = [...attributes];
    const index = newAttribute.findIndex(item => item.id == id);
    newAttribute[index].deleted = true;
    setAttributes(newAttribute);
  };

  /**
   * UNIT HANDLING
   */

  const addUnit = () => {
    const newList = [...unitList];
    newList.push({ id: newList.length });
    setUnitList(newList);
  };

  /**
   * EDITOR HANDLING
   */

  const changeEditor = editor => {
    setEditor(editor);
  };

  const removeUnit = id => {
    const newList = [...unitList];
    const index = newList.findIndex(item => item.id == id);
    newList[index].deleted = true;
    setUnitList(newList);
  };

  /**
   * RENDER HTML HANDLING
   */

  function render() {
    const { getFieldDecorator, getFieldsError } = form;

    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 }
    };

    const validAttribute = attributes.filter(i => !i.deleted);
    const validUnit = unitList.filter(i => !i.deleted);

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Chọn ảnh</div>
      </div>
    );

    const informationTab = (
      <div>
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
                onChange={handleChange}
                showUploadList={{ showPreviewIcon: false }}
                onRemove={handleRemove}
              >
                {uploadButton}
              </Upload>
            </div>
          </Col>
          <Col md={24}>
            <Collapse defaultActiveKey={["1"]}>
              <Collapse.Panel header="Theo dõi thuộc tính" key="1">
                {validAttribute.length > 0 ? (
                  <table className="table-value">
                    <thead>
                      <tr>
                        <th>Thuộc tính</th>
                        <th>Giá trị</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {validAttribute.map((item, index) => (
                        <tr key={item.id}>
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
                              {getFieldDecorator(
                                "attributes[" + item.id + "].value",
                                {}
                              )(<Input placeholder="Nhập giá trị và enter" />)}
                            </FormItem>
                          </td>
                          <td>
                            <a
                              onClick={() => removeAtribute(item.id)}
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
                <Button onClick={addAttribute} icon="plus">
                  Thêm thuộc tính
                </Button>
              </Collapse.Panel>
            </Collapse>
          </Col>
          <Col md={24}>
            <Collapse className="mt-3" defaultActiveKey={["1"]}>
              <Collapse.Panel header="Đơn vị tính" key="1">
                <FormItem label="Đơn vị cơ bản">
                  {getFieldDecorator("uom")(<Input className="col-md-2" />)}
                </FormItem>
                {validUnit.length > 0 ? (
                  <table className="table-value">
                    <thead>
                      <tr>
                        <th>Tên đơn vị</th>
                        <th>Giá trị quy đổi</th>
                        <th>Giá bán</th>
                        <th>Mã hàng hóa</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      {validUnit.map((item, index) => (
                        <tr key={item.id}>
                          <td>
                            <FormItem>
                              {getFieldDecorator(
                                "units[" + item.id + "].name",
                                {}
                              )(<Input placeholder="" />)}
                            </FormItem>
                          </td>
                          <td>
                            <FormItem>
                              {getFieldDecorator(
                                "attributes[" + item.id + "].value",
                                {
                                  initialValue: 1
                                }
                              )(<InputNumber />)}
                            </FormItem>
                          </td>
                          <td>
                            <FormItem>
                              {getFieldDecorator(
                                "attributes[" + item.id + "].price",
                                {
                                  initialValue: 0
                                }
                              )(<InputNumber />)}
                            </FormItem>
                          </td>
                          <td>
                            <FormItem>
                              {getFieldDecorator(
                                "attributes[" + item.id + "].code"
                              )(<Input placeholder="Mã hàng tự động" />)}
                            </FormItem>
                          </td>
                          <td>
                            <a
                              onClick={() => removeUnit(item.id)}
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
                <Button className="mt-2" onClick={addUnit} icon="plus">
                  Thêm đơn vị tính
                </Button>
              </Collapse.Panel>
            </Collapse>
          </Col>
        </Row>
      </div>
    );

    const detailTab = (
      <div>
        <Row>
          <div className="card">
            <div className="card-header">Định mức tồn</div>
            <div className="pt-3">
              <Col md={12} className="pl-3 pr-3">
                <FormItem {...formItemLayout} label="Ít nhất">
                  {getFieldDecorator("min_qty")(<Input placeholder="" />)}
                </FormItem>
              </Col>
              <Col md={12} className="pl-3 pr-3">
                <FormItem {...formItemLayout} label="Nhiều nhất">
                  {getFieldDecorator("max_qty")(<Input placeholder="" />)}
                </FormItem>
              </Col>
            </div>
          </div>
        </Row>
        <Row>
          <div className="card mt-3">
            <div className="card-header">Mô tả</div>
            <div className="pt-3">
              <Col md={24} className="pl-3 pr-3">
                <Editor
                  editorState={editor}
                  editorClassName="item-editor"
                  onEditorStateChange={changeEditor}
                />
              </Col>
            </div>
          </div>
        </Row>
      </div>
    );

    /**
     * Main render
     */

    const page_Data = {
      title: {
        items: "Thêm hàng hóa",
        service: "Thêm dịch vụ",
        combo: "Thêm Combo"
      }
    };

    return (
      <Drawer
        width={"100%"}
        destroyOnClose={true}
        onClose={closeDrawer}
        visible={["items", "service", "combo"].indexOf(page.current) != -1}
        title={page_Data.title[page.current]}
      >
        <Form layout="horizontal" onSubmit={onSubmit}>
          <Tabs onChange={tab => setCurrentTab(tab)} activeKey={currentTab}>
            <TabPane tab="Thông tin" key="1">
              {informationTab}
            </TabPane>
            <TabPane tab="Mô tả chi tiết" key="2">
              {detailTab}
            </TabPane>
            <TabPane tab="Thành phần" key="3" />
          </Tabs>
          <FormItem className="text-center mt-3">
            <Button
              disabled={hasErrors(getFieldsError())}
              type="primary"
              htmlType="submit"
            >
              Save
            </Button>
            <Button className="ml-2" onClick={closeDrawer}>
              Cancel
            </Button>
          </FormItem>
        </Form>
      </Drawer>
    );
  }

  return render();
};
const ItemsCreateComponent = DrawerContainer(Form.create()(CreateDrawer));
export default ItemsCreateComponent;
