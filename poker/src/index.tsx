import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import { SocketProvider } from './socketContext';
import 'normalize.css';
import './index.scss';

ReactDOM.render(
  <Provider store={store}>
    <SocketProvider>
      <Router>
        <App />
      </Router>
    </SocketProvider>
  </Provider>,
  document.getElementById('root'),
);
