import React from 'react';
import HomePage from '../Home/loadable';
import ContactPage from '../Contact/loadable';

import { Switch, Route } from 'react-router-dom';

import HeaderLayout from '../../components/Header';
import FooterLayout from '../../components/Footer';
import SlideLayout from '../../components/Slide';

import { Layout} from 'antd';

const App = () => (
    <Layout style={{ minHeight: '100vh' }}>
        <HeaderLayout></HeaderLayout>
        <Layout>
           <SlideLayout></SlideLayout>
            <Layout>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/contact" component={ContactPage} />
                </Switch>
            </Layout>
        </Layout>
       
        <FooterLayout></FooterLayout>
    </Layout>

);
export default App;