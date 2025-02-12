import { Route, Routes } from 'react-router-dom'

import './App.css'

import Layout from './components/layout/Layout'
import Home from './page/home/Home'
import ToDo from './page/toDo/toDO'
import About from './page/about/About'
import Login from './page/login/Login'
import SinglePageToDo from './page/toDo/singlePagaToDo/SinglePageToDo'
import BodyOfTask from './page/toDo/singlePagaToDo/bodyOfTask/BodyOfTask'

function App() {

  return (
    <div className='container-main'>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="to-do" element={<ToDo />}>
            {/* <Route index element={<SinglePageToDo />} /> */}
            <Route path=":id" element={<SinglePageToDo />}>
              <Route path=":id" element={<BodyOfTask />}/>
            </Route>
          </Route>
          <Route path='about' element={<About/>}/>
          <Route path='login-page' element={<Login/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
