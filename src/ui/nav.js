import React from 'react'
import { Link } from 'react-router-dom'
import * as icon from 'react-bootstrap-icons'

const Nav = () => (
  <div>
    <ul className='nav sideNav'>
      <Link to='/'>
        <div>
          <h6><li className='nav-item'><span ><icon.Basket3Fill className="mb-1"/></span>All Items</li></h6>
        </div>
      </Link>
      <hr style={{ width: '100%', border: '1px solid rgb(53, 51, 51)' }} />
      <Link to='/add'>
        <h6><li className='nav-item'><span><icon.BagPlus className="mb-1"/></span>Add Item</li></h6>
      </Link>
    </ul>
  </div>
)

export default Nav
