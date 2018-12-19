import React from 'react';
import styled from 'styled-components';
import { Form, Button, Icon, Checkbox , Input , InputNumber, Pagination, Drawer, Menu, Dropdown } from 'antd';
import PerfectScrollbar from 'react-perfect-scrollbar';

const Wrapper = styled.div`
background-color: #fdfdfd;
padding: 10px;
.list-inline-item {
    .anticon {
        font-size: 14px !important;
    }
}
 .action-search {
    padding: 10px 50px;
    background-color: #fff;
    border: 1px solid #f4f4f4;
    border-top: 0;
    .anticon {
        font-size: 18px;
    }
    input {
        width: calc(100% - 25px);
        margin-left: 5px;
        border: none;
        box-shadow: none !important;
    }
 }
 .action-group {
     background-color: #fff;
     .list-inline {
        margin-bottom: 0;
    }
    border: 1px solid #f4f4f4;
     li {
         padding: 10px 30px;
         cursor: pointer;
         margin-right: 0;
         transition: all 0.5s ease-in-out;
         &:hover {
            color: #0084C5;
        }
     }
     li + li {
        border-left: 1px solid #f4f4f4;
     }
     li i, li span {
         vertical-align: middle;
     }
     li i {
         margin-right: 5px;
     }
 }
`;

export default class TableItems extends React.PureComponent {
    selectRow = (e, index) => {
            this.props.page.list[index].checked = e.target.checked;
            this.props.actionPageData('list', this.props.page.list);
    }

    onClickAddItems = (e) => {
        this.props.actionPageData('current', e.key);
    }

    render() {
        const rows = (this.props.page.list || []).map((item, index) => {
            return (
                <tr key={'row-'+ index}>
                    <td className="text-center" style={{ width: '50px'}}>
                        <Checkbox onChange={ (e) => this.selectRow(e, index) } checked={item.checked}></Checkbox>
                    </td>
                    <td>{ item.id }</td>
                    <td>{ item.code }}</td>
                    <td>{ item.name }</td>
                </tr>
            );
        })

        const addItemMenu = (
                <Menu onClick={(e) => this.onClickAddItems(e)}>
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
                                <a className="ant-dropdown-link" href="#">
                                <Icon type="plus"/>
                                <span className='text-uppercase'>Thêm mới </span>
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
                     <Input placeholder="Search..."/>   
               </div>
               <div className="table-container">
                    <div className="fixed-table-container">
                        <div className="header-table"></div>
                        <PerfectScrollbar>
                        <div className="body-table">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="th-inner">
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-inner">
                                                Code
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-inner">
                                                Name
                                            </div>
                                        </th>
                                        <th>
                                            <div className="th-inner">
                                                Customer
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                   { rows }
                                </tbody>
                            </table>
                        </div>
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