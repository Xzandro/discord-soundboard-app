import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import ButtonCategory from '../components/ButtonCategory';
import CustomButton from '../components/Button';

import { requestApi } from '../api';

class Buttons extends React.Component {
  constructor() {
    super();
    this.state = { entries: [], categories: [], user: {} };
  }

  componentDidMount() {
    this.refresh();
  }

  update(entries) {
    this.setState({ entries });
  }

  updateUser(user) {
    this.setState({ user });
  }

  refresh() {
    const promises = [requestApi('/buttons', 'get'), requestApi('/categories', 'get'), requestApi('/user', 'get')];
    Promise.all(promises).then(data => {
      const [buttons, categories, user] = data;
      this.setState({ entries: buttons, categories, user });
    });
  }

  mapButtonsToCategory() {
    const categories = {};
    this.state.categories.forEach(category => {
      categories[category._id] = category;
      categories[category._id].buttons = [];
    });
    this.state.entries.forEach(entry => {
      if (entry.category && categories[entry.category._id]) {
        categories[entry.category._id].buttons.push(entry);
      }
    });

    return categories;
  }

  render() {
    const { entries, user } = this.state;
    const categoryData = this.mapButtonsToCategory();
    const uncategorized = { name: 'Uncategorized', buttons: entries.filter(entry => !entry.category) };
    const favorites = { name: 'Your Favorites', buttons: entries.filter(entry => user && user.favorites.includes(entry._id)) };
    let colorIndex = 0;
    return (
      <div>
        <ButtonCategory category={favorites} user={user} update={this.update.bind(this)} updateUser={this.updateUser.bind(this)} attached="top" />
        {Object.entries(categoryData).map(([key, value], i) => {
          return (
            <ButtonCategory
              key={key}
              category={value}
              user={user}
              update={this.update.bind(this)}
              updateUser={this.updateUser.bind(this)}
              attached={true}
            />
          );
        })}
        <ButtonCategory
          category={uncategorized}
          user={user}
          update={this.update.bind(this)}
          updateUser={this.updateUser.bind(this)}
          attached={true}
        />
        <Header as="h5" attached>
          Actions
        </Header>
        <Segment attached="bottom">
          <Button basic key={'refresh'} onClick={this.refresh.bind(this)}>
            Refresh
          </Button>
        </Segment>
      </div>
    );
  }
}

module.exports = Buttons;
