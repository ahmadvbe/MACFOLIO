import { dockApps } from "#constants";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import React, { useRef } from "react";
import { Tooltip } from "react-tooltip";
import useWindowStore from "#store/window.js";

const Dock = () => {

    //1:24:42 use of our store create windows.js portfolio/src/store/window.js
    const { openWindow, closeWindow, focusWindow, windows,nextZIndex } = useWindowStore()

    //1:01:04 define a new ref by using useRef hook
    const dockRef = useRef(null);

    //1:06:49 animate it using GSAP - useGSAP hooks
    useGSAP(() => {
        const dock=dockRef.current;
        if (!dock) return;
        const icons = dock.querySelectorAll('.dock-icon');

        //function to animate the icons on hover
        const animateIcons = (mouseX) => { //we ll do based on the position of the mouse
            //get access to the left position of the dock 1:07:49 so we know when it starts
            const {left} = dock.getBoundingClientRect();
            //once w ehve the left position we can calculate the center of each icon
            icons.forEach((icon) => {

                //get the start position of each icon + its width 1:08:26
                const {left: iconLeft, width} = icon.getBoundingClientRect();

                //get the center position of each icon 1:09:06
                const center = iconLeft - left + width / 2;

                //get the distance of the mouse from the center of each icon 1:09:20
                const distance = Math.abs(mouseX - center);

                //grab the intensity of the effect based on the distance 1:09:33
                const intensity = Math.exp(-(distance ** 2.5) / 20000);

                //finally animate the icon based on the intensity 1:09:38
                gsap.to(icon, {
                    scale: 1 + 0.25 * intensity, //scale it up based on the intensity
                    //modify the y position to create a popping effect
                    y: -15 * intensity,
                    duration: 0.2,//throughout the durantion of 0.2 seconds
                    ease: 'power1.out',

        })


    })}

        //1:10:15 hanlde mouse move event
        const handleMouseMove = (e) => { //we re accepting the mouse movement event r h
            //we re getting tis left position
            const {left } = dock.getBoundingClientRect();
            
            animateIcons(e.clientX - left); //pass the mouse x position relative to the dock left position
        };
    
        //1:10:50 reset the icons when the mouse leaves the dock area
        const resetIcons = () =>{
            icons.forEach((icon) =>{
                gsap.to(icon,
                    {
                        scale:1, //change the scale back to 1
                        y: 0, //modify the y position back to 0,
                        duration: 0.3, //throughiout a duration of
                        ease: 'power1.out'
                    })}
                )
            }
                    //1:11:35 
        dock.addEventListener('mousemove', handleMouseMove)
        dock.addEventListener('mouseleave', resetIcons)
        
        //cleanup 1:12:03
        return ()=>{
            dock.removeEventListener("mousemove", handleMouseMove)
            dock.removeEventListener("mouseleave", resetIcons)
        }

    

}, [])

    const toggleApp = (app) => {
        //1:13:19 what happens on click on the dock items
        //implement the open window logic 1:13:31
        //back to dock.js to use that store created 1:24:42
        //that we go to the toggleApp function 1:25:05
        if(!app.canOpen) return 
        //else get access to the current window that user is trying to oopen 
        // console.log(nextZIndex)
        // console.log(windows); // Log the entire object
        // console.log(app.id); // Log the app ID being passed
        
        const appWindow = windows[app.id]

        if(!appWindow){ //new check added by code rabbit cli 1:29:20
            console.error(`window not found for app ${app.id}`)
            return
        }

        if(appWindow?.isOpen){
            closeWindow(app.id)
        }else{
            openWindow(app.id)
        }

        // console.log(windows)


    }

  return (
    <section id="dock">
        <div // 1:00:54 sto which will attach a ref which is important to target 
        // those elements using GSAP for animation 1:00:54
        ref={dockRef}    //attach the dockRef to this div
        className="dock-container"      //put it at the bottom center
            >
                {/* within this div we re gonna map over to the dock icons 1:01:50  */}
                {dockApps.map((
                    {id,
                    icon,
                    name,
                    canOpen}
                ) => (
                    <div
                        key={id}
                        className="relative flex justify-center">
                            <button
                                type="button"
                                className="dock-icon"
                                aria-label={name}
                                //1:03:29 accessible for all diff screens
                                data-tooltip-id="dock-tooltip"
                                data-tootltip-content={name}
                                data-tootltip-delay-show={150}
                                disabled={!canOpen} //1:03:55 disable the button if canOpen is false
                                onClick={() => toggleApp({id, canOpen})} //toggle the app  1:04:07
                            >
                                <img  //1:04:35 the icon image  
                                    src={`/images/${icon}`} 
                                    alt={name}
                                    loading="lazy"
                                    className={canOpen ? '' : 'opacity-60'} 
                                        //if cant open i will reduce the opacity so it seems nt clickable 1:05:00
                                    />
                            </button>
                    </div>  
                     ))}

                         {/* finally render the react tootltip package 1:05:17 npm i react-tooltip 1:06:00 */}
                        
                        <Tooltip
                                id="dock-tooltip"s
                                place="top"
                                className="tooltip"
                                />
                
               

        </div>

    </section>
  )


}

export default Dock
