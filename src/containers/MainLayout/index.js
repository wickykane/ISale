import React from 'react';
import HeaderLayout from '../../components/Header';
import OverviewPage from '../Overview/loadable';
import PrescriptionPage from '../Prescription/loadable';
import styled from 'styled-components';
import { parse } from 'query-string';
import { Layout, Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const { Content } = Layout;

const WrapperTabPane = styled(Tabs)`
    .ant-tabs-ink-bar {
        display: none !important;
    }
    .ant-tabs-bar {
        border-color: #fafafa;
    }
    .ant-tabs-nav-wrap {
        margin-bottom: 0px;
    }
    .ant-tabs-nav .ant-tabs-tab {
        padding: 20px 50px;
        border-bottom: 1px solid #fafafa;
        margin: 0;
        &-active {
            border-top: 5px solid #0084C5;
            background-color: #fff;
            border-right: 1px solid #fafafa;
            border-left: 1px solid #fafafa;
            border-bottom-color: #fff;
        }
    }
`;

const App = (props) => {
    const current = (parse(props.location.search) || {}).tab;
    return (
    <Layout style={{ minHeight: '100vh' }}>
        <Layout>
            <HeaderLayout></HeaderLayout>          
            <Content style={ {background: '#fff'}}>
                <WrapperTabPane defaultActiveKey={ current || '1'}>
                    <TabPane tab="Overview" key="1">
                        <OverviewPage></OverviewPage>
                    </TabPane>
                    <TabPane tab="Prescription" key="2">
                        <PrescriptionPage></PrescriptionPage>
                    </TabPane>
                </WrapperTabPane>
            </Content>
        </Layout>
    </Layout>
)};
export default App;