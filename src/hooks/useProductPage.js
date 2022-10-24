import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert'
import { deleteCakeById } from '../redux/slices/cakesSlice';


export const useProductPage = () => {

  const history = useHistory()
  const dispatch = useDispatch()

  const zoomInOrOut = (e) => {
    e.target.classList.toggle('zoom-in-image');
    e.target.classList.toggle('zoom-out-image');
  }

  const zoomOutWhenClickOutOfImage = e => {
    if (!(e.target).closest('.product-image')) {
      document.getElementsByClassName('product-image')[0]?.classList.remove('zoom-in-image');
      document.getElementsByClassName('product-image')[0]?.classList.add('zoom-out-image');          
    }        
  }
  
  const moveImageWithMouse = e => {
    // This gives the position of the image on the page
    const bbox = e.target.getBoundingClientRect();

    // measure how far into the image the mouse is in both x and y directions
    const mouseX = e.clientX - bbox.left;
    const mouseY = e.clientY - bbox.top;

    // work out how far through the image as a percentage the mouse is
    const xPercent = (mouseX / bbox.width) * 100;
    const yPercent = (mouseY / bbox.height) * 100;

    // change the `transform-origin` css property on the image to center the zoom effect on the mouse position
    e.target.style.transformOrigin = xPercent+'% ' + yPercent+ '%';
  }

  const deleteCake = (id, userToken) => {
    swal({
      title: "Are you sure?",
      icon: "warning",
      buttons: true,
      dangerMode: true,})
    .then(toDelete => {
      if (toDelete) {
        fetch('/cakes/'+id, {
          method: 'DELETE',
          headers: {'Authorization': 'Bearer ' + userToken },
        })
        .then(res=>res.json())
        .then(cake => {
          if (cake.error) swal({
            title: "Can't delete Cake",
            text: cake.error,
            icon: "error"
          })
          else {
            swal("Poof!", { icon: "success",})
            .then(()=>dispatch(deleteCakeById(id)))
            .then(()=>history.push('/'))
          }
      })
      }
    })
    .catch(e=> console.log('error occured: ', e))
  }

  return {deleteCake, zoomInOrOut, zoomOutWhenClickOutOfImage, moveImageWithMouse}
}