import React from 'react';
import { Menu } from 'antd';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
        <Menu
          theme="dark"
          style={{ width: 256 }}
          defaultOpenKeys={['sub1']}
          mode="inline"
        >
          <Menu.Item key="1">Option 1</Menu.Item>
        </Menu>
    </div>
  );
}

export default App;
