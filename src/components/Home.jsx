//2:54:20 portfolio/src/components/Home.jsx
import {locations} from '#constants'
import clsx from 'clsx'

import {useGSAP} from "@gsap/react"
import { Draggable } from 'gsap/Draggable'
import useWindowStore from '#store/window'
import useLocationStore from '#store/location'

const projects = locations.work?.children ?? [] //or [] so that our app doesnt break

const Home = () => {
    //we also have to set the windowsLocation store to that project 2:58:25
    const {setActiveLocation} = useLocationStore()


    //2:57:30 Open them in the finder window when clicked
      const {openWindow} = useWindowStore()
      const handleOpenProjectFinder = (project) => {
        //before opening the window we have to set the location store to that project 2:58:20
        setActiveLocation(project) //2:58:35
        openWindow('finder') //opnen the finder window that will display the project folder
      }

    //2:56:50 make rhe folders draggable
    useGSAP( () =>{
        Draggable.create(".folder") //our "folder" classsName will be draggable 2:57:05
    }, [])

  return (
    <section
        id="home"
        >
            <ul>
                {projects.map((project) =>(
                    <li
                        key={project.id}
                        //properly position on the screen for the folder 2:55:50s
                        //using clsx to apply dynamic classes
                        className={clsx("group folder",
                            project.windowPosition     //2nd param -change the default window position
                        )}
                        onClick={() => handleOpenProjectFinder(project)} //2:58:08
                            

                        >
                            <img src="/images/folder.png"
                                 alt={project.name}/>
                            <p>{project.name}</p>
                    </li>
                ))}
            </ul>

    </section>

  )
}

export default Home
