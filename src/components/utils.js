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

const passwordValidate = (string) => {
    return /^[a-zA-Z0-9.+_-]{5,24}$/.test(string) ? 'valid' : 'invalid'
}

const preConfirmSignIn = async (firebase, user) => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');


    email.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");
        
    if (!email.value){
        email.classList.add("swal2-inputerror");
        Swal.showValidationMessage('please fill in your email address');
    } else  if (!password.value){
        password.classList.add("swal2-inputerror");
        Swal.showValidationMessage('please enter your password');
    } else if (emailValidate(email.value)==='invalid') {
        Swal.showValidationMessage('email address is invalid');
        email.classList.add("swal2-inputerror");
    } else if (password.value && passwordValidate(password.value)==='invalid') {
        Swal.showValidationMessage('password should have at least 5 characters and can use only english letters, digits and/or meta characters.');
        password.classList.add("swal2-inputerror");
    } else {
        user = await firebase.signIn(email.value, password.value);
        console.log(user)
        if(!user){
            Swal.showValidationMessage('invalid email or password');
            email.classList.add("swal2-inputerror");
            password.classList.add("swal2-inputerror");
        }
    }
    return user;
}

export const signIn = async (firebase) => {
    let user = null;
    await Swal.fire({
        title: 'Enter Your Details',
        html:
          '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
          '<input id="password" class="swal2-input" type="password" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: async () => { 
            user = await preConfirmSignIn(firebase, user);
        }
    })
    return user;
}

const preConfirmSignUp = async (firebase, totalPrice) => {

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const password = document.getElementById('password');

    name.classList.remove("swal2-inputerror");
    email.classList.remove("swal2-inputerror");
    address.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");
    
    let userExists = await firebase.getUserByUserEmail(email.value).then(result=>result);
    if (userExists){
        Swal.showValidationMessage('this email is already registered. use sign in instead.');
        email.classList.add("swal2-inputerror");
    }
    else if (!name.value||!email.value||!address.value||!password.value){
        Swal.showValidationMessage('please fill in all fields');
        if (!name.value){name.classList.add("swal2-inputerror");}
        if (!email.value){email.classList.add("swal2-inputerror");}
        if (!address.value){address.classList.add("swal2-inputerror");}
        if (!password.value){password.classList.add("swal2-inputerror");}
    }
    else if (email.value && emailValidate(email.value)==='invalid') {
        Swal.showValidationMessage('email address is invalid');
        email.classList.add("swal2-inputerror");
    } else if (password.value && passwordValidate(password.value)==='invalid') {
        Swal.showValidationMessage('password should have at least 5 characters and can use only english letters, digits and/or meta characters.');
        password.classList.add("swal2-inputerror");
    } else {
        firebase.signUp(email.value, password.value);
        const userID = Math.random().toString(36).substr(2, 9);
        const user = {'userID': userID, 'name': name.value, 'email': email.value, 'address': address.value};
        // console.log(user);
        return user
    }
}

// const button = document.getElementById('sign-in-button');

// if (button){
//     button.addEventListener('click', event => {
//     button.textContent = `Click count: ${event.detail}`;
//     signIn()
//     })
// }

export const signUp = async (firebase, history, totalPrice) => {

    let user = null;
    await Swal.fire({
        title: 'Enter Your Details',
        html:
          '<input id="name" class="swal2-input" type="name" placeholder="Name">' +
          '<input id="email" class="swal2-input" type="email" placeholder="Email">'+
          '<input id="address" class="swal2-input" type="address" placeholder="Delivary Address">'+
          '<input id="password" class="swal2-input" type="password" placeholder="Password">',
        focusConfirm: false,
        showCancelButton: true,
        showDenyButton: true,
        denyButtonText: 'Sign In',
        denyButtonColor: 'purple', 
        // footer: '<div class="checkout-footer">'+
        //             '<p>already have an account?</p>'+
        //             '<button class="swal-button swal2-styled" id="sign-in-button">Sign In</button>'+
        //         '</div>',
        preConfirm: async ()=> { 
            user = await preConfirmSignUp(firebase, totalPrice);
            return user;
        }
    }).then(result=>{
        // console.log(result)
        if(result.isDenied){
            user = signIn(firebase);
        }
        else if (result.value) {
            firebase.setUser(result.value);
        }
    })
    return user;
}

export const checkout = async (firebase, history, totalPrice) => {

    let user = null;
    const currentUser = firebase.getCurrentUser();
    // console.log(currentUser);
    // console.log(currentUser.email);
    if (currentUser){ 
        await Swal.fire({
            title: `checkout as ${currentUser.email}?`,
            icon: 'question',
            showCancelButton: true,
            focusConfirm: false
        }).then(result=>{
            if(result.isConfirmed){
                user = currentUser; 
            }
        })
    } else {
        user = await signUp(firebase, history, totalPrice);
    }

    if (user){     
        const orderID = Math.random().toString(36).substr(2, 9);
        const order = {'orderID': orderID, 'made-by': user.email ,'total-price': totalPrice, 'products': JSON.parse(localStorage.getItem('order')),
                            'time': new Date().toLocaleString()};

        firebase.setOrder(order);

        Swal.fire({
            title: 'order completed',
            text: 'an email is sent to you with the order details and a link for payment',
            icon: 'success'})
        localStorage.removeItem('order');
        history.push('/');
    }
}