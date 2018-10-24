import React from 'react';
import HeaderLayout from '../../components/Header';
import OverviewPage from '../Overview/loadable';
import PrescriptionPage from '../Prescription/loadable';

import { Layout, Tabs} from 'antd';

const TabPane = Tabs.TabPane;
const { Content } = Layout;

const App = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Layout>
            <HeaderLayout></HeaderLayout>          
            <Content style={ {background: '#fff'}}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="Overview" key="1">
                        <OverviewPage></OverviewPage>
                    </TabPane>
                    <TabPane tab="Prescription" key="2">
                        <PrescriptionPage></PrescriptionPage>
                    </TabPane>
                </Tabs>
            </Content>
        </Layout>
    </Layout>
);
export default App;