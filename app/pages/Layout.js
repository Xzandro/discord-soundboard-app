import React from 'react';
import { withRouter } from 'react-router-dom';

import { Segment, Menu, Icon, Button } from 'semantic-ui-react';

const appVersion = require('electron').remote.app.getVersion();

class Layout extends React.Component {
  constructor() {
    super();
    this.state = { activeItem: 'buttons', compactMode: false };
    this.toggleCompactMode = this.toggleCompactMode.bind(this);
  }

  navigate(path, name) {
    this.props.history.push(path);
    this.setState({ activeItem: name });
  }

  navigateFromElement(e, element) {
    this.navigate(element['data-path'], element.name);
  }

  toggleCompactMode() {
    this.setState({ compactMode: !this.state.compactMode });
  }

  render() {
    return (
      <div>
        {this.state.compactMode ? null : (
          <Menu fixed="left" vertical inverted width="thin" className="side-menu">
            <Menu.Item name="buttons" link active={this.state.activeItem === 'buttons'} data-path="/" onClick={this.navigateFromElement.bind(this)}>
              <Icon name="home" />
              Buttons
            </Menu.Item>
            <Menu.Item
              name="statistics"
              link
              active={this.state.activeItem === 'statistics'}
              data-path="statistics"
              onClick={this.navigateFromElement.bind(this)}
            >
              <Icon name="chart bar" />
              Statistics
            </Menu.Item>
            <Menu.Item
              name="settings"
              link
              active={this.state.activeItem === 'settings'}
              data-path="settings"
              onClick={this.navigateFromElement.bind(this)}
            >
              <Icon name="settings" />
              Settings
            </Menu.Item>
            <span id="version">v{appVersion}</span>
          </Menu>
        )}

        <Segment basic className={this.state.compactMode ? 'compacted main-content' : 'main-content'}>
          <Button compact floated="right" icon={this.state.compactMode ? 'expand' : 'compress'} onClick={this.toggleCompactMode} />
          {this.props.children}
        </Segment>
      </div>
    );
  }
}

module.exports = withRouter(Layout);
