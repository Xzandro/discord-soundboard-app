import React from 'react';

import { Header, List, Message, Segment } from 'semantic-ui-react';
import { requestApi } from '../api';
import LoggedOut from '../components/LoggedOut';

class Statistics extends React.Component {
  constructor() {
    super();
    this.state = { entries: [], categories: [], user: {} };
  }

  componentDidMount() {
    const promises = [requestApi('/buttons', 'get', { sort: '-played' }), requestApi('/categories', 'get'), requestApi('/user', 'get')];
    Promise.all(promises).then(data => {
      const [buttons, categories, user] = data;
      this.setState({ entries: buttons.data, categories: categories.data, user: user.data });
    });
  }

  render() {
    const { entries, user } = this.state;
    if (!user) {
      return <LoggedOut />;
    }
    return (
      <div>
        <Header as="h1">Statistics</Header>
        <Segment basic className="statistics">
          <List relaxed divided ordered>
            {entries.map((button, i) => {
              return (
                <List.Item key={button._id}>
                  <List.Icon name="music" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>{button.name}</List.Header>
                    <List.Description>
                      Played: {button.played} - Category: {button.category && button.category.name ? button.category.name : 'None'}
                    </List.Description>
                  </List.Content>
                </List.Item>
              );
            })}
          </List>
        </Segment>
      </div>
    );
  }
}

module.exports = Statistics;
