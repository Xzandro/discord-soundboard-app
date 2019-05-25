import React from 'react';
import { Header, Segment } from 'semantic-ui-react';
import CustomButton from './Button';

const colors = ['red', 'orange', 'yellow', 'olive', 'green', 'teal', 'blue', 'violet', 'purple', 'pink', 'brown', 'grey', 'black'];

class ButtonCategory extends React.Component {
  constructor() {
    super();
  }

  render() {
    let colorIndex = 0;
    if (this.props.category.buttons.length === 0 && this.props.category.name !== 'Your Favorites') return null;

    return (
      <React.Fragment>
        <Header as="h5" attached={this.props.attached}>
          {this.props.category.name}
        </Header>
        <Segment attached>
          {this.props.category.buttons.length > 0
            ? this.props.category.buttons.map((button, i) => {
                let color;
                if (!colors[colorIndex]) {
                  colorIndex = 0;
                  color = colors[colorIndex];
                } else {
                  color = colors[colorIndex];
                  colorIndex++;
                }

                return (
                  <CustomButton
                    color={color}
                    button={button}
                    key={button._id}
                    update={this.props.update}
                    updateUser={this.props.updateUser}
                    user={this.props.user}
                    toggleSoundSettingsModal={this.props.toggleSoundSettingsModal}
                  />
                );
              })
            : 'No buttons in this category.'}
        </Segment>
      </React.Fragment>
    );
  }
}

module.exports = ButtonCategory;
