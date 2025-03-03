import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { FormattedMessage } from '../../../../util/reactIntl';
import { Button, FieldTextInput } from '../../../../components';
import css from './EditListingAccessibilityLogisticsForm.module.css';

const EditListingAccessibilityLogisticsForm = props => {
  const { handleSubmit, saveActionMsg, disabled, ready, inProgress, updated } = props;

  return (
    <FinalForm
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FieldTextInput
            id="accessibilityLogistics"
            name="accessibilityLogistics"
            type="text"
            label="Accessibility & Logistics"
            placeholder="Describe the accessibility & logistics"
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

export default EditListingAccessibilityLogisticsForm;