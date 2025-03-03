import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { FormattedMessage } from '../../../../util/reactIntl';
import { Button, FieldTextInput } from '../../../../components';
import css from './EditListingOutdoorNaturalForm.module.css';

const EditListingOutdoorNaturalForm = props => {
  const { handleSubmit, saveActionMsg, disabled, ready, inProgress, updated } = props;

  return (
    <FinalForm
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FieldTextInput
            id="outdoorNatural"
            name="outdoorNatural"
            type="text"
            label="Outdoor & Natural Elements"
            placeholder="Describe the outdoor & natural elements"
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

export default EditListingOutdoorNaturalForm;