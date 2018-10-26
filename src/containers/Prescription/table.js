import React from 'react';
import styled from 'styled-components';
import { Icon, Button  } from 'antd';

const Wrapper = styled.div`
background-color: #fdfdfd;
padding: 10px;
 .action-group {
     background-color: #fff;
     .list-inline {
        margin-bottom: 0;
    }
    border: 1px solid #fafafa;
     li {
         padding: 10px 30px;
         cursor: pointer;
         margin-right: 0;
     }
     li + li {
        border-left: 1px solid #fafafa;
     }
     li i, li span {
         vertical-align: middle;
     }
     li i {
         margin-right: 5px;
     }
 }
`;

export default class TablePrescription extends React.PureComponent {
    render() {
        return (
           <Wrapper>
               <div className="action-group">
                    <ul className="list-inline">
                        <li className="list-inline-item">
                            <Icon type="delete" theme="outlined" />
                            <span className="text-uppercase">Delete</span>
                        </li>
                        <li className="list-inline-item">
                            <Icon type="delete" theme="outlined" />
                            <span className="text-uppercase">Delete</span>
                        </li>
                        <li className="list-inline-item">
                            <Icon type="delete" theme="outlined" />
                            <span className="text-uppercase">Delete</span>
                        </li>
                    </ul>
               </div>
           </Wrapper>
        );
    }
}