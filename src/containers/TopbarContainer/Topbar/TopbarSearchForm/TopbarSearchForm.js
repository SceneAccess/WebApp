import React, { useRef } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import classNames from 'classnames';

import { useIntl } from '../../../../util/reactIntl';
import { isMainSearchTypeKeywords } from '../../../../util/search';

import { Form, LocationAutocompleteInput } from '../../../../components';
import BookingDateRangeFilter from '../../../SearchPage/BookingDateRangeFilter/BookingDateRangeFilter';
import SearchFiltersPrimary from '../../../SearchPage/SearchFiltersPrimary/SearchFiltersPrimary';
import FilterComponent from '../../../SearchPage/FilterComponent';

import css from './TopbarSearchForm.module.css';

const TopbarSearchForm = props => {
  const searchInputRef = useRef(null);
  const intl = useIntl();
  const { filterConfig, onSubmit, ...restOfProps } = props;

  const activitiesFilterConfig =
    filterConfig?.find(filter => filter.key === 'activities') || null;

  if (activitiesFilterConfig && !activitiesFilterConfig.enumOptions) {
    console.warn('Activities filter is missing enumOptions. Adding fallback options.');

    // Add fallback options
    activitiesFilterConfig.enumOptions = [
      { key: 'hiking', label: 'Hiking' },
      { key: 'photography', label: 'Photography' },
      { key: 'cooking', label: 'Cooking' },
    ];
  }

  if (!activitiesFilterConfig) {
    console.warn('Activities filter is not available');
  }

  const handleSubmit = values => {
    console.log('Submitting form with values:', values);

    const dateRange = values.dateRange
      ? `${values.dateRange.startDate},${values.dateRange.endDate}`
      : '';

    const searchParams = {
      activities: values.activities,
      location: values.location?.selectedPlace?.address || '',
      dateRange,
    };

    const queryString = new URLSearchParams(searchParams).toString();
    console.log('Generated Query String:', queryString); // Debugging log
    window.location.href = `/search?${queryString}`;
  };

  const { searchParams } = this.props;

  const dateRange = searchParams.dateRange
    ? searchParams.dateRange.split(',').map(date => new Date(date))
    : null;

  console.log('Parsed Date Range:', dateRange); // Debugging log

  // Apply the date range filter to the listings
  if (dateRange) {
    const [startDate, endDate] = dateRange;
    // Filter logic here
  }

  return (
    <FinalForm
      {...restOfProps}
      onSubmit={handleSubmit}
      render={formRenderProps => {
        const { rootClassName, className, handleSubmit, form } = formRenderProps;
        const classes = classNames(rootClassName, className, css.searchBarContainer);

        return (
          <Form className={classes} onSubmit={handleSubmit}>
            <SearchFiltersPrimary>
              {/* Render the Activities filter */}
              {activitiesFilterConfig && (
                <FilterComponent
                  idPrefix="TopbarSearchForm"
                  config={activitiesFilterConfig}
                  onSubmit={values => form.change('activities', values)}
                />
              )}
            </SearchFiltersPrimary>

            <div className={css.divider}></div>

            {/* Destination Field */}
            <div className={classNames(css.fieldContainer, css.equalWidth)}>
              <label className={css.inputWrapper}>
                <div className={css.iconSearchFilterWrapper}>
                  <img
                    className={css.iconSearchFilter}
                    src="https://i.ibb.co/PGTT8GXs/Location.png"
                    alt="Location"
                    border="0"
                  />
                </div>
                <Field
                  name="location"
                  format={v => v}
                  render={({ input }) => (
                    <LocationAutocompleteInput
                      className={css.inputField}
                      placeholder="Enter a destination"
                      inputRef={searchInputRef}
                      input={input}
                    />
                  )}
                />
                <div className={css.dropdownIcon}></div>
              </label>
            </div>

            <div className={css.divider}></div>

            {/* Date Field */}
            <div className={classNames(css.fieldContainer, css.equalWidth)}>
              <label className={css.inputWrapper}>
                <div className={css.iconSearchFilterWrapper}>
                  <img
                    className={css.iconSearchFilter}
                    src="https://i.ibb.co/S74xQg1z/Calendar.png"
                    alt="Calendar"
                    border="0"
                  />
                </div>
                <BookingDateRangeFilter
                  id="TopbarSearchForm.dateRange"
                  className={css.inputField}
                  placeholder="Dates"
                  onChange={value => form.change('dateRange', value)}
                  intl={intl}
                />
                <div className={css.dropdownIcon}></div>
              </label>
            </div>

            {/* Search Button */}
            <div className={classNames(css.fieldContainer, css.equalWidth)}>
              <button type="submit" className={css.searchButton}>
                {intl.formatMessage({ id: 'TopbarSearchForm.searchButton' })}
              </button>
            </div>
          </Form>
        );
      }}
    />
  );
};

export default TopbarSearchForm;