
export const useProductPage = () => {

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

  return {zoomInOrOut, zoomOutWhenClickOutOfImage, moveImageWithMouse}
}