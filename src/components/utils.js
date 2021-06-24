import swal from 'sweetalert';
import Swal from "sweetalert2";


/* ProductPage component */
export const addToCart = (cakeId, history) => {
    let storage = localStorage.getItem('order');
    if (storage){
        if (!storage.includes(cakeId)) {
            let order = JSON.parse(storage);
            order[cakeId] = 1;
            storage = JSON.stringify(order);
            localStorage.setItem('order', storage);
            swal("Added To Cart!", { 
                icon: "success",
                buttons: ['Keep Shopping', 'Go To Cart']})
            .then(cart=> {if (cart){history.push("/cart");}})
        }
        else{ swal('This item is already in cart.', {
            icon: 'error',
            buttons: ['Keep Shopping', 'Go To Cart']})
            .then(cart=> {if (cart){history.push("/cart");}})
        }
    }
    else{
        localStorage.setItem('order', `{"${cakeId}": 1}`);
        swal("Added To Cart!", { 
            icon: "success",
            buttons: ['Keep Shopping', 'Go To Cart']})
        .then(cart=> {if (cart){history.push("/cart");}})
    }
}

/* Cart component */
export const removeFromCart = (cakeId, products, setProducts, setOrder) => {
    swal({
        title: "Are you sure?",
        text: "This cake looks yummy!",
        icon: "warning",
        buttons: true,
        dangerMode: true,})
    .then((toDelete) => {
        if (toDelete) {
            let order = JSON.parse(localStorage.getItem('order'));
            delete order[cakeId];
            setOrder(order)
            localStorage.setItem('order', JSON.stringify(order));
            setProducts(products.filter(product=>product.cakeId!=cakeId))
          swal("Poof!", { icon: "success",})
        }})
    .catch(e=> console.log('error occured: ', e))
}


/* Cart component - Checkout Functions */
const emailValidate = (string) => {
    return /^[a-zA-Z0-9.+_-]+@[a-zA-Z0-9.-]+\.[a-zA-Z0-9-]{2,24}$/.test(string) ? 'valid' : 'invalid'
}

export const preConfirmFunction = async (getUserByUserEmail, totalPrice) => {

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');

    name.classList.remove("swal2-inputerror");
    email.classList.remove("swal2-inputerror");
    address.classList.remove("swal2-inputerror");

    if (!name.value||!email.value||!address.value){
        Swal.showValidationMessage('please fill in all fields');
        if (!name.value){name.classList.add("swal2-inputerror");}
        if (!email.value){email.classList.add("swal2-inputerror");}
        if (!address.value){address.classList.add("swal2-inputerror");}
    }
    else if (email.value && emailValidate(email.value)==='invalid') {
        Swal.showValidationMessage('email address is invalid');
        email.classList.add("swal2-inputerror");
    } else {
        const orderID = Math.random().toString(36).substr(2, 9);
        const order = {'orderID': orderID, 'made-by': email.value ,'total-price': totalPrice, 'products': JSON.parse(localStorage.getItem('order')),
            'time': new Date().toLocaleString()};
        let userExists = await getUserByUserEmail(email.value).then(result=>result);
        let user = null;

        if(userExists){
            user = userExists;
            user.orders.push(orderID);
            user.name = name.value;
            user.address = address.value;
        } else{
            const userID = Math.random().toString(36).substr(2, 9);
            user = {'userID': userID, 'name': name.value, 'email': email.value, 'address': address.value, 'orders': [orderID]};
        }

        return [user, order]
    }
}

export const checkout = async (firebase, history, totalPrice) => {

    const { value: details} = await Swal.fire({
        title: 'Enter Your Details',
        html:
          '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
          '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
          '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: async ()=> { 
            return await preConfirmFunction(firebase.getUserByUserEmail, totalPrice);
        }
    })
    
    if (details) {
        const [user, order] = details;
        firebase.setOrder(order);
        firebase.setUser(user);
        Swal.fire({
            title: 'order completed',
            text: 'an email is sent to you with the order details and a link for payment',
            icon: 'success'})
        localStorage.removeItem('order');
        history.push('/');
    }
}