import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ItemContext } from '../context/itemContext'

const Sell = () => {
  const history = useHistory()
  const { currentItem, updateItem } = useContext(ItemContext)
  const [qtyPurchased, setQtyPurchased] = useState('')
  const [cost, setCost] = useState(0)

  const sellCalc = e => {
    var tmp = qtyPurchased * currentItem.price
    setCost(tmp)
  }

  const sell = () => {
    var qtyLeft = currentItem.quantity - qtyPurchased
    updateItem({oldName:currentItem.name, name: currentItem.name, price: currentItem.price, quantity: qtyLeft })
    history.replace('/')
  }

  useEffect(() => {
    sellCalc()
    // eslint-disable-next-line
  }, [qtyPurchased])

  return (
    <div>
      <h6 className='text-center mt-2'>
        Sell
        <span style={{ color: 'rgb(199, 125, 15)' }}> {currentItem.name}</span>
      </h6>
      <div className='sell'>
        <form onSubmit={sell}>
          <div className='form-group'>
            <label>Name</label>
            <input
              type='text'
              className='form-control'
              value={currentItem.name}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>Unit Price</label>
            <input
              type='text'
              className='form-control'
              value={currentItem.price}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>Quantity of Items Left</label>
            <input
              type='text'
              className='form-control'
              value={currentItem.quantity}
              disabled
            />
          </div>
          <div className='form-group'>
            <label>Quantity being Purchased</label>
            <input
              type='number'
              className='form-control'
              onChange={e => setQtyPurchased(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn'
            style={{ backgroundColor: 'rgb(199, 125, 15)' }}
          >
            <h6 className='mt-2'>Sell Item</h6>
          </button>
        </form>
        <div className='mt-5'>
          <h6>Cost: GHc {cost}</h6>
        </div>
      </div>
    </div>
  )
}

export default Sell
