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
    return (
      <React.Fragment>
        <Header as="h5" attached={this.props.attached}>
          {this.props.category.name}
        </Header>
        <Segment attached>
          {this.props.category.buttons.map((button, i) => {
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
              />
            );
          })}
        </Segment>
      </React.Fragment>
    );
  }
}

module.exports = ButtonCategory;
