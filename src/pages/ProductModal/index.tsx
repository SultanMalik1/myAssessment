import React, { useState, useEffect } from 'react'
import styles from './ProductModal.module.scss'
import { Link, useParams } from 'react-router-dom'
import { useAppContext } from '../../hooks/useAppContext'
import { IProduct } from '../../hooks/useAppContext'
import Quantity from '../../components/Quantity'
import Button from '../../components/Button'
import { getImageUrl } from '../../utils/images'
import close from '../../assets/close.svg'

export default function ProductModal() {
  const { productId } = useParams()
  const [productDetails, setProductDetails] = useState<IProduct>()
  const [imageSrc, setImageSrc] = useState<string>()
  const { addItem, products, cartItems, incrementItem, decrementItem } = useAppContext()

  // Check if the product is already added to the cart
  const cartItem = cartItems.find((item) => item.id === productDetails?.id)
  const isAdded = cartItem != null

  useEffect(() => {
    // Find the product details based on the productId
    // The type of productId is string while the id of product is number
    // So we need to convert the product.id to string to compare
    const foundProduct = products.find((product) => `${product.id}` === productId)
    setProductDetails(foundProduct)

    // Set the first image of the product as the main image
    const firstImage = foundProduct?.images[0]?.src
    setImageSrc(firstImage ? getImageUrl(firstImage) : undefined)
  }, [productId, products])

  return (
    <div className={styles.wrapper}>
      {productDetails != null ? (
        <div className={styles.inner}>
          {/* Close button */}
          <Link to="/" className={styles.closeBtn}>
            <img src={close} alt="close" />
          </Link>

          {/* Content header visible only on small screens */}
          <div className={styles.contentHeader}>
            <h2>{productDetails.title}</h2>
            <p className={styles.price}>${productDetails.price}</p>
          </div>

          {/* Product images and details */}
          <div className={styles.container}>
            <div className={styles.imagesContainer}>
              {/* List of product images */}
              <div className={styles.imagesList}>
                {/* Show the first 4 images */}
                {productDetails.images.slice(0, 4).map((image, index) => (
                  <img
                    key={index}
                    className={styles.imageWrapper}
                    src={getImageUrl(image.src)}
                    alt={productDetails.title}
                    onClick={() => setImageSrc(getImageUrl(image.src))}
                    onMouseOver={() => setImageSrc(getImageUrl(image.src))}
                  />
                ))}
              </div>

              {/* Main image */}
              <div className={styles.imageWrapperContainer}>
                {imageSrc != null && (
                  <img className={styles.imageWrapper} src={imageSrc} alt={productDetails.title} />
                )}
              </div>
            </div>

            {/* Product content */}
            <div className={styles.content}>
              {/* Content header visible only on large screens */}
              <div className={styles.contentHeader}>
                <h2>{productDetails.title}</h2>
                <p className={styles.price}>${productDetails.price}</p>
              </div>

              {/* Product description */}
              <div className={styles.contentDescription}>
                <h5 className={styles.description}>Description</h5>
                {productDetails.description}
              </div>

              {/* Product footer with size selector, quantity, and add to bag button */}
              <div className={styles.contentFooter}>
                <div className={styles.sizeSelector}>
                  <h5>SIZE</h5>
                  <div className={styles.sizeButtons}>
                    {[1, 2, 3, 4].map((size) => (
                      <Button
                        key={size}
                        className={styles.sizeButton}
                        onClick={() => console.log(`Selected size: ${size}`)}
                      >
                        {size}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Quantity selector */}
                <Quantity
                  title="Quantity"
                  onIncrement={() => cartItem && incrementItem(cartItem)}
                  onDecrement={() => cartItem && decrementItem(cartItem)}
                  count={cartItem?.count ?? 1}
                />

                {/* Add to bag button */}
                <div>
                  <Button
                    className={styles.addButton}
                    disabled={isAdded}
                    onClick={() => addItem(productDetails)}
                  >
                    {isAdded ? 'Added' : 'Add to Bag'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Display loading message if product details are not yet loaded
        <div className={styles.loader}>Loading...</div>
      )}
    </div>
  )
}
