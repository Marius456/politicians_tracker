import { Routes, Route } from "react-router-dom"
import { Container } from "react-bootstrap"
import { Home } from "./pages/Home"
import { Navbar } from "./components/Navbar"
import { Hall } from "./pages/Hall"
import { Members } from "./pages/Members"

function App() {
  return (
    <>
      <Navbar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hall" element={<Hall />} />
          <Route path="/members" element={<Members />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
