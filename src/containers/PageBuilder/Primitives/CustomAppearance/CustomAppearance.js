import React from 'react';
import classNames from 'classnames';
import ImageCarousel from '../../../ListingPage/ImageCarousel/ImageCarousel';
import { ResponsiveImage } from '../../../../components';
import css from './CustomAppearance.module.css';

/**
 * Render a custom appearance for a section component.
 * Replaces the single background image with an auto-rotating carousel of three images.
 * Below the carousel, bullet dots indicate the current image.
 *
 * @component
 * @param {Object} props
 * @param {string?} props.className additional style rules
 * @param {string?} props.rootClassName overrides component's own css.root
 * @param {string?} props.backgroundColor hexadecimal color string
 * @param {Object} props.backgroundImageOverlay overlay configuration (preset, color, opacity)
 * @param {string?} props.alt alternative text for the images
 * @returns {JSX.Element} custom appearance for the container of a section component
 */
export const CustomAppearance = React.forwardRef((props, ref) => {
  const {
    className,
    rootClassName,
    backgroundColor,
    backgroundImageOverlay,
    alt = 'background image'
  } = props;

  const carouselImages = [
    {
      id: '1',
      type: 'imageAsset',
      attributes: {
        variants: {
          default: { url: 'https://i.ibb.co/fzy65xyG/Screenshot-2025-03-04-at-19-44-02.png' },
        },
      },
    },
    {
      id: '2',
      type: 'imageAsset',
      attributes: {
        variants: {
          default: { url: 'https://i.ibb.co/39RtpcTm/Screenshot-2025-03-04-at-19-43-47.png' },
        },
      },
    },
    {
      id: '3',
      type: 'imageAsset',
      attributes: {
        variants: {
          default: { url: 'https://i.ibb.co/9ksxTjJx/Screenshot-2025-03-04-at-19-43-36.png' },
        },
      },
    },
  ];

  const backgroundColorMaybe = backgroundColor ? { backgroundColor } : {};

  const { preset, color: overlayColor, opacity: overlayOpacity } = backgroundImageOverlay || {};
  const effectiveOverlay = (preset && preset !== 'none')
    ? { preset, color: overlayColor, opacity: overlayOpacity }
    : null;
  const hasBackgroundOverlay = effectiveOverlay !== null;
  const overlayStyle = hasBackgroundOverlay
    ? { backgroundColor: effectiveOverlay.color, opacity: effectiveOverlay.opacity }
    : {};

  const IMAGE_GALLERY_OPTIONS = {
    showPlayButton: false,
    disableThumbnailScroll: true,
    showThumbnails: false,
    showFullscreenButton: true,
    slideDuration: 350,
    autoPlay: true,
    slideInterval: 5000, // rotate every 5000ms
    showBullets: true,   // display dots (bullets)
    showIndex: false,    // hide the text index
    infinite: true,
    showNav: false
  };

  const classes = classNames(rootClassName || css.backgroundImageWrapper, className);

  return (
    <div className={classes} style={backgroundColorMaybe}>
      {/* Render ImageCarousel directly – no extra clipping wrapper */}
      <ImageCarousel 
        images={carouselImages}
        imageVariants={['default']}
        {...IMAGE_GALLERY_OPTIONS}
        rootClassName={css.carouselRoot}
        className={css.backgroundImage}
      />
      {hasBackgroundOverlay && (
        <div className={css.backgroundOverlay} style={overlayStyle} />
      )}
      <div className={css.customHeading}>
        Every Frame Deserves a Stunning Location<br />
        Find Yours Today!
      </div>
    </div>
  );
});

CustomAppearance.displayName = 'CustomAppearance';
