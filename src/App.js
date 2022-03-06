import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Home from "./Components/Home";
import AddTodo from "./Components/AddTodo";
import { AuthenticationProvider } from "./Contexts/useAuthContext";

function App() {
  return (
    <div className='App'>
      <Router>
        <AuthenticationProvider>
          <Switch>
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/home' component={Home} />
            <Route exact path='/add' component={AddTodo} />
          </Switch>
        </AuthenticationProvider>
      </Router>
    </div>
  );
}

export default App;
