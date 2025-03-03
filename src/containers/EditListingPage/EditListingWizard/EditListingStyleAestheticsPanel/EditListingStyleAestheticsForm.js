import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { FormattedMessage } from '../../../../util/reactIntl';
import { Button, FieldTextInput } from '../../../../components';
import css from './EditListingStyleAestheticsForm.module.css';

const EditListingStyleAestheticsForm = props => {
  const { handleSubmit, saveActionMsg, disabled, ready, inProgress, updated } = props;

  return (
    <FinalForm
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FieldTextInput
            id="styleAesthetics"
            name="styleAesthetics"
            type="text"
            label="Style & Aesthetics"
            placeholder="Enter details about the style"
          />
          <Button
            className={css.submitButton}
            type="submit"
            disabled={pristine || disabled || inProgress}
          >
            {saveActionMsg}
          </Button>
        </form>
      )}
    />
  );
};

export default EditListingStyleAestheticsForm;