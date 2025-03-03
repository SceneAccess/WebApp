import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../../util/reactIntl';
import EditListingOutdoorNaturalForm from './EditListingOutdoorNaturalForm';
import { ensureOwnListing } from '../../../../util/data';
import css from './EditListingOutdoorNaturalPanel.module.css';

const EditListingOutdoorNaturalPanel = props => {
  const {
    className,
    rootClassName,
    listing,
    onSubmit,
    saveActionMsg,
    disabled,
    ready,
    updateInProgress,
    updated,
  } = props;

  const currentListing = ensureOwnListing(listing);
  const { publicData } = currentListing.attributes;

  return (
    <div className={classNames(rootClassName || css.root, className)}>
      <h1>
        <FormattedMessage id="EditListingOutdoorNaturalPanel.title" />
      </h1>
      <EditListingOutdoorNaturalForm
        initialValues={{ outdoorNatural: publicData?.outdoorNatural || '' }}
        onSubmit={values => {
          const { outdoorNatural } = values;
          onSubmit({ publicData: { outdoorNatural } });
        }}
        saveActionMsg={saveActionMsg}
        disabled={disabled}
        ready={ready}
        inProgress={updateInProgress}
        updated={updated}
      />
    </div>
  );
};

export default EditListingOutdoorNaturalPanel;