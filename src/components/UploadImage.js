import { useEffect } from "react";
import {useDropzone} from 'react-dropzone';


const UploadImage = ({selectedImage, setSelectedImage, setImageData, setIsRejectedFile}) => {

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

  const getBase64 = selectedImage => {
    let reader = new FileReader()
    reader.readAsDataURL(selectedImage)
    reader.onload = () => {
      setImageData(reader.result.split(',')[1])
    };
  };

  useEffect(()=> {
    setSelectedImage(acceptedFiles[0])
  }, [acceptedFiles])

  useEffect(()=> {
    if (selectedImage) {
      getBase64(selectedImage)
      setIsRejectedFile(false)
    } else {
      setImageData(null)
      if(fileRejections[0]) setIsRejectedFile(true)
    }
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