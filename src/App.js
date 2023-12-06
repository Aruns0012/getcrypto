import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import { makeStyles } from '@material-ui/core';


function App() {

  const useStyles = makeStyles(() =>({
    App: {
        backgroundColor: '#14161a',
        color : 'white',
        minHeight: '100vh'
    }
  }));

  const classes = useStyles()

  return (
<div className={classes.App}>
      <Router>
      <Header/>
      <body>
        <Routes>
            <Route exact path='/' element={<Homepage/>}  />
            <Route exact path ='coin/:id' element={<Coinpage/>} /> 
        </Routes>
      </body>
      </Router>
    </div>
    );
}

export default App;
