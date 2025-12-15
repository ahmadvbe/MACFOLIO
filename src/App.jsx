
import React from 'react'
import { Dock, Navbar, Welcome, Home } from '#components'
import {Safari, Terminal, Resume, Finder, Text, Image, Contact, Photos} from '#windows'

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
      <Safari  //1:59:02
       />
       
       {/* 2:11:20 for the resumewindow to appear in our app we have to wrap it into our app.jsx */}
       <Resume />

       {/* 2:22:38 */}
       <Finder />

       {/* 2:42:08 */}
       <Text />
       <Image />

       {/* 2:46:05 */}
       <Contact />

        {/* 3:01:05 */} 
       <Photos /> 

       {/* 2:54:15 */}
       <Home 
         />

    </main>
  )
}

export default App
