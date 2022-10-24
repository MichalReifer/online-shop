import { useEffect } from "react";
import {useDropzone} from 'react-dropzone';


const UploadImage = ({selectedImage, setSelectedImage, setIsRejectedFile}) => {

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections
  } =  useDropzone({
    accept: {
      'image/jpeg': [],
      'image/png': []
    }
  })

  useEffect(()=> {
    setSelectedImage(acceptedFiles[0])
  }, [acceptedFiles])

  useEffect(()=> {
    if (selectedImage) setIsRejectedFile(false)
    else if(fileRejections[0]) setIsRejectedFile(true)
  }, [selectedImage, fileRejections])

  return (
    <div className="upload-image"> 

      { selectedImage ? 
        <div className="image">
          <img alt="not fount" src={URL.createObjectURL(selectedImage)} />
          <button className="third-button" onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      :
        <section className="dropzone-container" >
          <div {...getRootProps({className: 'dropzone'})} id="dropzone">
            <input {...getInputProps()} />
            <p>Drag Image</p>
          </div>
        </section>
      }

    </div>
  );
};

export default UploadImage;