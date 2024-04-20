import React from 'react'
import cx from 'classnames'

import styles from './Quantity.module.scss'

interface Props {
  count: number
  onDecrement: () => void
  onIncrement: () => void
  title?: string
}

const Quantity: React.FC<Props> = ({ title, onIncrement, onDecrement, count }) => {
  return (
    <div className={styles.quantityContainer}>
      {title && <h5>{title}</h5>}

      <div className={styles.quantity}>
        <button className={cx(styles.left, styles.button)} onClick={onDecrement}>
          -
        </button>
        <span>{count}</span>
        <button className={cx(styles.right, styles.button)} onClick={onIncrement}>
          +
        </button>
      </div>
    </div>
  )
}

export default Quantity
