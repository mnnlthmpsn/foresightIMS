import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ItemContext } from '../context/itemContext'


const AddItem = () => {
  let history = useHistory()
  const { addItem } = useContext(ItemContext)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [quantity, setQuantity] = useState(0)
  const [stateChanged, setStateChanged] = useState(false)

  const add = e => {
    e.preventDefault()
    let item = { name, price, quantity }
    addItem(item)
    setStateChanged(!stateChanged)
    history.replace('/')
  }

  return (
    <div>
      <h4 className='text-center mb-3' style={{ color: 'rgb(199, 125, 15)' }}>
        Add Item
      </h4>
      <form onSubmit={add}>
        <div className='form-group'>
          <label>Name</label>
          <input
            type='text'
            className='form-control'
            placeholder='Item Name'
            onChange={e => setName(e.target.value)}
            autoFocus
          />
        </div>
        <div className='form-group'>
          <label>Unit Price</label>
          <input
            type='number'
            className='form-control'
            placeholder='Unit Price'
            onChange={e => setPrice(e.target.value)}
            step="0.01"
            min="0"
          />
        </div>
        <div className='form-group'>
          <label>Item Quantity</label>
          <input
            type='number'
            className='form-control'
            placeholder='Item Quantity'
            onChange={e => setQuantity(e.target.value)}
            min="0"
          />
        </div>
        <button
          type='submit'
          className='btn'
          style={{ backgroundColor: 'rgb(199, 125, 15)' }}
        >
          <h6 className='mt-2'>Add Item</h6>
        </button>
      </form>
    </div>
  )
}

export default AddItem
