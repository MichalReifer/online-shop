import Swal from 'sweetalert2';


export const useUserPage = () => {

  const changeUserDetails = async () => {
    await Swal.fire({
      title: 'Enter Your Details',
      html:
      '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
      '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">',
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: async ()=> { 
        const name = document.getElementById('name').value;
        const address = document.getElementById('address').value;
        // user = await firebase.updateProfile(name, address);
      }
    })
  }

  const changePassword = async () => {    
    Swal.fire({
      title: 'a password reset link is sent to your email address.',
      icon: 'success'
    })
  }

  const showOrHideProducts = (index) => {
    const orderProducts = document.getElementsByClassName("order-products");
    if(orderProducts[index].style.maxHeight === '246px'){
        orderProducts[index].style.maxHeight = '0'
    }else{
        for (let i=0; i<orderProducts.length; i++){
            orderProducts[i].style.maxHeight = '0';
        }
        orderProducts[index].style.maxHeight = '246px'
    }
}


  return { changeUserDetails, changePassword, showOrHideProducts }
}