import { socials } from '#constants'
import WindowWrapper from '#hoc/WindowWrapper'
import { WindowControls } from "#components" 
//    2:45:30 Contact Info
//         portfolio/src/windows/Contact.jsx
const Contact = () => {
  return (
    <>
    <div //acting as a window header
        id="window-header">
            <WindowControls target="contact" /> 
            <h2>
                Contact Me
            </h2>
      
    </div>
    <div //2:46:50
        className='p-5 space-y-5'
        >
            <img  src="/images/adrian.jpg"
                    alt="AMAD"
                    className="w-20 rounded-full"/>
            <h3>Let's Connect</h3>
            <p>
                Got an idea? A project? Or just want to say hi? Feel free to reach out to me via email at  
                <a href="mailto:ahmad.vbe@gmail.com" className='font-extrabold'> ahmad.vbe@gmail.com</a>.
            </p>

            <ul //2:47:50
            >
                {socials.map(({id, bg, link, icon, text}) =>(
                    <li key={id} 
                        style={{backgroundColor: bg}}>
                        <a 
                            href={link}
                            target="_blank" //opens up on new screen
                            rel="noreferrer"
                            title={text}
                            >
                            <img src={icon} 
                                alt={text} 
                                className='size-5'/>
                            <p>
                                {text}
                            </p>
                        </a>
                    </li>
                ))}
            </ul>
    </div>
    </>
  )
}

const ContactWindow = WindowWrapper(Contact, 
                                    "contact")

export default ContactWindow
