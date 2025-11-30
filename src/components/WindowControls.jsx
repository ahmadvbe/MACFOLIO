//## 1:51:30 create a compoennt for the windows ... upper left controls

import useWindowStore from "#store/window.js";

     //   we ll create a reusable component for this
const WindowControls = ({target}) => {

    const {closeWindow} = useWindowStore()

  return (
    <div id="window-controls"> 
        <div className="close" 
            onClick={ () => closeWindow(target)} />

        <div className="minimize" onClick={closeWindow}/>
        <div className="maximize" onClick={closeWindow}/>
      
    </div>
    )
  
}

export default WindowControls
