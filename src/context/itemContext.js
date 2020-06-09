import React, { createContext, useState, useEffect } from 'react'
const { ipcRenderer } = window.require('electron')

export const ItemContext = createContext()

export const ItemContextProvider = props => {
  const [items, setItems] = useState([])
  const [currentItem, setCurrentItem] = useState({})
  const [stateChanged, setStateChanged] = useState(false)

  const addItem = async item => {
    await ipcRenderer.send('create:item', item)
    setStateChanged(!stateChanged)
  }

  const clearAll = () => {
    ipcRenderer.send('action', 'clearAll')
    setStateChanged(!stateChanged)
  }

  const getOneItem = name => {
    ipcRenderer.send('getOne:item', name)
    setStateChanged(!stateChanged)
  }

  const getItems = async () => {
    await ipcRenderer.on('get:success', (e, items) => {
      const newItems = items.sort(function (a, b) {
        return a.name.localeCompare(b.name)
      })
      setItems(newItems)
    })
  }

  const updateItem = async item => {
      await ipcRenderer.send('update:item', item)
      setStateChanged(!stateChanged)
  }

  const deletefromDb = async itemName => {
    await ipcRenderer.send('delete:item', itemName)
    setStateChanged(!stateChanged)
  }

  const ipcRenderers = () => {
    ipcRenderer.send('get:items')
    ipcRenderer.on('getOne:itemSuccess', (e, item) => {
      setCurrentItem(item[0])
    })
  }

  useEffect(() => {
    ipcRenderers()
    getItems()
  }, [stateChanged])
  return (
    <ItemContext.Provider
      value={{ addItem, clearAll, getOneItem, items, currentItem, updateItem, deletefromDb }}
    >
      {props.children}
    </ItemContext.Provider>
  )
}

export default ItemContextProvider
