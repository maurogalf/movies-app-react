import { Routes, Route} from 'react-router-dom'
import Login from './components/Login';
import Listado from './components/Listado'
import Header from './components/Header';
import Footer from './components/Footer';
import Detail from './components/Detail'
import Resultados from './components/Resultados';

import '../src/css/app.css'
import '../src/css/bootstrap.min.css'

function App() {
  return (
    <div className='container'>
    <Header/>
    <Routes>
      <Route exact path="/" element={<Login/>}/>
      <Route path="/listado" element={<Listado favoritos={false}/>}/>
      <Route path="/detail" element={<Detail/>}/>
      <Route path="/resultados" element={<Resultados/>}/>
      <Route path="/favoritos" element={<Listado favoritos={true}/>}/>
    </Routes>
    <Footer/>
    </div>
    );
}

export default App;
