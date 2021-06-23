import Swal from "sweetalert2";


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