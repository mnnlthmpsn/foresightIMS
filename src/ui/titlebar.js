import React from 'react'
import * as icon from 'react-bootstrap-icons'
const { ipcRenderer } = window.require('electron')

const TitleBar = () => {
  const action = action => {
    ipcRenderer.send('action', action)
  }

  return (
    <div className='mainBar'>
      <div className='titleBar'>
        <div className='brand'>
          <h6 style={{ margin: '5px 0 -5px 10px' }}>ForeSight IMS</h6>
        </div>
        <div className='controls'>
          {/* eslint-disable-next-line */}
          <a onClick={() => action('close')} style={{ float: 'right' }}>
            <icon.X />
          </a>
          {/* eslint-disable-next-line */}
          <a
            onClick={() => action('minimize')}
            style={{ float: 'right', marginRight: '20px' }}
          >
            <icon.CaretDownFill />
          </a>
          {/* eslint-disable-next-line */}
          <a
            style={{ float: 'right', marginRight: '20px' }}
          >
            <icon.Question />
          </a>
        </div>
      </div>
      <hr
        style={{
          width: '100%',
          border: '1px solid rgb(53, 51, 51)',
        }}
      />
    </div>
  )
}

export default TitleBar
