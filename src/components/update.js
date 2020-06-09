import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { ItemContext } from '../context/itemContext'

const Update = () => {
    const history = useHistory()
    const { currentItem, updateItem } = useContext(ItemContext)
    const [ name, setName ] = useState(currentItem.name)
    const [ quantity, setQuantity ] = useState(currentItem.quantity)
    const [ price, setPrice ] = useState(currentItem.price)

    const update = () => {
        updateItem({oldName: currentItem.name, name, price, quantity})
        history.replace('/')
      }

    return (
        <div>
      <h6 className='text-center mt-2'>
        Edit
        <span style={{ color: 'rgb(199, 125, 15)' }}> {currentItem.name}</span>
      </h6>
      <div className='update'>
        <form onSubmit={update}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form-group'>
            <label>Unit Price</label>
            <input
              type='text'
              className='form-control'
              value={price}
              onChange={e => setPrice(e.target.value)}
              step="0.01"
              min="0"
            />
          </div>
          <div className='form-group'>
            <label>Quantity</label>
            <input
              type='text'
              className='form-control'
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              min="0"
            />
          </div>
          <button
            type='submit'
            className='btn'
            style={{ backgroundColor: 'rgb(199, 125, 15)' }}
          >
           <h6 className='mt-2'>Update Item</h6>
          </button>
        </form>
      </div>
    </div>
    )
}

export default Update