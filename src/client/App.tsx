import { inject, observer } from 'mobx-react';
import React from 'react';
import { Route, Router, Switch } from 'react-router-dom';
import { PasswordModal } from './components/PasswordModal';
import { Store } from './stores';
import {hot} from 'react-hot-loader/root'

import DevTools from 'mobx-react-devtools'


const CogliteAppBase = inject('nav')(observer((props: Store) => {
 return(
  <React.Fragment>
    <Router history={props.nav.history}>
      <Switch>
        <Route path="/" component={PasswordModal} />
      </Switch>
    </Router>
    <span style={{
      //display: 'none'
    }}>
    <DevTools position={{bottom: 0}}/></span>
  </React.Fragment>
 )}
))

export const CogliteApp = hot(CogliteAppBase)