

import { Route, Routes, } from 'react-router'
import './App.css'
import HomeComponent from './Components/HOME/Home'
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



function App() {




  return (
    <>



      <PageReloadComponent />


      <Routes>

        <Route path="/" element={<HomeComponent />} />
        <Route path="About" element={<AboutUsCompontent />} />
        <Route path="Shop" element={<ShopComponent />} />
        <Route path="Contact" element={<ContactComponent />} />
        <Route path="/Login" element={<LoginInComponent />} />
        <Route path="/Signup" element={<SignUpComponent />} />
        <Route path="/product/:id" element={<DetailComponent/>} />
         <Route path="/Services" element={<ServicesComponent />} />

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
        

      </Routes>

      <FooterComponent />

    </>
  )
}

export default App











