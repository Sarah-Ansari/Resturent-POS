import {Routes,Route,Navigate} from 'react-router-dom';
import LayoutComponent from './component/LayoutComponent';
import Home from './Pages/Home';
import MainPage from './component/MainPage';
import RestHomePage from './Pages/RestaurantHome';

function App() {
  return (
    <div className="App">
         
    <Routes>
        <Route path='/' element={<Navigate replace to='/home'></Navigate>}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/restaurantPage' element={<RestHomePage />}></Route>
    </Routes>
      
    </div>
  );
}

export default App;
