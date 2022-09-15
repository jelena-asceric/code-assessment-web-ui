import { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import React from 'react';
import cx from 'classnames';
import AppContext from '../../contexts/AppContext';
import { Link } from 'react-router-dom';
import close from '../../assets/close.svg';

import styles from './ProductDetails.module.scss';

import Button from '../Button';
import Quantity from '../Quantity';

const ProductDetail = ({
  onClick,
  onIncrement,
  onDecrement,
  count = 1,
  title
}) => {
  const { cartItems, products } = useContext(AppContext);
  const { productId } = useParams();

  // eslint-disable-next-line eqeqeq
  const product = products.find(product => product.id == productId);

  const [selectedImg, setSelectedImg] = useState(null);

  const innerClasses = cx(styles.inner, {
    [styles.empty]: !cartItems.length
  });

  // useEffect(() => {
  //   console.log('mount');
  // }, []);

  const handleClick = index => {
    const selectedImag = product.images[index].src;
    setSelectedImg(selectedImag);
  };

  useEffect(() => {
    setSelectedImg(product?.images[0].src);
  }, [product]);

  return (
    <div className={styles.wrapper}>
      <div className={innerClasses}>
        <Link to="/" className={styles.closeBtn}>
          <img src={close} alt="close" />
        </Link>
        <div className={cx(styles.products, styles.section)}>
          <div className={styles.container}>
            <div className={styles['small-medium']}>
              <h2 className={styles['item-title']}>{product?.title}</h2>
              <p className={styles['item-price']}>${product?.price}</p>
            </div>
            <div className={styles.imgs}>
              <div className={styles['big-img']}>
                <img src={selectedImg} alt={title} />
              </div>
              <div className={styles['small-img']}>
                {product?.images?.map(
                  (img, index) =>
                    index % 2 !== 0 && (
                      <img
                        key={img.src}
                        src={img.src}
                        alt={title}
                        onClick={() => handleClick(index - 1)}
                      />
                    )
                )}
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.large}>
                <h2 className={styles['item-title']}>{product?.title}</h2>
                <p className={styles['item-price']}>${product?.price}</p>
              </div>
              <h3>Description</h3>
              <p className={styles['item-description']}>
                {product?.description}
              </p>
              <h3>Quantity</h3>
              <div className={styles.qb}>
                <div className={styles.quantity}>
                  <>
                    <Quantity
                      onIncrement={onIncrement}
                      onDecrement={onDecrement}
                      count={count}
                    />
                  </>
                </div>
                <div className={styles.button}>
                  <Button
                    className={styles.addButton}
                    // disabled={isAdded}
                    onClick={onClick}
                  >
                    {'Add to Bag'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
