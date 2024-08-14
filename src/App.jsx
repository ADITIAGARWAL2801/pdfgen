import { useState } from 'react'
import Form from './Components/Form.jsx'
import DataPage from './Components/DataPage.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'



import './App.css'

function App() {


  return (
    <>
    <h1 className = "text-orange-300 text-2xl font-bold tracking-tight text-balance text-center">PDF Generator</h1>
    <Router>
      <Routes>
        <Route path = '/' element = {<Form/>}></Route>
        <Route path = '/data' element = {<DataPage/>}></Route>
      </Routes>
    </Router>

    </>
  )
}

export default App
