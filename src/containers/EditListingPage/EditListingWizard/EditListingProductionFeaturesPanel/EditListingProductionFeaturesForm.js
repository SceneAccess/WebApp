import React from 'react';
import { Field, Form as FinalForm } from 'react-final-form';
import { FormattedMessage } from '../../../../util/reactIntl';
import { Button, FieldTextInput } from '../../../../components';
import css from './EditListingProductionFeaturesForm.module.css';

const EditListingProductionFeaturesForm = props => {
  const { handleSubmit, saveActionMsg, disabled, ready, inProgress, updated } = props;

  return (
    <FinalForm
      onSubmit={handleSubmit}
      render={({ handleSubmit, pristine }) => (
        <form onSubmit={handleSubmit} className={css.form}>
          <FieldTextInput
            id="productionFeatures"
            name="productionFeatures"
            type="text"
            label="Production Features"
            placeholder="Describe the production features"
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

export default EditListingProductionFeaturesForm;