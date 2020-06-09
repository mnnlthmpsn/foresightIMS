import React, { useContext } from 'react'
import * as icon from 'react-bootstrap-icons'
import { useHistory } from 'react-router-dom'
import { ItemContext } from '../context/itemContext'

const SellOrUpdate = () => {
  const { currentItem, deletefromDb } = useContext(ItemContext)
  const history = useHistory()

  const deleteItem = () => {
    deletefromDb(currentItem.name)
    history.replace('/')
  }

  return (
    <div>
      <h6 className='text-center mt-2'>
        Options for{' '}
        <span style={{ color: 'rgb(199, 125, 15)' }}>{currentItem.name}</span>
      </h6>
      <div className='sellOrUpdate'>
        <div className='item' onClick={() => history.replace('/sell')}>
          <icon.Basket2Fill style={{ fontSize: '50px' }} />
          <h6 className='mt-2'>Sell Item</h6>
        </div>
        <div className='item' onClick={() => history.replace('/update')}>
          <icon.Brush style={{ fontSize: '50px' }} />
          <h6 className='mt-2'>Edit Item</h6>
        </div>
      </div>
      <div className='sellOrUpdate'>
        <div className='item' onClick={() => history.replace('/revert')}>
          <icon.SkipBackwardFill style={{ fontSize: '50px' }} />
          <h6 className='mt-2'>Revert Purchase</h6>
        </div>
        <div
          className='item'
          onClick={() => deleteItem()}
          style={{ backgroundColor: 'rgb(151, 30, 30)', border: 'none' }}
        >
          <icon.ExclamationTriangleFill style={{ fontSize: '50px' }} />
          <h6 className='mt-2'>Delete Item</h6>
        </div>
      </div>
    </div>
  )
}

export default SellOrUpdate
