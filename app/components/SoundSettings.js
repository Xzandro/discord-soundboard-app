import React, { Component } from 'react';
import isEqual from 'lodash/isEqual';
import { Button, Form, Header, Icon, Modal } from 'semantic-ui-react';

import { requestApi } from '../api';

const { dialog } = require('electron').remote;
const fs = require('fs');

class SoundSettings extends Component {
  constructor(props) {
    super(props);

    this.state = { settings: this.props.settings, categories: this.props.categories, nameError: false, fileError: false };
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(this.props.settings, prevProps.settings)) {
      this.setState({ settings: this.props.settings });
    }
  }

  handleChange(e, { name, value }) {
    const settingsState = Object.assign(this.state.settings, { [name]: value });
    this.setState({ settings: settingsState });
  }

  handleFile(e) {
    const settingsState = Object.assign(this.state.settings, { file: e.target.files[0] });
    this.setState({ settings: settingsState });
  }

  saveSettings() {
    let error = false;
    if (!this.state.settings.name) {
      this.setState({ nameError: true });
      error = true;
    } else {
      this.setState({ nameError: false });
    }
    if (!this.state.settings.file) {
      this.setState({ fileError: true });
      error = true;
    } else {
      this.setState({ fileError: false });
    }

    if (error) {
      return;
    }

    requestApi('/button', 'post', {}, null, this.state.settings).then(button => {
      this.setState({ nameError: false, fileError: false });
      this.props.refresh();
      this.props.toggleSoundSettingsModal();
    });
  }

  render() {
    const categoryOptions = this.props.categories.map(category => {
      return { key: category._id, text: category.name, value: category._id };
    });

    return (
      <Modal open={this.props.open} size="small">
        <Header icon="music" content="Sound" subheader="Handle all Sound relevant data." />
        <Modal.Content>
          <Form>
            <Form.Input
              required
              label="Name"
              placeholder="Name"
              name="name"
              error={this.state.nameError}
              value={this.state.settings.name}
              onChange={this.handleChange.bind(this)}
            />
            <Form.Input
              label="Description"
              placeholder="Description"
              name="description"
              value={this.state.settings.description}
              onChange={this.handleChange.bind(this)}
            />
            <Form.Select
              label="Category"
              placeholder="Category"
              name="category"
              options={categoryOptions}
              value={this.state.settings.category || null}
              onChange={this.handleChange.bind(this)}
            />
            <Form.Input
              readOnly
              label="File"
              placeholder="File"
              name="file"
              value={this.state.settings.file instanceof Object ? this.state.settings.file.path : this.state.settings.file}
              error={this.state.fileError}
            />
            <input type="file" id="file" name="file" onChange={this.handleFile.bind(this)} />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            onClick={() => {
              this.saveSettings();
            }}
            inverted
          >
            <Icon name="checkmark" /> Save
          </Button>
          <Button
            color="blue"
            onClick={() => {
              this.props.toggleSoundSettingsModal();
            }}
            inverted
          >
            <Icon name="close" /> Close
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
export default SoundSettings;
