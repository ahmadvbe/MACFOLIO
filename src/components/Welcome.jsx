import { useRef } from "react"
import { gsap } from "gsap"
import { useGSAP } from "@gsap/react"
//34:55 implementing Animation

//42:48
const FONT_WEIGHTS={
    subtitle:{min:100, max:400, default:100},
    title:{min:400, max:900, default:400}

}


// 38:30 logic of animating the characters one by one using a helper func
const renderText = (text, className, baseweight = 400) => {
    //spread the text into indivdual characters 39:09 --then map through each character
    return [...text].map((char, i) => (
        <span 
            key={i} 
            className={className}
            style={{fontVariationSettings: `'wght' ${baseweight}`}} //40:00
            >
                {char === " " ? "\u00A0" : char /* to render space correctly  40:20*/}   
            </span>
    ))

} //now that we actually have this helper function we can use it within our component 40:30
//we ll use it to render each piece of text we want to animate but split them char by char


//41:46 animate the text
const setupTextHover = (container, type) => {   
    if(!container) return //exit the function if the container does not exist
    //else get access to letters within the containers 
        const letters = container.querySelectorAll('span') //we ll target it by the span element
        //each span is a character 42:25


        //42:30 then figure out which style of animation 
        // we want to apply to each charac when hovered over
        //43:10 destruct the font weights from the FONT_WEIGHTS object
        const {min, max, default:base} = FONT_WEIGHTS[type] //for each specific type(title or subtitle) we get the min max and default weights
       
        //43:35 we can start animating each letter
        const animateLetter = (letter, weight, duration = 0.25) => { //important pieces to animate each letter
        return gsap.to(letter,  //44:05 we re animating each ketter individually
                {duration, //how long the animation should last
                ease: "power2.out", //44:35
                fontVariationSettings: `'wght' ${weight}` //animate the font weight to the target weight
            })
        }
        //now we have to caklk the animateLtter function when we hover over each letter 44:54
        const handleMouseMove = (e) => {
            //get access to the left portion of the container 45:14
            const {left} = container.getBoundingClientRect()
            //get access to the mouse position
            const mouseX = e.clientX -  left //relative to the container left position
            //now that we know where the mouse is we can loop through each letter and determine how far each letter is from the mouse
            letters.forEach((letter) => {//45:38
                //for each letter we need to get its position
                const {left: l, width:w} = letter.getBoundingClientRect() 
                
                //then we need to get the distance of our mouse movement 46:00
                const distance = Math.abs(mouseX - (l -left + w/2)) //distance between the mouse and the center of the letter
                
                //46:18 get the intensity of the effect based on the distance
                const intensity = Math.exp(-(distance ** 2) /20000)

                animateLetter(letter, min + (max - min) * intensity) //animate the letter based on the intensity

                    }
                )}

        //48:55
        const handleMouseLeave = () => {
            letters.forEach((letter) => {
                animateLetter(letter, base, 0.3) //animate each letter back to its base weight over 0.3 seconds
            })}

            
        //now we have to actullay call the handleMouseMove function 47:50
        // when we hover over the text containers -addevent listener for mousemove
        container.addEventListener('mousemove', handleMouseMove)
        //49:25 add event listener for mouse leave
        container.addEventListener('mouseleave', handleMouseLeave)

        //whenever additing event listeners we also need to clean them up to avoid memory leaks 49:34
        return () => {
            container.removeEventListener('mousemove', handleMouseMove)
            container.removeEventListener('mouseleave', handleMouseLeave)
        }
            }
         


//36:28 create 2 reACT references for animation
const Welcome = () => { 
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    //we ll use these refs to target the elements we want to animate
    //to interact with the actual elements in the DOM 36:45 

    //to actually turn on the animation 47:07
    useGSAP( () =>{
        
        const titleCleanup = setupTextHover(titleRef.current,'title') //47:28
        const subtitleCleanup = setupTextHover(subtitleRef.current,'subtitle') //47:30
        //49:50 cleanup
        return () => {
            titleCleanup()
            subtitleCleanup()
        }

        }, []) //dependencies array

  return (
    <section id="welcome" >
        <p //render a ptag to which we ll apply animation- to which i will attach the subtitle ref
        ref={subtitleRef}>
            {/* 40:35 use the render text helpwe  function create aboves */}
            {renderText(
                "HEY I'M AMAD WEBE , WELCOME TO MY", //text to animate
                 'text-3xl font-georama',//className to apply to each character
                  100 //baseweight
                  )}
        </p>

        <h1 ref={titleRef} className="mt-7">
            {renderText(
                "MacFolio", //text
                'text-9xl italic sfont-georama', //className
                400 //baseweight by default is set to 400
            )}
        </h1>   
        <div //in case we re dealing wid a small screen
            className="small-screen">
            <p>
                This portfolio is designed for DESKTOP/TABLET screen only.
            </p>

        </div>
        
    </section>
  )
}

export default Welcome
