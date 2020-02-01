import React from 'react';
import { Menu } from 'antd';
import { Router, Route, Switch } from "react-router";
import { Link } from 'react-router-dom'; 
import routes from './const/router';
import { createBrowserHistory } from "history";
import './App.css';

const history = createBrowserHistory();

const App: React.FC = () => {
  return (
    <Router history={history}>
      <div className="App">
          <Menu
            theme="dark"
            style={{ width: 256 }}
            mode="inline"
          >
            {routes.map((item, index) => {
              const {menuProps, link} = item;
              if (menuProps && link) {
                const { title } = menuProps;
                return (
                  <Menu.Item key={index}>
                    <Link {...link}>
                      {title}
                    </Link>
                  </Menu.Item>
                )
              }
            })}
          </Menu>
          <div className="Route-Content" >
              <Switch>
                {routes.map((item, index) => {
                  return <Route {...item.routeProps} key={index} ></Route>
                })}
              </Switch>
          </div>
      </div>
    </Router>
  );
}

export default App;
