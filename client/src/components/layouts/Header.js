import React from 'react'; 
import Search from './Search';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown,Image } from 'react-bootstrap';
import { logout } from '../../actions/userActions';
export default function Header () {

     const {isAuthenticated,user}= useSelector(state=> state.authState);
     const {items:cartItem}=useSelector(state=>state.cartState)
     const dispatch=useDispatch();
     const navigate=useNavigate()
    const logoutHandler=()=>{
       dispatch(logout);
    }

    return(
        <nav className="navbar row">
      <div className="col-12 col-md-3">
        <div className="navbar-brand">
          <Link to="/" >
          <img width="150px" src="/images/logo.png" alt='MadCart'/>
          </Link>
        </div>
      </div>

      <div className="col-12 col-md-6 mt-2 mt-md-0">
        <Search/>
      </div>

      <div className="col-12 col-md-3 mt-4 mt-md-0 text-center">
      
      {
        isAuthenticated ? 
        (
          <Dropdown className='d-inline'>
            <Dropdown.Toggle variant='default text-white pr-5' id='dropdown-basic'>
              <figure className='avatar avatar-nav'>
                <Image width="50px" src={user.avatar??'./images/default_avatar.png'} />

              </figure>
              <span>{user.name}</span>

            </Dropdown.Toggle>
            <Dropdown.Menu>

              { user.role==='admin' && <Dropdown.Item onClick={()=>{navigate('/admin/dashboard')}} className='text-dark'>Dashboard</Dropdown.Item>}
              <Dropdown.Item onClick={()=>{navigate('/myprofile')}} className='text-dark'>profile</Dropdown.Item>
              <Dropdown.Item onClick={()=>{navigate('/orders')}} className='text-dark'>orders</Dropdown.Item>

              <Dropdown.Item onClick={logoutHandler} className='text-danger'>Logout</Dropdown.Item>
            </Dropdown.Menu>

          </Dropdown>
        ) :
        <Link to="/login"> <button  className="btn" id="login_btn">Login</button></Link>


      }

       
        <Link to='/cart'><span id="cart" className="ml-3">Cart</span></Link>
        <span className="ml-1" id="cart_count">{cartItem.length}</span>
      </div>
    </nav>
    );
}