import React from 'react';
import HeaderLayout from '../../components/Header';
import FooterLayout from '../../components/Footer';
import SideLayout from '../../components/Menu';
import RouteConfig from './route';

import { Layout} from 'antd';

const App = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <Layout>
            <SideLayout></SideLayout>
            <Layout>
                <HeaderLayout></HeaderLayout>          
                <Layout>
                  <RouteConfig></RouteConfig>
                </Layout>
            </Layout>
        </Layout>
        <FooterLayout></FooterLayout>
    </Layout>

);
export default App;