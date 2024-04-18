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

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        {/* Visible only on small screens */}
        <div className={styles.contentHeader}>Hello</div>

        <div className={styles.container}>
          <div className={styles.imageContainer}>
            <div className={styles.imagePicker}>Hello</div>
            <div className={styles.imageWrapper}>Hello</div>
          </div>

          <div className={styles.content}>
            {/* Visible only on large screens */}
            <div className={styles.contentHeader}>Hello</div>

            <div className={styles.contentDescription}>Hello</div>

            <div className={styles.contentFooter}>
              <div className={styles.sizeContainer}>Hello</div>
              <div className={styles.quantityContainer}>Hello</div>
              <div className={styles.buttonContainer}>Hello</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
