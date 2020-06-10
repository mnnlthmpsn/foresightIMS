import React, { useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

const Notifications = () => {

  const notification = document.getElementById('notification')
  const message = document.getElementById('message')
  const restartButton = document.getElementById('restart-button')
  
  const checkUpdates = () => {
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available')
      message.innerText = 'A new update is available. Downloading now...'
      notification.classList.remove('hidden')
    })
  }

  const downloadUpdates = () => {
      ipcRenderer.on('update_downloaded', () => {
          ipcRenderer.removeAllListeners('update_downloaded')
          message.innerText = 'Update Downloaded. Restart Now ??'
          restartButton.classList.remove('hidden')
          notification.classList.remove('hidden')
      })
  }

  const closeNotification = () => {
      notification.classList.add('hidden')
  }

  const restartApp = () => {
      ipcRenderer.send('restart_app')
  }

  useEffect(() => {
    checkUpdates()
    downloadUpdates()
  })

  return (
    <div id='notification' className='hidden'>
      <p id='message'></p>
      <button id='close-button' onClick={() => closeNotification()}>
        Close
      </button>
      <button id='restart-button' onClick={() => restartApp()} className='hidden'>
        Restart
      </button>
    </div>
  )
}

export default Notifications
