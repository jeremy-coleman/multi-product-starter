import { Provider } from 'mobx-react';
import React from 'react';
import ReactDOM from 'react-dom';

import { CogliteApp } from './App';
import { store, Store } from './stores';

ReactDOM.render(
  <Provider {...store as Store}>
    <CogliteApp/>
  </Provider>,
document.querySelector('#root') as HTMLElement);
