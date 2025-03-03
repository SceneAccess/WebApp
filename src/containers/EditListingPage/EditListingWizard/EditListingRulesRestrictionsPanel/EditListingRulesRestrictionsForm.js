import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { FormattedMessage } from '../../../../util/reactIntl';
import { Button, FieldTextInput } from '../../../../components';
import css from './EditListingRulesRestrictionsForm.module.css';

const EditListingRulesRestrictionsForm = props => {
  const { handleSubmit, saveActionMsg, disabled, ready, inProgress, updated } = props;

  return (
    <FinalForm
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FieldTextInput
            id="rulesRestrictions"
            name="rulesRestrictions"
            type="text"
            label="Rules & Restrictions"
            placeholder="Describe any rules & restrictions"
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

export default EditListingRulesRestrictionsForm;