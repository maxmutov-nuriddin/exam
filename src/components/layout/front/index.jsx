import { Fragment } from "react"
import { Outlet } from "react-router-dom"

import Header from "../../header/Header"
import Footer from "../../footer/Footer"

const FrontLayout = () => {
  return <Fragment>
    <Header />
    <main>
      <Outlet />
    </main>
    <Footer />
  </Fragment>
}

export default FrontLayout