import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import UploadImage from "./UploadImage"
import { useHistory } from "react-router-dom"


const EditCakeModule = ({cake, setCake}) => {

  const [selectedImage, setSelectedImage] = useState(null);
  const [isRejectedFile, setIsRejectedFile] = useState(false)
  const [imageData, setImageData] = useState(null)

  const [displayMessage, setDisplayMessage] = useState('none')
  const [validationMessage, setValidationMessage] = useState('please fill in all fields')

  const currentUser = useSelector(state => state.currentUser)
  const history = useHistory()

  const popUp = document.getElementById('edit-cake-popup')
  const title = document.getElementById('title')
  const category = document.getElementById('category')
  const price = document.getElementById('price')
  const description = document.getElementById('description')
  const imageDropzone = document.getElementById('dropzone')

  const removeInputError = () => {
    title?.classList.remove('inputerror')
    category?.classList.remove('inputerror')
    price?.classList.remove('inputerror')
    description?.classList.remove('inputerror')
    imageDropzone?.classList.remove('inputerror')
  }

  const closePopup = () => {
    popUp?.firstChild.classList.add("module-hide")
    popUp?.firstChild.classList.remove("module-show")
    popUp?.classList.remove('popup-container-color')
    setDisplayMessage('none')
    removeInputError()
  }

  document.addEventListener("click", e => {
    if(e.target.id ==='edit-cake-popup')
      closePopup()
  })

  document.addEventListener('animationend', e=>{
    if (e.animationName === 'moduleHide')
      popUp?.classList.add('hidden')
  })

  useEffect(()=> {
    if(isRejectedFile){
      setDisplayMessage('flex')
      setValidationMessage('File type must be of type JPEG or PNG')
      imageDropzone.classList.add('inputerror')
    }
  }, [isRejectedFile])

  const editCake = () => {
    setDisplayMessage('none')
    let cakeDetails = {}

    if (category.value && category.value !== cake.category) cakeDetails.category = category.value
    if (price.value && price.value !== cake.price) cakeDetails.price = price.value
    if (description.value && description.value !== cake.description) cakeDetails.description = description.value
    if (imageData) cakeDetails.image = imageData
    if (title.value && title.value !== cake.title) {
      cakeDetails.title = title.value
      cakeDetails.cakeId = title.value.toLowerCase().replaceAll(" ", "_").replaceAll("_cake", "")
    }
    
    // console.log(cakeDetails)

    if (!Object.keys(cakeDetails).length) closePopup()
    else
      fetch('/cakes/'+cake._id, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser.userToken
        },
        body: JSON.stringify(cakeDetails)
      })
      .then(res =>res.json())
      .then(res=>{
        if (res.error) throw Error(res.error)
        else {
          console.log(res)
          document.querySelector('.popup-form').reset()
          setSelectedImage(null)
          closePopup()
          setCake(cake=>{return{...cake, ...cakeDetails}})
          if (cakeDetails.title) history.push(`/products/${cakeDetails.cakeId}`)
        }
      })
      .catch(err=>{
        console.log(err)
        if (/cakeId/i.test(err.message)) setValidationMessage("Title is already in use")        
        else setValidationMessage(err.message)
        setDisplayMessage('flex')
      })
  }

  return (

    <div id="edit-cake-popup" className="popup-module-container hidden" >
    <div className="popup-module" >
  
      <div className="popup-title">Edit Cake</div>
      <form className="popup-form">
        <input className="popup-input" id="title" placeholder="Title" autoFocus></input>
        <select className="popup-input" id="category" required>
          <option value="" className="unselect">Category</option>
          <option value="Cookie Cakes">Cookie Cakes</option>
          <option value="Cream Cakes">Cream Cakes</option>
          <option value="Chocolate Cakes">Chocolate Cakes</option>
          <option value="Classic Cakes">Classic Cakes</option>
          <option value="Crazy Cakes">Crazy Cakes</option>
          <option value="Other">Other</option>
        </select>
        <input className="popup-input" type="number" id="price" placeholder="Price" min="0" ></input>
        <textarea className="popup-input" placeholder="Description" id="description"></textarea>
        <UploadImage {...{selectedImage, setSelectedImage, setImageData, setIsRejectedFile}} />
      </form>
  
      <div id="add-cake-message" className="popup-validation-message" 
      style={{display:displayMessage}}
      >
        {validationMessage}
      </div>
  
      <div className="actions">
        <button onClick={editCake}>OK</button>
        <button className="cancel-button" onClick={closePopup}>Cancel</button>
      </div>
  
    </div>
  </div>
  
  );
}
 
export default EditCakeModule;