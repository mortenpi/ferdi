import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { defineMessages, intlShape } from 'react-intl';
import { Input, Button } from '@meetfranz/forms';
import injectSheet from 'react-jss';
import Form from '../../../lib/Form';
import { required } from '../../../helpers/validation-helpers';

const messages = defineMessages({
  submitButton: {
    id: 'settings.workspace.add.form.submitButton',
    defaultMessage: '!!!Save workspace',
  },
  name: {
    id: 'settings.workspace.add.form.name',
    defaultMessage: '!!!Name',
  },
});

const styles = () => ({
  form: {
    display: 'flex',
  },
  input: {
    flexGrow: 1,
    marginRight: '10px',
  },
  submitButton: {
    height: 'inherit',
    marginTop: '3px',
  },
});

@injectSheet(styles) @observer
class CreateWorkspaceForm extends Component {
  static contextTypes = {
    intl: intlShape,
  };

  static propTypes = {
    classes: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
  };

  form = (() => {
    const { intl } = this.context;
    return new Form({
      fields: {
        name: {
          label: intl.formatMessage(messages.name),
          placeholder: intl.formatMessage(messages.name),
          value: '',
          validators: [required],
        },
      },
    });
  })();

  submitForm() {
    const { form } = this;
    form.submit({
      onSuccess: async (f) => {
        const { onSubmit } = this.props;
        onSubmit(f.values());
      },
    });
  }

  render() {
    const { intl } = this.context;
    const { classes } = this.props;
    const { form } = this;
    return (
      <div className={classes.form}>
        <Input
          className={classes.input}
          {...form.$('name').bind()}
          showLabel={false}
          onEnterKey={this.submitForm.bind(this, form)}
        />
        <Button
          className={classes.submitButton}
          type="submit"
          label={intl.formatMessage(messages.submitButton)}
          onClick={this.submitForm.bind(this, form)}
        />
      </div>
    );
  }
}

export default CreateWorkspaceForm;
