import React,{Component} from "react";
import './App.css';
import { Switch, Route} from 'react-router-dom';
import { logout } from './services/userService'
import { checkAndGetUser } from './services/userCheckService'

import NavBar from './components/navbar';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Signup from './components/signup';
import Signin from './components/signin';
import MyPost from './components/my_posts';
import AddNewPost from './components/add_new_post';
import EditPost from './components/edit_post';
import Favorites from './components/favorites';


import ProtectedRoute from "./components/common/protectedRoute";

class App extends Component {

  state = {
    user: null
  };
  
  async componentDidMount(){
    const user = await checkAndGetUser();
    if (user) this.setState({user});    
  } 

  // if the state changes from react developer tools
  ch = 1;
  componentDidUpdate(){
    if (this.ch === 2) logout();
    this.ch++;
  }

  
  render(){
    const { user } = this.state;

    return (
      <div className="App">
        <header>
        <NavBar user={user} />
        </header>
        <main className="ming-900">
          <Switch>

            <ProtectedRoute path='/signup' component={Signup} />
            <ProtectedRoute path='/signin' component={Signin} />

            <ProtectedRoute path="/my-post" component={MyPost} />
            <ProtectedRoute path="/add-new-post" component={AddNewPost}  />
            <ProtectedRoute path="/edit-post" component={EditPost} />
            <ProtectedRoute path="/favorites" component={Favorites} />

            <Route path="/about" component={About} />
            
            <Route path="/" component={Home} />
            
          </Switch>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

export default App;
