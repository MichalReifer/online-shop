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

  getOrderByOrderId = async (orderID) => {
    const snapshots = await this.db.ref("/orders").once('value')
    let product = null;
    snapshots.forEach(data=>{
      if (data.val().orderID === orderID){
        product = data.val();
      }
    })
    return product;
  }

  setOrder = async (order) => {
    this.db.ref("/orders/"+order.orderID).set(order);
  }


  /* Users Database: */

  getUserByUserEmail = async (email) => {
    const snapshots = await this.db.ref("/users").once('value')
    let product = null;
    snapshots.forEach(data=>{
      if (data.val().email === email){
        product = data.val();
      }
    })
    return product;
  }

  setUser = async (user) => {
    this.db.ref("/users/"+user.userID).set(user);
  }

}

  export default Firebase;