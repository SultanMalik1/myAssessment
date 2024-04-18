import React, { useState, useEffect } from 'react'
import styles from './ProductModal.module.scss'
import cx from 'classnames'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import { useAppContext } from '../../hooks/useAppContext'
import { IProduct } from '../../hooks/useAppContext'

export default function ProductModal() {
  const { productId } = useParams()
  const [productDetails, setProductDetails] = useState<IProduct>()
  const { addItem, products, cartItems } = useAppContext()

  useEffect(() => {
    // The type of productId is string while the id of product is number
    // So we need to convert the product.id to string to compare
    // Another approach can be that we use  == instead of === to compare as it will only compare the values
    const foundProduct = products.find((product) => `${product.id}` === productId)
    setProductDetails(foundProduct)
  }, [productId, products])

  const innerClasses = cx(styles.inner, {
    [styles.empty]: false,
  })

  return (
    <div className={styles.wrapper}>
      <div className={innerClasses}>
        {/* <Link to="/" className={styles.closeBtn}>
          <img src={close} alt="close" />
        </Link> */}

        {/* I've used != instead of !== because it != only checks the value and not the type */}
        {productDetails != null ? (
          <>
            <div className={cx(styles.products, styles.section)}>
              <h2 className={styles.heading}>Shopping Bag</h2>
              <ul className={styles.productList}></ul>
            </div>
            <div className={cx(styles.summary, styles.section)}>
              <h2 className={styles.heading}>Order Summary</h2>
              <div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryItem}>Subtotal</span>
                  <span className={cx(styles.summaryItem, styles.summaryPrice)}>$0</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryItem}>Taxes</span>
                  <span className={cx(styles.summaryItem, styles.summaryPrice)}>$0</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryItem}>Shipping</span>
                  <span className={cx(styles.summaryItem, styles.summaryPrice)}>Free</span>
                </div>
                <div className={styles.summaryRow}>
                  <span className={styles.summaryItem}>Total</span>
                  <span
                    className={cx(styles.summaryItem, styles.summaryPrice, styles.summaryItemBold)}
                  >
                    $0
                  </span>
                </div>
              </div>
              <Button className={styles.checkoutBtn} onClick={() => null}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* <img className={styles.emptyImage} src={empty} alt="empty" /> */}
            <p className={cx(styles.text, styles.emptyTitle)}>Your bag is empty</p>
            <p className={cx(styles.text, styles.emptyText)}>
              Please add some products to your cart
            </p>
          </>
        )}
      </div>
    </div>
  )
}
