import Navbar from "./components/Navbar"
import Notes from "./components/Notes"
import Home from "./pages/Home"
import NewNote from "./pages/NewNote"
import SingleNote from "./pages/SingleNote"
import { BrowserRouter, Routes, Route } from "react-router-dom"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/newNote" element={<NewNote />}/>
        <Route path="/singleNote/:id" element={<SingleNote />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
