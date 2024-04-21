import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Cart from './pages/Cart'
import AppContext from './contexts/AppContext'
import ProductLanding from './pages/ProductLanding'
import useAppContextValue from './hooks/useAppContext'
import { CART_PAGE_ROUTE, HOME_PAGE_ROUTE, PRODUCT_PAGE_ROUTE } from './constants/routes'
import ProductModal from './pages/ProductModal'

const App: React.FC = () => {
  const appContextValue = useAppContextValue()

  return (
    <AppContext.Provider value={appContextValue}>
      <Router>
        <Routes>
          <Route path={HOME_PAGE_ROUTE} element={<ProductLanding />} />
          <Route path={CART_PAGE_ROUTE} element={<Cart />} />
          {/*  The path for the productModal page with a dynamic parameter for the productId */}
          <Route path={`${PRODUCT_PAGE_ROUTE}/:productId`} element={<ProductModal />} />
        </Routes>
      </Router>
    </AppContext.Provider>
  )
}

export default App
