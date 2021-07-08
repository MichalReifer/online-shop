import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import "firebase/storage";


const env = process.env;
const firebaseConfig = {
  apiKey: env["REACT_APP_FIREBASE_API_KEY"],
  authDomain: env["REACT_APP_FIREBASE_AUTH_DOMAIN"],
  databaseURL: env["REACT_APP_FIREBASE_DATABASE_URL"],
  projectId: env["REACT_APP_FIREBASE_PROJECT_ID"],
  storageBucket: env["REACT_APP_FIREBASE_STORAGE_BUCKET"],
  appId: env["REACT_APP_FIREBASE_APP_ID"],
};

class Firebase {
  
  constructor() {
      app.initializeApp(firebaseConfig);
      this.auth = app.auth();
      this.storage = app.storage();
      this.db = app.database();
  }

  /* Products Database: */

  getAllProducts = async () => {
    let products = [];
    const data = await this.db.ref("/products").once('value')
    .then(snapshots=>{
      snapshots.forEach(snapshot=>{
        const dataVal = snapshot.val()
        products.push(dataVal)
      })
      return products;
    }).catch(error => {
        console.log(error)
        return error})
    return data;
  }

  getProduct = async (id) => {
    const data = await this.db.ref("/products/"+id).once('value')
    .then(snapshots=>{
      return snapshots.val();
    }).catch(error => {
        console.log(error)
        return error})
    return data;
  }

  getProductByName = async (cakeId) => {
    const snapshots = await this.db.ref("/products").once('value')
    let product = null;
    snapshots.forEach(data=>{
      if (data.val().cakeId === cakeId){
        product = data.val();
      }
    })
    return product;
  }

    /* Orders Database: */

  getAllOrders = async () => {
    let products = [];
    const data = await this.db.ref("/orders").once('value')
    .then(snapshots=>{
      snapshots.forEach(snapshot=>{
        const dataVal = snapshot.val()
        products.push(dataVal)
      })
      return products;
    }).catch(error => {
        console.log(error)
        return error})
    return data;
  }

  getOrderById = async (orderID) => {
    const snapshots = await this.db.ref("/orders").once('value')
    let product = null;
    snapshots.forEach(data=>{
      if (data.key === orderID){
        product = data.val();
      }
    })
    return product;
  }

  getOrdersByEmail = async (email) => {
    const snapshots = await this.db.ref("/orders").once('value')
    let orders = [];
    snapshots.forEach(data=>{
      if (data.val().made_by === email){
        orders.push(data.val());
      }
    })
    return orders;
  }

  setOrder = async (order) => {
    const d = new Date();
    const timeID = `${d.getFullYear()}`+`${d.getMonth()+1}`+`${d.getDate()}_`
                  +`${d.getHours()}:`+`${d.getMinutes()}:`+`${d.getSeconds()}:`+`${d.getMilliseconds()}`;
    this.db.ref("/orders/"+timeID).set(order);
  }

  /* Users Database: */

  getUserById = async (userId) => {
    const snapshots = await this.db.ref("/users").once('value')
    let user = null;
    snapshots.forEach(data=>{
      if (data.key === userId){
        user = data.val();
      }
    })
    return user;
  }

  getUserByEmail = async (email) => {
    const snapshots = await this.db.ref("/users").once('value')
    let user = null;
    snapshots.forEach(data=>{
      if (data.val().email === email){
        user = data.val();
        console.log(data.key)
      }
    })
    return user;
  }

  setUser = async (user) => {
    this.db.ref("/users/"+user.userID).set(user);
  }

  setUserInLocalStorage = async (authUser) => {
    localStorage.setItem('currentUser', 
      `{"uid": "${authUser.uid}", "email": "${authUser.email}", "displayName": "${authUser.displayName}"}`
      );
    const dataUser = await this.getUserById(authUser.uid);
    localStorage.setItem('userDetails', `{"address": "${dataUser.address}"}` )
  }

  signUp = async (user, password) => {
    // console.log(email);
    const authUser = await this.auth.createUserWithEmailAndPassword(user.email, password)
      .then(async (credentials) => {
        const authUser = credentials.user;
        await authUser.updateProfile({displayName: user.displayName})
        this.db.ref("/users/"+authUser.uid).set(user);
        this.setUserInLocalStorage(authUser);
        console.log('sign up succeeded.');
        return authUser;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
      });
    return authUser;
  }

  signIn = async (email, password) => {
    const user = await this.auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var authUser = userCredential.user;
        console.log('sign in succeeded.');
        // console.log(user.email)
        // localStorage.setItem('currentUser', JSON.stringify(authUser));
        this.setUserInLocalStorage(authUser);
        return authUser;
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
        return null;
      });
    // console.log(user)
    return user;
  }

  signOut = async () => {
    this.auth.signOut().then(() => {
      console.log('sign out succeeded.');
      // this.printCurrentUser();
    }).catch((error) => {
      console.log(error);
    });     
  }

  getCurrentUser = ()=> {
    return this.auth.currentUser;

  }

  printCurrentUser = () =>{
    console.log(this.auth.currentUser?.email);
    console.log(this.auth.currentUser?.displayName);
  }


  updateProfile = async (newName, newAddress) => {
    const authUser = this.auth.currentUser;
    const userDetails = JSON.parse(localStorage.getItem('userDetails'));
    let name = newName? newName: authUser.displayName;
    let address = newAddress? newAddress: userDetails.address;
    await authUser.updateProfile({
      displayName: name
    }).then(async () => {
      this.db.ref("/users/"+authUser.uid).set({
        displayName: name,
        address: address,
        email: authUser.email  
      });
      await this.setUserInLocalStorage(authUser);
    }).catch((error) => {
      // An error occurred
      // ...
    });
    return true;
  }


  changePassword = async (email) => {
    this.auth.sendPasswordResetEmail(email)
    .then(() => {
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  }


  changeAuth = async() => {
    this.auth.onAuthStateChanged(user=>{
      if (user){
        // console.log(user.email);
        console.log('user is logged in');
      } else {
        console.log('user is logged out')
      }
    })
  }

}

  export default Firebase;
