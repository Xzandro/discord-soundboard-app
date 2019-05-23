import React from 'react';
import { requestApi } from '../api';

import { Button, Card, Popup } from 'semantic-ui-react';

class CustomButton extends React.Component {
  constructor() {
    super();
  }

  play(e, element) {
    requestApi('/play', 'get', { file: this.props.button._id }).then(buttons => {
      this.props.update(buttons);
    });
  }

  addFavorite(fileID) {
    requestApi('/user/favorites', 'post', { file: this.props.button._id }).then(user => {
      this.props.updateUser(user);
    });
  }

  removeFavorite(fileID) {
    requestApi('/user/favorites', 'delete', { file: this.props.button._id }).then(user => {
      this.props.updateUser(user);
    });
  }

  render() {
    const favorite = this.props.user && this.props.user.favorites.includes(this.props.button._id);
    return (
      <Popup
        trigger={
          <Button basic color={this.props.color} onClick={() => this.play()}>
            {this.props.button.name}
          </Button>
        }
        hoverable
        mouseEnterDelay={500}
      >
        <Card>
          <Card.Content>
            <Card.Header>{this.props.button.name}</Card.Header>
            <Card.Meta>{this.props.button.category && this.props.button.category.name ? this.props.button.category.name : 'No category'}</Card.Meta>
            <Card.Description>{this.props.button.description || 'No description'}</Card.Description>
          </Card.Content>
          <Button.Group fluid>
            <Button
              color="red"
              content="Play"
              icon="play"
              label={{ basic: true, color: 'red', pointing: 'left', content: this.props.button.played }}
              onClick={() => this.play()}
            />
            <Button
              color={favorite ? 'green' : 'blue'}
              content="Favorite"
              icon="favorite"
              onClick={() => (!favorite ? this.addFavorite() : this.removeFavorite())}
            />
          </Button.Group>
        </Card>
      </Popup>
    );
  }
}

module.exports = CustomButton;
