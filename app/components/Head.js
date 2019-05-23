import React from 'react';

import { Menu, Button, Input, Select } from 'semantic-ui-react';

const { ipcRenderer, remote } = require('electron');

class Head extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Menu className="main-menu" fixed="top">
        <Menu.Item position="right">
          <Button content="Refresh" icon="refresh" labelPosition="right" />
        </Menu.Item>
      </Menu>
    );
  }
}

module.exports = Head;
