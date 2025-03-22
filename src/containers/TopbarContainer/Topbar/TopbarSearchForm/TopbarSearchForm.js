import React, { useRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';

import { useIntl } from '../../../../util/reactIntl';
import { isMainSearchTypeKeywords } from '../../../../util/search';

import { Form, LocationAutocompleteInput } from '../../../../components';
import BookingDateRangeFilter from '../../../SearchPage/BookingDateRangeFilter/BookingDateRangeFilter';
import FilterComponent from '../../../SearchPage/FilterComponent'; // Import FilterComponent

import css from './TopbarSearchForm.module.css';

const TopbarSearchForm = props => {
  const searchInputRef = useRef(null);
  const intl = useIntl();
  const { filterConfig, onSubmit, ...restOfProps } = props;

  // Extract the Activities filter configuration
  const activitiesFilterConfig =
    filterConfig?.find(filter => filter.key === 'activities') || null;

  if (activitiesFilterConfig && !activitiesFilterConfig.enumOptions) {
    console.warn('Activities filter is missing enumOptions. Adding fallback options.'); // Debugging log

    // Add fallback options
    activitiesFilterConfig.enumOptions = [
      { key: 'hiking', label: 'Hiking' },
      { key: 'photography', label: 'Photography' },
      { key: 'cooking', label: 'Cooking' },
    ];
  }

  if (!activitiesFilterConfig) {
    console.warn('Activities filter is not available'); // Debugging log
  }

  const handleSubmit = values => {
    console.log('Submitting form with values:', values);

    // Redirect to SearchPage with selected filters
    const searchParams = {
      activities: values.activities,
      location: values.location?.selectedPlace?.address || '',
      dateRange: values.dateRange,
    };

    const queryString = new URLSearchParams(searchParams).toString();
    window.location.href = `/search?${queryString}`;
  };

  return (
    <FinalForm
      {...restOfProps}
      onSubmit={handleSubmit}
      render={formRenderProps => {
        const { rootClassName, className, handleSubmit } = formRenderProps;
        const classes = classNames(rootClassName, className, css.searchBarContainer);

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            {/* Activities Filter */}
            {activitiesFilterConfig ? (
              <div className={css.fieldContainer}>
                <label className={css.fieldLabel}>
                  {intl.formatMessage({ id: 'TopbarSearchForm.label.activities' })}
                </label>
                <FilterComponent
                  idPrefix="TopbarSearchForm"
                  config={activitiesFilterConfig}
                  onSubmit={values => formRenderProps.form.change('activities', values)}
                />
              </div>
            ) : (
              <div>Loading Activities Filter...</div>
            )}

            {/* Divider */}
            <div className={css.divider}></div>

            {/* Location Search Field */}
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
                  />
                )}
              />
            </div>

            {/* Divider */}
            <div className={css.divider}></div>

            {/* Booking Date Selector */}
            <div className={css.fieldContainer}>
              <label className={css.fieldLabel}>
                {intl.formatMessage({ id: 'TopbarSearchForm.label.date' })}
              </label>
              <BookingDateRangeFilter
                id="TopbarSearchForm.dateRange"
                className={css.dateRangeFilter}
                onChange={values => formRenderProps.form.change('dateRange', values)}
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
