import React, { useState } from 'react';
import classNames from 'classnames';
import ReactImageGallery from 'react-image-gallery';

import { propTypes } from '../../../util/types';
import { useIntl } from '../../../util/reactIntl';
import { IconArrowHead, ResponsiveImage } from '../../../components';

// Copied directly from
// `node_modules/react-image-gallery/styles/css/image-gallery.css`. The
// copied file is left unedited, and all the overrides are defined in
// the component CSS file below.
import './image-gallery.css';

import css from './ImageCarousel.module.css';

const IMAGE_GALLERY_OPTIONS = {
  showPlayButton: false,
  disableThumbnailScroll: true,
  showThumbnails: false,
  showFullscreenButton: false,
  slideDuration: 350,
  autoPlay: true,
  slideInterval: 5000, // rotate every 5000ms (5 seconds)
  showBullets: true,   // display dots below the images
  showIndex: false,    // hide the current image index
  infinite: true,      // loop back to the first image after the last
  showNav: false       // hide left/right navigation arrows
};

/**
 * The ImageCarousel component.
 *
 * @component
 * @param {Object} props
 * @param {string} [props.className] - Custom class that extends the default class for the root element
 * @param {string} [props.rootClassName] - Custom class that overrides the default class for the root element
 * @param {Array<propTypes.image>} props.images - The images
 * @param {Array<string>} props.imageVariants - The image variants
 * @param {boolean} [props.showIndex] - Whether to show the image index
 * @returns {JSX.Element} image carousel component
 */
const ImageCarousel = props => {
  const [currentIndex, setIndex] = useState(0);
  const intl = useIntl();
  const { rootClassName, className, images, imageVariants, showIndex } = props;

  const items = images.map((img, i) => ({
    // We just pass along the image; react-image-gallery requires the `original` key.
    original: '',
    alt: intl.formatMessage(
      { id: 'ImageCarousel.imageAltText' },
      { index: i + 1, count: images.length }
    ),
    image: img,
  }));

  const renderItem = item => (
    <div className={css.imageWrapper}>
      <div className={css.itemCentering}>
        <ResponsiveImage
          rootClassName={css.item}
          image={item.image}
          alt={item.alt}
          variants={imageVariants}
        />
      </div>
    </div>
  );

  if (items.length === 0) {
    const classes = classNames(rootClassName || css.noImage, className);
    return <ResponsiveImage className={classes} image={null} variants={[]} alt="" />;
  }

  // Update: only render index info if showIndex prop is true.
  const handleSlide = currentIndex => setIndex(currentIndex);
  const naturalIndex = index => index + 1;
  const imageIndex = items.length > 0 && showIndex ? (
    <span className={css.imageIndex}>
      {naturalIndex(currentIndex)}/{items.length}
    </span>
  ) : null;

  const classesCombined = classNames(rootClassName || css.root, className);

  return (
    <>
      <ReactImageGallery
        additionalClass={classesCombined}
        items={items}
        renderItem={renderItem}
        onSlide={handleSlide}
        {...props}                // Spread any incoming props first...
        {...IMAGE_GALLERY_OPTIONS} // Then override with our options (including showNav: false)
      />
      {imageIndex}
    </>
  );
};

export default ImageCarousel;
