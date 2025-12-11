//20:30

import { navIcons, navLinks } from "#constants"
import useWindowStore from "#store/window.js"
import dayjs from "dayjs"


const Navbar = () => { //21:30
        //2:09:40 get the open window functionality 
        const {openWindow} = useWindowStore()

  return (
    <nav //we re applying styles to this component using the index.css
        >
        <div //left portion
        >
            <img    
                src="/images/logo.svg"
                alt="logo"
                >
            </img>

            <p className="font-bold">
                AMAD'S PORTFOLIO
            </p>

            <ul //23:04
                >
                    {navLinks.map(({id, name, type}) => ( //automatic return  23:40 no { } needed 
                                    // and we can use ( ) and we no need to return anymore
                                    //auto return wtever is within it
                        <li 
                            key={id}
                            >
                            <button
                                className="cursor-pointer"
                                onClick={() => openWindow(type)}
                                type="button"
                            >
                                {name}
                            </button>
                        </li>
                    ))}

            </ul>
        </div>

         <div //right portion 27:55
        >
            <ul>
                {navIcons.map(({id, img}) => (
                    <li key={id}>
                        <img 
                            src={img} 
                            className="icon-hover"
                            alt={`icon-${id}`}
                            />
                    </li>
                )
                
                )}
            </ul>

            <time>
                {dayjs().format("ddd MMM D h:mm A YYYY")}
            </time>

        </div>
    </nav>
  )
}

export default Navbar
