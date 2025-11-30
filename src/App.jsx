
import React from 'react'
import { Dock, Navbar, Welcome } from '#components'
import {Terminal} from '#windows'

//1:32:50 FOR OUR WINDOWS TO BE DRAGGABLE => we have to use a GSAP draggable plugin
import gsap from "gsap"
import { Draggable } from 'gsap/Draggable'
//registering the plugin
gsap.registerPlugin(Draggable)


const App = () => {
  return (
    <main> 
      <Navbar />
      <Welcome />
      <Dock />

      <Terminal />
    </main>
  )
}

export default App
