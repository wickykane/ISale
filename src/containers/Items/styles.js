import styled from "styled-components";

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
        color: #0084c5;
      }
    }
    li + li {
      border-left: 1px solid #f4f4f4;
    }
    li i,
    li span {
      vertical-align: middle;
    }
    li i {
      margin-right: 5px;
    }
  }
`;

export default Wrapper;
