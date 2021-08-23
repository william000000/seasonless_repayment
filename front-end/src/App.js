import './App.css';
import '../node_modules/react-toastify/scss/main.scss';
import { BrowserRouter as Router,  Route, Switch } from 'react-router-dom';
import { RepaymentUploadView } from './views/RepaymentUploadView';
import { NavWithRouter } from './components/NavBar';
import { ToastContainer } from 'react-toastify';
import { CustomerSummaryView } from './views/CustomerSummariesView';


function App() {
  return (
    <div className="App">
      <Router>
        <NavWithRouter />
        <Switch>
          
          <Route path='/payment' exact component={RepaymentUploadView} />
          <Route path='/:id?' component={CustomerSummaryView} />
          
        </Switch>

        <ToastContainer position="bottom-center"
          autoClose={9000}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss 
          draggable
          pauseOnHover 
      />
      </Router>
    </div>
  );
}

export default App;
