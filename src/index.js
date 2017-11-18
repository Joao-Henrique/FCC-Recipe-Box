import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import './styles/App.css';
import './styles/footer.css';
import App from './js/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <App/>, document.getElementById('root'));
registerServiceWorker();
