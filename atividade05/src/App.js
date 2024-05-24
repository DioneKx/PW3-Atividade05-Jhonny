import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import { NavBar } from './components/NavBar';
import { Container } from './components/Container';

import { Teams } from './pages/Teams';
import { NewTeam } from './pages/NewTeam';
import { Home } from './pages/Home';
import { EditTeam } from './pages/EditTeam';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Routes>
            <Route path='/' element={<NavBar />}>
              <Route index element={<Home />} />
              <Route path='/teams' element={<Teams />} />
              <Route path='/newteam' element={<NewTeam />} />
              <Route path='/editTeam/:id' element={<EditTeam />} />
            </Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </div>
  );
}

export default App;
