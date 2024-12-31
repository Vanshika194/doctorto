import React from 'react'
import Header from '../components/Header'
import SpecialityDoc from '../components/SpecialityDoc'
import TopDoctors from '../components/TopDoctors'
import Banner from '../components/Banner'
import Footer from '../components/Footer'

const home = () => {
  return (
    <div>

      <Header/>
      <SpecialityDoc/>
      <TopDoctors/>
      <Banner/>
    </div>
  )
}

export default home
