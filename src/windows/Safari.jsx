// ## 1:57:50 SAFARI component - browser part of our app

import { WindowControls } from "#components"
import { blogPosts } from "#constants"
import WindowWrapper from "#hoc/WindowWrapper"
import { ChevronLeft, ChevronRight, Copy, MoveRight, PanelLeft, Plus, Search, Share, ShieldHalf } from "lucide-react"

//1:59:15
const Safari = () => {
  return (
  <>
    <div id="window-header">
        <WindowControls target="safari" />
        <PanelLeft className="ml-10 icon"/>

        <div className="flex items-center gap-1 ml-5">
            {/* back and forwards iconss */}
            <ChevronLeft className="icon"/>
            <ChevronRight className="icon"/>
        </div>

        <div className="flex-1 flex-center gap-3">
            {/* to let us knwo that safari is protecting our browsing 2:02:00 */}
            <ShieldHalf className="icon" />
            <div className="search">
                <Search className="icon"/>
                <input 
                    type="text" 
                    placeholder="Search or enter website name" 
                    className="flex-1" />
            </div>
        </div>
      
      <div className="flex items-center gap-5">
        <Share className="icon"/>
        <Plus className="icon"/>
        <Copy className="icon"/>

      </div>
    </div> 

    {/* 2:03:37 */}
    <div className="blog">
        <h2>My Developer Blog</h2>
        <div className="space-y-8">
            {blogPosts.map(({id, image, title, date, link}) =>(
                <div key={id} className="blog-post">
                    <div className="col-span-2">
                        <img 
                            src={image}
                            alt={title}
                            />
                    </div>
                    {/* 2:06:00 content div*/}
                    <div className="content">
                        <p>{date}</p>
                        <h3>{title}</h3>
                        <a 
                            href={link} 
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                            Checkout the full Post <MoveRight className="icon-hover"/>
                            </a>
                    </div>


                </div>
            )
            )
            }
        </div>

    </div>
  </>
  )
}
//1:59:50 we wana wrap it into a windows wrapper
const SafariWindow = WindowWrapper(Safari,'safari')

export default SafariWindow
