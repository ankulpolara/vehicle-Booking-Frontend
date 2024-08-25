
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { AddVehicle } from './pages/AddVehicle';
import { BookVehicle } from './pages/BookVehicle';
import { Summerypage } from './pages/Summerypage';

function App() {
  return (
    <div>
     <Routes>
      <Route path='/' element= {<Home/>} />
      <Route path='/add-Vehicle' element= {<AddVehicle/>} />
      <Route path='/book-vehicle' element= {<BookVehicle/>} />
      <Route path='/summery' element= {<Summerypage/>} />
     </Routes>
    </div>
  );
}

export default App;
