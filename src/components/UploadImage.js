import { useEffect, useState } from "react";
import {useDropzone} from 'react-dropzone';


const UploadImage = () => {

  const [selectedImage, setSelectedImage] = useState(null);
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  useEffect(()=> {
    setSelectedImage(acceptedFiles[0])
  }, [acceptedFiles])

  return (
    <div className="upload-image"> 
       
      { selectedImage ? 
        <div className="image">
          <img alt="not fount" src={URL.createObjectURL(selectedImage)} />
          <button className="third-button" onClick={()=>setSelectedImage(null)}>Remove</button>
        </div>
      :
        <section className="dropzone-container" >
          <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag Image</p>
          </div>
        </section>
      }

    </div>
  );
};

export default UploadImage;