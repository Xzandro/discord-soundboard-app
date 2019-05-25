import React from 'react';
import { Message } from 'semantic-ui-react';

const LoggedOut = () => (
  <Message warning>
    <Message.Header>Du musst dich zuerst anmelden, um die Statistiken zu sehen!</Message.Header>
    <p>Gehe zu den Setting und trage deine Discord ID und dein Passwort ein.</p>
  </Message>
);

export default LoggedOut;
