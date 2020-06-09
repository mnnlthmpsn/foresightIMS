import React, { useContext, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { ItemContext } from '../context/itemContext'

const Revert = () => {
  const history = useHistory()
  const { currentItem, updateItem } = useContext(ItemContext)
  const [qtyReverted, setQtyReverted] = useState(0)
  const [cost, setCost] = useState(0)

  const revertCalc = e => {
    var tmp = qtyReverted * currentItem.price
    setCost(tmp)
  }

  const revert = () => {
    var qtyLeft = parseInt(currentItem.quantity) + parseInt(qtyReverted)
    updateItem({oldName:currentItem.name, name: currentItem.name, price: currentItem.price, quantity: qtyLeft })
    history.replace('/')
  }

  useEffect(() => {
    revertCalc()
    // eslint-disable-next-line
  }, [qtyReverted])

  return (
    <div>
      <h6 className='text-center mt-2'>
        Revert
        <span style={{ color: 'rgb(199, 125, 15)' }}> {currentItem.name}</span>
      </h6>
      <div className='revert'>
        <form onSubmit={revert}>
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
            <label>Quantity being Reverted</label>
            <input
              type='number'
              className='form-control'
              onChange={e => setQtyReverted(e.target.value)}
            />
          </div>
          <button
            type='submit'
            className='btn'
            style={{ backgroundColor: 'rgb(199, 125, 15)' }}
          >
            <h6 className='mt-2'>Revert Item</h6>
          </button>
        </form>
        <div className='mt-5'>
          <h6>Refund: GHc {cost}</h6>
        </div>
      </div>
    </div>
  )
}

export default Revert
