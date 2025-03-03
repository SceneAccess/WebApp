import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../../util/reactIntl';
import EditListingRulesRestrictionsForm from './EditListingRulesRestrictionsForm';
import { ensureOwnListing } from '../../../../util/data';
import css from './EditListingRulesRestrictionsPanel.module.css';

const EditListingRulesRestrictionsPanel = props => {
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
        <FormattedMessage id="EditListingRulesRestrictionsPanel.title" />
      </h1>
      <EditListingRulesRestrictionsForm
        initialValues={{ rulesRestrictions: publicData?.rulesRestrictions || '' }}
        onSubmit={values => {
          const { rulesRestrictions } = values;
          onSubmit({ publicData: { rulesRestrictions } });
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

export default EditListingRulesRestrictionsPanel;