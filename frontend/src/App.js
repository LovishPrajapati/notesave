import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Dashboard from "./screens/Dashboard";
import Profile from "./screens/Profile";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
	return (
		<Router>
			<Header />
			<main>
				<Switch>
					<Route exact path="/" component={Login}></Route>
					<Route exact path="/signup" component={Signup}></Route>
					<Route exact path="/dashboard/:id" component={Dashboard}></Route>
					<Route
						exact
						path="/dashboard/:id/profile"
						component={Profile}
					></Route>
				</Switch>
			</main>

			<Footer />
		</Router>
	);
}

export default App;
