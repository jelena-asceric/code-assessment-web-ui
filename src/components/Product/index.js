import React from 'react';

import PropTypes from 'prop-types';
import cx from 'classnames';

import { Link } from 'react-router-dom';

import Button from '../Button';
import Quantity from '../Quantity';

import { getImage } from '../../utils/images';
import imageTypes from '../../constants/imageTypes';

import styles from './Product.module.scss';

const Product = ({
  className,
  count = 1,
  images,
  isAdded,
  isFeatured,
  onClick,
  onDecrement,
  onIncrement,
  price,
  title,
  productData
}) => {
  const isInCart = onIncrement && onDecrement;
  const productClasses = cx(className, styles.product, {
    [styles.inProductLanding]: !isInCart,
    [styles.inCart]: isInCart,
    [styles.featured]: isFeatured,
    [styles.isAddable]: !isAdded
  });

  const imageSrc = isFeatured
    ? getImage(images, imageTypes.DEFAULT_RT)
    : getImage(images);
  const finalPrice = (price * count).toFixed(2);

  return (
    <div className={productClasses}>
      <Link to={`/product/${productData?.id}`}>
        <img className={styles.image} src={imageSrc} alt={title} />
      </Link>
      <div className={styles.details}>
        <Link to={`/product/${productData?.id}`}>
          <div className={styles.text}>
            <h2 className={styles.title}>{title}</h2>
            <span className={styles.price}>${finalPrice}</span>
          </div>
        </Link>
        {isInCart ? (
          <Quantity
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            count={count}
          />
        ) : (
          <Button
            className={styles.addButton}
            disabled={isAdded}
            onClick={onClick}
          >
            {isAdded ? 'Added' : 'Add to Bag'}
          </Button>
        )}
      </div>
    </div>
  );
};

Product.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
      src: PropTypes.string.isRequired
    })
  ).isRequired,
  isFeatured: PropTypes.bool,
  onClick: PropTypes.func,
  onDecrement: PropTypes.func,
  onIncrement: PropTypes.func,
  price: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
};

export default Product;
