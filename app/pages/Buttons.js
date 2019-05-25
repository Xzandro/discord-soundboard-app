import React from 'react';
import { Button, Header, Segment } from 'semantic-ui-react';
import ButtonCategory from '../components/ButtonCategory';
import SoundSettings from '../components/SoundSettings';
import LoggedOut from '../components/LoggedOut';

import { requestApi } from '../api';

class Buttons extends React.Component {
  constructor() {
    super();
    this.state = { entries: [], categories: [], user: {}, soundSettingsModal: false, currentSoundData: {} };
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
      this.setState({ entries: buttons.data, categories: categories.data, user: user.data });
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

  toggleSoundSettingsModal(buttonID) {
    if (buttonID) {
      requestApi('/button', 'get', { file: buttonID }).then(button => {
        this.setState({ soundSettingsModal: true, currentSoundData: button.data });
      });
    } else {
      this.setState({ soundSettingsModal: !this.state.soundSettingsModal, currentSoundData: {} });
    }
  }

  render() {
    const { entries, user, soundSettingsModal, categories, currentSoundData } = this.state;
    if (!user) {
      return <LoggedOut />;
    }
    const categoryData = this.mapButtonsToCategory();
    const uncategorized = { name: 'Uncategorized', buttons: entries.filter(entry => !entry.category) };
    const favorites = { name: 'Your Favorites', buttons: entries.filter(entry => user && user.favorites.includes(entry._id)) };
    let colorIndex = 0;
    return (
      <div>
        <SoundSettings
          open={soundSettingsModal}
          toggleSoundSettingsModal={this.toggleSoundSettingsModal.bind(this)}
          settings={currentSoundData}
          categories={categories}
          refresh={this.refresh.bind(this)}
        />
        <ButtonCategory
          category={favorites}
          user={user}
          update={this.update.bind(this)}
          updateUser={this.updateUser.bind(this)}
          attached="top"
          toggleSoundSettingsModal={this.toggleSoundSettingsModal.bind(this)}
        />
        {Object.entries(categoryData).map(([key, value], i) => {
          return (
            <ButtonCategory
              key={key}
              category={value}
              user={user}
              update={this.update.bind(this)}
              updateUser={this.updateUser.bind(this)}
              attached={true}
              toggleSoundSettingsModal={this.toggleSoundSettingsModal.bind(this)}
            />
          );
        })}
        <ButtonCategory
          category={uncategorized}
          user={user}
          update={this.update.bind(this)}
          updateUser={this.updateUser.bind(this)}
          attached={true}
          toggleSoundSettingsModal={this.toggleSoundSettingsModal.bind(this)}
        />
        <Header as="h5" attached>
          Actions
        </Header>
        <Segment attached="bottom">
          <Button basic key={'add'} onClick={() => this.toggleSoundSettingsModal()}>
            Add
          </Button>
          <Button basic key={'refresh'} onClick={this.refresh.bind(this)}>
            Refresh
          </Button>
        </Segment>
      </div>
    );
  }
}

module.exports = Buttons;
