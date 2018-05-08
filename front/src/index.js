import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

if(process && process.env && process.env.NODE_ENV === "development"){
    //开发环境
    require('./dev_config');
}else{
    require('./prod_config');
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
