import './App.css';
//import {Router} from 'react-router-dom';
//import {BrowserRouter} from 'react-router-dom';
import {BrowserRouter, Route, Switch } from 'react-router-dom';
import landingPage from './components/landingPage';
import Home from './components/home'
import createDog from './components/createDog';
import detail from './components/detail';

export default function App() {
  return (
    <div className="App">
    <BrowserRouter>
    <Switch>
        <Route exact path='/' component={landingPage}/>
        <Route exact path = '/home' component={Home}/>
        <Route exact path='/dogs' component={createDog}/>
        <Route exact path='home/:id' component={detail}/>
    </Switch>
    
    </BrowserRouter>
    </div>
  );
}

