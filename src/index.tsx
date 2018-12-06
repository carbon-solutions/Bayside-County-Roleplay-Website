import * as React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route/*, Redirect*/ } from 'react-router-dom';

import './styles/normalize.css';
import './styles/main.scss';
import './styles/common.scss';

import DiscordSession from './components/discord_session';

import Layout from './components/layout';
import Home from './pages/home';
import Whitelist from './pages/whitelist';
import Rules from './pages/rules';
import DiscordLogin from './pages/discord_login';
import WlRequests from './pages/wl_requests';

render(//<Redirect to="/" />
    <BrowserRouter>
    	<Layout>
    		<Route path="/" exact component={Home} />
    		
    		<Route path='/login_result' component={DiscordLogin} />
    		<Route path='/wl' component={Whitelist} />
    		<Route path='/rules' component={Rules} />
    		<Route path='/wl_requests' component={WlRequests} />
    	</Layout>
  	</BrowserRouter>,
    document.getElementById('page'),
);

DiscordSession.restoreSession().then(res => {
	console.log('session:', res);
}).catch(e => console.error(e));