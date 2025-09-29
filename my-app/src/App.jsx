

import { Route, Routes, } from 'react-router'
import './App.css'

import AboutUsCompontent from './Components/ABOUT/AboutUs'
import ShopComponent from './Components/Shop/shop'
import FooterComponent from './Components/Footer/Footer'
import ContactComponent from './Components/CONTACT/Contact'
import PageReloadComponent from './Components/PageReload/PageReload'
import { LoginInComponent } from './Components/LogIn/login'
import { SignUpComponent } from './Components/SignUp/signup'
import OrderList from './Components/Admin/OrderList'
import DetailComponent from './Components/Details/Details'
import ProtectRoute from './Components/ProtectRoutes/ProtectRoutes'
import ServicesComponent from './Components/Services/Services'
import OrderDetail from './Components/Admin/OrderDetails'
import HomeComponent from './Components/HOME/Home'
import CheckoutForm from './Components/CheckOut/checkout'
import NotFound from './Components/NotFound/notfound'



function App() {




  return (
    <>



      <PageReloadComponent />


      <Routes>

        <Route path="/" element={<HomeComponent />} />
        <Route path="/about" element={<AboutUsCompontent />} />
        <Route path="/shop" element={<ShopComponent />} />
        <Route path="/contact" element={<ContactComponent />} />
        <Route path="/login" element={<LoginInComponent />} />
        <Route path="/signup" element={<SignUpComponent />} />
        <Route path="/product/:id" element={<DetailComponent />} />
        <Route path="/services" element={<ServicesComponent />} />
        <Route path="/checkout" element={<CheckoutForm />} />



        <Route
          path="/admin/orders"
          element={
            <ProtectRoute>
              <OrderList>

              </OrderList>
            </ProtectRoute>

          }
        />

        <Route
          path="/admin/order/:orderId"
          element={
            <ProtectRoute>
              <OrderDetail />
            </ProtectRoute>
          }
        />

        <Route path="*" element={<NotFound  />} />

      </Routes>

      <FooterComponent />


    </>
  )
}

export default App











