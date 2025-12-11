import WindowWrapper from "#hoc/Windowwrapper.jsx"
import { WindowControls } from "#components" 
import useWindowStore from "#store/window.js"

    // 2:43:10 IMplementing the image viewer window
    //     portfolio/src/windows/Image.jsx -- using Junie. 2:43:54

const Image = () => {
    const {windows} = useWindowStore(); //2:41:30
    const data = windows.imgfile?.data; // get the data from the image window

if (!data) return null;

const { name, imageUrl} = data; //destruct all the properties dfrom the data

return (
    <>
        <div  //2:44:08
            id="window-header" >
            <WindowControls target="imgfile" /> 
            <h2>{name}</h2>
        </div>


        <div className="p-5 bg-white"> 
            {imageUrl ? ( //check whether an image exists
                <div className="w-full">
                    <img 
                            src={imageUrl} 
                            alt={name}
                            className="w-full h-auto max-h-[70vh] object-contain rounded"
                             />
                    </div>
                ) : null}

        </div>
    </>
  )
} 

const ImageWindow = WindowWrapper(Image, "imgfile")
export default ImageWindow;
