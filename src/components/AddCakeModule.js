import UploadImage from "./UploadImage"

const AddCakeModule = () => {

  const popUp = document.getElementById('add-cake-popup')

  const closePopup = () => {
    popUp?.firstChild.classList.add("module-hide")
    popUp?.firstChild.classList.remove("module-show")
  }

  document.addEventListener('animationend', e=>{
    if (e.animationName === 'moduleHide')
      popUp?.classList.add('hidden')
  })

  document.addEventListener("click", e => {
    if(e.target.id ==='add-cake-popup')
      closePopup()
  })

  return (
    <div id="add-cake-popup" className="popup-module-container hidden" >
      <div className="popup-module" >

        <div className="popup-title">Add New Cake</div>
        <form className="popup-form">
          <input className="popup-input" id="title" placeholder="Title" autoFocus></input>
          <select className="popup-input" id="category" required>
            <option value="" className="unselect">Category</option>
            <option value="Cookie">Cookie Cakes</option>
            <option value="Cream">Cream Cakes</option>
            <option value="Chocolate">Chocolate Cakes</option>
            <option value="Classic">Classic Cakes</option>
            <option value="Crazy">Crazy Cakes</option>
            <option value="Other">Other</option>
          </select>
          <input className="popup-input" type="number" id="price" placeholder="Price" min="0" ></input>
          <textarea className="popup-input" placeholder="Description"></textarea>
          <UploadImage />
        </form>

        <div className="actions">
          <button>OK</button>
          <button className="cancel-button" onClick={closePopup}>Cancel</button>
        </div>

      </div>
    </div>
  );
}
 
export default AddCakeModule;