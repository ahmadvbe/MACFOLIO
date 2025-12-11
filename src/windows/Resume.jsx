import { WindowControls } from "#components"
import WindowWrapper from "#hoc/WindowWrapper"
import { Download } from "lucide-react"

//npm i react-pdf   2:12:39 to render the actual doc
import "react-pdf/dist/Page/AnnotationLayer.css"
import "react-pdf/dist/Page/TextLayer.css"
import { Document, Page, pdfjs } from 'react-pdf'; 
pdfjs.GlobalWorkerOptions.workerSrc= new URL(
'pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url, ) .toString();


//2:10:35 develop the  portfolio/src/windows/Resume.jsx
const Resume = () => {
  return <>
    <div id="window-header"
        >
            <WindowControls     target="resume"/>
            <h2>Resume.pdf</h2>
            <a  href="files/resumee.pdf"
                download
                className="cursor-pointer"
                title="Download Resume"
                > 
                <Download  className="icon"/>
                </a>
    </div>
    {/* //render the actusal doc  -react pdf library
    //   npm i react-pdf    2:12:39*/}
    <Document 
      file="files/resumee.pdf"   
      >
        <Page  
          pageNumber={1}
          renderTextLayer
          renderAnnotationLayer
          /> 
      </Document>

  
  </>
}

//this is also a window so we add it to the windowWrapper 2:10:38
//to be allowed to be viewed in a window format
const ResumeWindow = WindowWrapper(Resume, //component
                                'resume') //windowKey

export default ResumeWindow
