
import './App.css';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/User/Dashboard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ReportItem from './components/User/ReportItem';
import LostTicket from './components/User/LostTicket';
import ClaimsTickets from './components/User/ClaimsTickets';
import DashboardAdmin from './components/Admin/DashboardAdmin';
import Account from './components/User/Account';
import LoginAdmin from './components/Admin/LoginAdmin';
import SignupAdmin from './components/Admin/SignupAdmin';
import ManageUsers from './components/Admin/ManageUsers';
import ManageItems from './components/Admin/ManageItems';
import ManageClaims from './components/Admin/ManageClaims';
import HomePage from './components/Home/HomePage';
import UpdateFoundItem from './components/User/UpdateFoundItem';
import UpdateLostTicket from './components/User/UpdateLostTicket';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}></Route>
        {/* <Route path='/manageitem' element={<UserFoundItem/>}></Route> */}
        <Route path='/update_founditem/:itemid' element={<UpdateFoundItem/>}></Route>
        <Route path='/update_lostitem/:itemid' element={<UpdateLostTicket/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/account' element={<Account/>}></Route>
        <Route path='/claimTicket' element={<ClaimsTickets/>}></Route>
        <Route path='/reportItem' element={<ReportItem/>}></Route>
        <Route path='/lostTicket' element={<LostTicket/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        <Route path='/adminDashboard' element={<DashboardAdmin/>}></Route>
        <Route path='/adminlogin' element={<LoginAdmin/>}></Route>
        <Route path='/adminSignup' element={<SignupAdmin/>}></Route>
        <Route path='/manageUsers' element={<ManageUsers/>}></Route>
        <Route path='/manageItems' element={<ManageItems/>}></Route>
        <Route path='/manageClaims' element={<ManageClaims/>}></Route>

      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
