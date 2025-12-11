import { WindowControls } from "#components"
import { locations } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import useLocationStore from "#store/location.js"
import useWindowStore from "#store/window.js"
import clsx from "clsx"
import { Search } from "lucide-react"


const Finder = () => {


    //2:25:25 destrcut
    const {activeLocation, setActiveLocation} = useLocationStore()
    //2:34:13
    const {openWindow} = useWindowStore()

    const openItem = (item) => { //2:34:00
        if(item.fileType ==='pdf') return openWindow("resume") 
        //2:34:44 open folders
    if(item.kind ==='folder') return setActiveLocation(item)   
        //2:35:15 link opening, fig
    if(['fig','url'].includes(item.fileType) && item.href)
        return window.open(item.href, "_blank") 

    //text and image files 2:36:50 -- implement an image viewer or a text viewer
    //code out the ability to open a preview or a text file
        openWindow(`${item.fileType}${item.kind}`, item)
    //2:37:30 - 2:38:00 WID JUNIE -2:41:09
    

    }

    //2:28:20 to make our jsx part of the code significantly cleaner
    const renderList = (listname,items) => (
        <div>
            <h3>{listname}</h3>

            <ul>{items.map((item) =>(
                    <li
                      key={item.id}
                      onClick={ () => setActiveLocation(item) } //2:25:35
                      
                      //2:26:20 to figure out which one is currently active
                      //add additoinal className to this <li>
                      //to add dynamic classNames using tailwind npm i clsx
                      className={clsx(item.id ===activeLocation.id? 'active':'not-active')}

                      >
                        <img src={item.icon}
                                className="w-4"
                                alt={item.name}
                            />
                            <p className="text-sm font-medium truncate">
                                {item.name}
                            </p>
                    </li>
            ))}
                    </ul>
                </div>
    )

    //2:32:25 openItem () to be used onclick
    // /* how do we open these items 2:33:44 using this func*/
    

                
  return (
  <>
    <div id="window-header">
        <WindowControls target="finder"/>
        <Search className="icon" />
      
    </div>  


    <div className="bg-white flex h-full">
        <div className="sidebar">
                {renderList('Favorites',Object.values(locations))}
                {renderList('My Work Done',locations.work.children)}
        </div>

            {/* 2:31:20 show the actual content next to our sidebar*/}
    <ul className="content">
        {activeLocation?.children.map((item) =>(
            <li key={item.id}
                className={item.position}
                /* how do we open these items 2:33:44 using this func*/
                onClick={() => openItem(item)}
                >
                    <img 
                        src={item.icon}
                        alt= {item.name}
                     />
                     <p>{item.name}</p>

                </li>
        ))}

    </ul>
        
    </div>


  </>
  )
}
//2:23:35 wrap it with the windowsWrapper
const FinderWindow = WindowWrapper(Finder, //component
                                  "finder" //key
                                )

export default FinderWindow //2:23:48
