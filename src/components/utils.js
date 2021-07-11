import firebase from 'firebase';
import swal from 'sweetalert';
import Swal from "sweetalert2";


/* Search component */
export const sortProducts = (products, field) =>{
    products?.sort((a, b)=>{
        const nameA = a[field];
        const nameB = b[field];
        if (nameA < nameB) {
            return -1;
        }else if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    return products;
}

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

const preConfirmSignIn = async (firebase) => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    let user = null;

    email.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");
        
    if (!email.value){
        email.classList.add("swal2-inputerror");
        email.focus();
        Swal.showValidationMessage('please fill in your email address');
    } else if (emailValidate(email.value)==='invalid') {
        Swal.showValidationMessage('email address is invalid');
        email.classList.add("swal2-inputerror");
        email.focus();
    } else if (!password.value){
        password.classList.add("swal2-inputerror");
        password.focus();
        Swal.showValidationMessage('please enter your password');
    } else {
        user = await firebase.signIn(email.value, password.value);
        if(!user){
            Swal.showValidationMessage('invalid login, please try again');
            email.classList.add("swal2-inputerror");
            password.classList.add("swal2-inputerror");
            password.focus();
        }
    }
    return user;
}

const forgotPasswordHandler = async (firebase)=>{
    const email = document.getElementById('email');
    const link = document.getElementById('forgot-password');
    link.addEventListener('click', async event => {        
        const approve = await firebase.changePassword(email.value);
        if (approve){
            Swal.fire({
                title: 'a password reset link is sent to your email address.',
                icon: 'success'
            })
        } else {
            email.classList.add("swal2-inputerror");
            email.focus();
            if (!email.value){
                Swal.showValidationMessage('please fill in your email address');   
            } else {
                Swal.showValidationMessage('email address is invalid');   
            }
        }
    })
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
        allowEnterKey: true,
        footer: '<div class="forgot-password-footer">'+
        '<a id="forgot-password">forgot password?</a>'+
        '</div>',
        preConfirm: async () => { 
            user = await preConfirmSignIn(firebase);
        },
        didRender: async () => {forgotPasswordHandler(firebase)}
    })
    return user;
}

const preConfirmSignUp = async (firebase) => {

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    const password = document.getElementById('password');

    name.classList.remove("swal2-inputerror");
    email.classList.remove("swal2-inputerror");
    address.classList.remove("swal2-inputerror");
    password.classList.remove("swal2-inputerror");
    
    let userExists = await firebase.getUserByEmail(email.value).then(result=>result);
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
        email.focus();
    } else if (password.value && passwordValidate(password.value)==='invalid') {
        Swal.showValidationMessage('password should have at least 5 characters of english letters, digits and/or meta characters.');
        password.classList.add("swal2-inputerror");
        password.focus()
    } else {
        const user = {'displayName': name.value, 'email': email.value, 'address': address.value, 'admin': false};
        const authUser = await firebase.signUp(user, password.value);
        return authUser;
    }
}


export const signUp = async (firebase) => {

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
        denyButtonColor: '#7e02c5d5', 
        preConfirm: async ()=> { 
            user = await preConfirmSignUp(firebase);
            return user;
        },
        willOpen: ()=>{ 
            let actions = Swal.getActions();
            let footerDiv = document.createElement('div');
            let denyButton = Swal.getDenyButton();
            let p = document.createElement('p');
            p.innerHTML = 'already have an account? ';
            footerDiv.appendChild(p);
            footerDiv.appendChild(denyButton);
            actions.appendChild(footerDiv);
            footerDiv.classList.add('footer-div')
        }
    }).then(result=>{
        // console.log(result)
        if(result.isDenied){
            user = signIn(firebase);
        }
    })
    return user;
}

export const checkout = async (firebase, history, totalPrice) => {

    let user = null;
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    // console.log(currentUser);
    if (currentUser){ 
        await Swal.fire({
            title: `checkout as ${currentUser.displayName}?`,
            icon: 'question',
            showCancelButton: true,
            focusConfirm: false
        }).then(result=>{
            if(result.isConfirmed){
                user = currentUser; 
            }
        })
    } else {
        await signUp(firebase);
        user = JSON.parse(localStorage.getItem('currentUser'));
    }

    if (user){     
        const order = {'made_by': user.email ,'total_price': totalPrice, 'products': JSON.parse(localStorage.getItem('order')),
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

export const changeDetails = async (firebase) => {
    let user = null;
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
            user = await firebase.updateProfile(name, address);
        }
    })
    // console.log(user);
    return user;
}