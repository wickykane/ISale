import React from "react";
import {
  Form,
  Button,
  Icon,
  Checkbox,
  Input,
  InputNumber,
  Pagination,
  Drawer,
  Menu,
  Dropdown
} from "antd";
import PerfectScrollbar from "react-perfect-scrollbar";
import Wrapper from "./styles";

export default class TableItems extends React.PureComponent {
  selectRow = (e, index) => {
    this.props.page.list[index].checked = e.target.checked;
    this.props.actionPageData("list", this.props.page.list);
  };

  onClickAddItems = e => {
    this.props.actionPageData("current", e.key);
  };

  render() {
    const rows = (this.props.page.list || []).map((item, index) => {
      return (
        <tr key={"row-" + index}>
          <td className="text-center" style={{ width: "50px" }}>
            <Checkbox
              onChange={e => this.selectRow(e, index)}
              checked={item.checked}
            />
          </td>
          <td>{item.id}</td>
          <td>{item.code}}</td>
          <td>{item.name}</td>
        </tr>
      );
    });

    const addItemMenu = (
      <Menu onClick={e => this.onClickAddItems(e)}>
        <Menu.Item key="items">Thêm hàng hóa</Menu.Item>
        <Menu.Item key="service">Thêm dịch vụ</Menu.Item>
        <Menu.Item key="combo">Thêm combo - đóng gói</Menu.Item>
      </Menu>
    );

    return (
      <Wrapper>
        <div className="action-group">
          <ul className="list-inline">
            <li className="list-inline-item">
              <Dropdown overlay={addItemMenu}>
                <a className="ant-dropdown-link" href="javascript:void(0)">
                  <Icon type="plus" />
                  <span className="text-uppercase">Thêm mới </span>
                </a>
              </Dropdown>
            </li>
            <li className="list-inline-item">
              <Icon type="eye" theme="outlined" />
              <span className="text-uppercase">View</span>
            </li>
            <li className="list-inline-item">
              <Icon type="edit" theme="outlined" />
              <span className="text-uppercase">Edit</span>
            </li>
            <li className="list-inline-item">
              <Icon type="delete" theme="outlined" />
              <span className="text-uppercase">Delete</span>
            </li>
          </ul>
        </div>
        <div className="action-search">
          <Icon type="search" theme="outlined" />
          <Input placeholder="Search..." />
        </div>
        <div className="table-container">
          <div className="fixed-table-container">
            <div className="header-table" />
            <PerfectScrollbar>
              <div className="body-table">
                <table className="table">
                  <thead>
                    <tr>
                      <th>
                        <div className="th-inner" />
                      </th>
                      <th>
                        <div className="th-inner">Mã hàng hóa</div>
                      </th>
                      <th>
                        <div className="th-inner">Tên hàng</div>
                      </th>
                      <th>
                        <div className="th-inner">Giá bán</div>
                      </th>
                      <th>
                        <div className="th-inner">Giá vốn</div>
                      </th>
                      <th>
                        <div className="th-inner">Tồn kho</div>
                      </th>
                      <th>
                        <div className="th-inner">Đặt NCC</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>{rows}</tbody>
                </table>
              </div>
              ``
            </PerfectScrollbar>
          </div>
          <div className="text-right m-3">
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </Wrapper>
    );
  }
}
