import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import rpc from 'rage-rpc'
import EventManager from 'utils/eventManager';

import 'styles/global.scss'
import 'styles/fonts.scss'

const root = ReactDOM.createRoot(
  document.getElementById( 'root' ) as HTMLElement
);

const parseObject = ( obj: any ) => {
  try {
    return JSON.parse( obj );
  } catch ( e ) {
    return obj;
  }
};

const isDev: boolean = process.env.NODE_ENV === 'development';

if ( isDev ) {
  //@ts-ignore
  if ( !window.mp ) {
    //@ts-ignore
    window.mp = {
      trigger: ( ...args: any[] ) => { },
      events: {
        add: ( ...args: any[] ) => { },
      },
    };
  }
}

//@ts-ignore
window.callHandler = ( event: string, ...args: any[] ) => {
  const parsedArgs = args.map( arg => parseObject( arg ) );

  EventManager.callHandler( event, ...parsedArgs );
};

rpc.register( 'cef::eventManager', ( event: string, ...args: any[] ) => {
  const parsedArgs = args.map( arg => parseObject( arg ) );
  EventManager.callHandler( event, ...parsedArgs );
} );

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
