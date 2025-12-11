

// ## 1:31:00 Implement a higher Order component HOC -
//  that can be easily reused for all the different windows
// act as a wrapper for all of our windows 1:31:25
//     git checkout -B feat/window-wrapper
//     1:31:55 reusable component instead of copying the boiler plate code
//     acting as a initial skeleton handling all of the repetetive tasks - HOC
//     1:32:26 portfolio/src/hoc/WndowWrapper.jsx
// this HOC is a function that will take a func as input then it will return an enhanced version of that component but before returning it it will wrap that compoenmnt with additional logic, 
// props and beahviors, without modifying the original componnent 

//recap: 1-implementing the window wrapper and corresponding animations - animation to open it jup
//2-implememntuing the dragging func using GSAP
//3-hidden all windows at the start so u hvs to click on them to open them
//we re doing all of that only omnce in our entire codebase bcz we re wrapping all the elements
//that r using that functionalities within a HOC 
//the terminal window for example has no idea abt wt is happening
//the functions are taking place when we wrap it within the WindowWrapper

import React, { useLayoutEffect, useRef } from "react";
import useWindowStore from "#store/window.js";
import { useGSAP } from "@gsap/react";
import gsap from "gsap"
import { Draggable } from "gsap/Draggable";

// 1:33:15 portfolio/src/hoc/WndowWrapper.jsx
//     every HOC has to accept a component an input   

const WindowWrapper = (Component, windowKey) => {
    //define how will the wrapped component looks like
    const Wrapped = (props) =>{
        //get acces to the variables and funcs from the windows store 1:33:40
        const {focusWindow, windows } = useWindowStore()    
        
       
        //1:33:57 get the window that we re currently openeing 
        const {isOpen, zIndex} = windows[windowKey] //returning the data for that specific window

        //1:34:28 create a new ref to be used to manage the animations
        const ref = useRef(null)


//         ## 1:44:50 head over to portfolio/src/hoc/WindowWrapper.jsx to implememnt the functionality 
// allowing us to open/close/focus/drag and drop this windows around
        useGSAP(() =>{
            const el = ref.current//get access to the current element 
            if(!el || !isOpen) return //exit out of this func

            //else if the element is there --> change its style display to be set to bloc
            el.style.display= 'block' //by default all the windows will be turned off 1:44:53
            
            //## 1:47:13 adding a quick opening animation
            gsap.fromTo(el, 
                         {scale: 0.8, opacity:0, y: 40 },
                         {scale: 1, opacity:1, y: 0, duration: 0.4, ease: "power3.out" },
                      )
        }, [isOpen]) //whenever the isOpen changes the inner code will be rerun

        //1:46:00 but how can we make the windows to turn off at the start 
        useLayoutEffect(() =>{ 
            //similar to useEffect but this one fires synchronously after all the DOM mutations
             const el =ref.current//get access to the current element 
             if (!el) return
             el.style.display= isOpen? "block" : "none"
        },[isOpen])//to be rerun on the change of the isOpen state
        //byt defaut all lof our apps hve an isOpen= false =>hidden at the start

 //        ## 1:48:50 make the windows draggable
        useGSAP( ()=>{
            const el = ref.current //get access to the current element 
            if (!el) return
            //we re creating a draggabble effect 1:49:18
            const [instance] = Draggable.create(el,  //we re creating a draggable effect on thuis specific element 
                            {onPress: ()=> focusWindow(windowKey) } //once we click it i wana call a callback func that will focus that window
                            //the focus windows will be increase the zIndex of the chosen window 1:50:00
                             )
                             
            //1:50:10 to make our app efficient we hve to kill the instance of this draggable functionality
            return () => instance.kill() //that way we re gonna kkeep trackk of only the window that we clicked on
        }, []) //they always need to be draggable so its empty



        //1:34:38 finally from this wrapped component we will return 
        return <section
            id={windowKey}  
            ref={ref}
            style={{zIndex}} //this will be the reason why the windoes will appear over 
            // one another when u click or drag them 1:35:00
            className="absolute"
            >
                {/* wrap the component which is passed as prop and we re gonna
                 wrap it with the store logic defined above 1:35:38*/}
                <Component 
                    {...props} //spread all the props that we will later on decide to pass into this component 
                    />

        </section>
    }

    //now just before we return it from this window wrapper  1:36:00
    //that way we re defining which component is this window actually wrapping
    Wrapped.displayName = `WindowWrapper(${
               Component.displayName 
              || Component.name |
               "Component"
    }`  //define dynamically the display anme of the component

  return Wrapped //return the wrapped component 
    
  
}

export default WindowWrapper
