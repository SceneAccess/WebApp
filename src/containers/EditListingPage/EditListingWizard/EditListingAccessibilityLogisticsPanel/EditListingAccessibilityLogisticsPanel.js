import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../../util/reactIntl';
import EditListingAccessibilityLogisticsForm from './EditListingAccessibilityLogisticsForm';
import { ensureOwnListing } from '../../../../util/data';
import css from './EditListingAccessibilityLogisticsPanel.module.css';

const EditListingAccessibilityLogisticsPanel = props => {
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
        <FormattedMessage id="EditListingAccessibilityLogisticsPanel.title" />
      </h1>
      <EditListingAccessibilityLogisticsForm
        initialValues={{ accessibilityLogistics: publicData?.accessibilityLogistics || '' }}
        onSubmit={values => {
          const { accessibilityLogistics } = values;
          onSubmit({ publicData: { accessibilityLogistics } });
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

export default EditListingAccessibilityLogisticsPanel;