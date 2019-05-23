import React from 'react';

import { Button, Checkbox, Grid, Header, Input, Form, Icon, Popup, Segment } from 'semantic-ui-react';
import SettingsItem from '../components/SettingsItem';

const { remote } = require('electron');
let config = remote.getGlobal('config');

class Settings extends React.Component {
  render() {
    return (
      <div>
        <Header as="h1">Settings</Header>
        <Header as="h4" attached="top">
          App
        </Header>
        <Segment attached>
          <Form>
            <SettingsItem section="App" setting="clientID" Input={<Input />} />
            <SettingsItem section="App" setting="token" Input={<Input />} />
          </Form>
        </Segment>
      </div>
    );
  }
}

module.exports = Settings;
