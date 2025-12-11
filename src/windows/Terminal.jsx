
import WindowControls from "#components/WindowControls"
import { techStack } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import { Check, Flag} from "lucide-react"

const Terminal = () => { 
  return (
    <>
    <div id="window-header" >
            <WindowControls target="terminal" />
            <h2>Teck Stack</h2>
    </div>
    
    <div  className="techstack">
        <p>
            <span className="font-bold">@AMAD %</span>
            show tech stack
        </p>
        <div className="label">
          <p className="w-32">Category</p>
          <p>Technologies</p>
        </div>

          {/* //1:41:27 */}
          <ul className="content">
            {techStack.map(({category, items}) => (
              <li 
                  key={category} 
                  className="flex items-center">
                <Check className="check" size={20}/>
                <h3>{category}</h3>
                <ul>
                  {items.map((item, i) =>( 
                    <li key={i}>
                      {item} 
                        {/* //1:43:40 that way it doesnt add the comma for the last one */}
                        {i < items.length -1 ? ",": ""} 
                    </li>

                  ))}
                </ul>
              </li>
            ))}
          </ul>

          {/* 1:43:55 */}
          <div className="footnote">
            <p>
              <Check size={20}/>
              5 of 5 stacks loaded successfully (100%)
            </p>
            <p className="text-black">
              <Flag size={15} fill="black"/>
              Render Time: 6ms
            </p>

          </div>
        </div>
    

    </>
  )
}
    {/* to make it seeem in a window 1:39:15
    we wrap it within a HOC   which takes a component as input and return a modified version component */}

//the terminal window for example has no idea abt wt is happening 1:51:15
//the functions are taking place when we wrap it within the WindowWrapper
const TerminalWindow = WindowWrapper(Terminal,"terminal")
//then we export the modified version  Terminal Window instead of the Terminal
export default TerminalWindow
