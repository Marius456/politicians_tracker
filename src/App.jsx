import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Navbar } from "./components/Navbar"
import { Hall } from "./pages/Hall"
import { Members } from "./pages/Members"
import { About } from "./pages/About"
import { Member_Info } from "./pages/Member_Info"

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Hall />} />
          <Route path="/hall" element={<Hall />} />
          <Route path="/members" element={<Members />} />
          <Route path="/about" element={<About />} />
          <Route path="/info/:id" element={<Member_Info />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
