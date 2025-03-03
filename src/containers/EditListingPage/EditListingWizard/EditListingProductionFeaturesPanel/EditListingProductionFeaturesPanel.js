import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../../util/reactIntl';
import EditListingProductionFeaturesForm from './EditListingProductionFeaturesForm';
import { ensureOwnListing } from '../../../../util/data';
import css from './EditListingProductionFeaturesPanel.module.css';

const EditListingProductionFeaturesPanel = props => {
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
        <FormattedMessage id="EditListingProductionFeaturesPanel.title" />
      </h1>
      <EditListingProductionFeaturesForm
        initialValues={{ productionFeatures: publicData?.productionFeatures || '' }}
        onSubmit={values => {
          const { productionFeatures } = values;
          onSubmit({ publicData: { productionFeatures } });
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

export default EditListingProductionFeaturesPanel;