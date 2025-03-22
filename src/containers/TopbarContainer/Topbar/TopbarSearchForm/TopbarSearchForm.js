import React, { useRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';

import { useIntl } from '../../../../util/reactIntl';
import { isMainSearchTypeKeywords } from '../../../../util/search';

import { Form, LocationAutocompleteInput } from '../../../../components';
import BookingDateRangeFilter from '../../../SearchPage/BookingDateRangeFilter/BookingDateRangeFilter';

import css from './TopbarSearchForm.module.css';

const TopbarSearchForm = props => {
  const searchInputRef = useRef(null);
  const intl = useIntl();
  const { appConfig, onSubmit, ...restOfProps } = props;

  const onLocationChange = location => {
    if (!isMainSearchTypeKeywords(appConfig) && location.selectedPlace) {
      onSubmit({ location });
      searchInputRef?.current?.blur();
    }
  };

  const onDateRangeChange = dateRange => {
    onSubmit({ dateRange });
  };

  const handleSubmit = values => {
    // Send the form data to the backend
    fetch('/api/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to submit search');
        }
        return response.json();
      })
      .then(data => {
        console.log('Search results:', data);
        // Handle the search results (e.g., update state or redirect)
      })
      .catch(error => {
        console.error('Error submitting search:', error);
      });
  };

  return (
    <FinalForm
      {...restOfProps}
      onSubmit={handleSubmit} // Use the custom submit handler
      render={formRenderProps => {
        const { rootClassName, className, handleSubmit } = formRenderProps;
        const classes = classNames(rootClassName, className, css.searchBarContainer);

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {/* Activity Field */}
            <div className={css.fieldContainer}>
              <label className={css.fieldLabel}>
                {intl.formatMessage({ id: 'TopbarSearchForm.label.activity' })}
              </label>
              <select name="activity" className={css.locationInput}>
                <option value="photography">Photography</option>
                <option value="hiking">Hiking</option>
                <option value="cooking">Cooking</option>
              </select>
            </div>

            {/* Divider */}
            <div className={css.divider}></div>

            {/* Destination Field */}
            <div className={css.fieldContainer}>
              <label className={css.fieldLabel}>
                {intl.formatMessage({ id: 'TopbarSearchForm.label.destination' })}
              </label>
              <Field
                name="location"
                format={v => v}
                render={({ input }) => (
                  <LocationAutocompleteInput
                    className={css.locationInput}
                    placeholder={intl.formatMessage({ id: 'TopbarSearchForm.placeholder.destination' })}
                    inputRef={searchInputRef}
                    input={input}
                    onChange={onLocationChange}
                  />
                )}
              />
            </div>

            {/* Divider */}
            <div className={css.divider}></div>

            {/* Date Field */}
            <div className={css.fieldContainer}>
              <label className={css.fieldLabel}>
                {intl.formatMessage({ id: 'TopbarSearchForm.label.date' })}
              </label>
              <BookingDateRangeFilter
                id="TopbarSearchForm.dateRange"
                className={css.dateRangeFilter}
                onChange={onDateRangeChange}
                intl={intl}
              />
            </div>

            {/* Search Button */}
            <button type="submit" className={css.searchButton}>
              {intl.formatMessage({ id: 'TopbarSearchForm.searchButton' })}
            </button>
          </Form>
        );
      }}
    />
  );
};

export default TopbarSearchForm;
