import React from 'react';
import classNames from 'classnames';
import { FormattedMessage } from '../../../../util/reactIntl';
import EditListingStyleAestheticsForm from './EditListingStyleAestheticsForm';
import { ensureOwnListing } from '../../../../util/data';
import css from './EditListingStyleAestheticsPanel.module.css';

const EditListingStyleAestheticsPanel = props => {
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
        <FormattedMessage id="EditListingStyleAestheticsPanel.title" />
      </h1>
      <EditListingStyleAestheticsForm
        initialValues={{ styleAesthetics: publicData?.styleAesthetics || '' }}
        onSubmit={values => {
          const { styleAesthetics } = values;
          onSubmit({ publicData: { styleAesthetics } });
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

export default EditListingStyleAestheticsPanel;