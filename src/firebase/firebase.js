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
    // console.log(data)
    return data;
  }

  getProduct = async (id) => {
    const data = await this.db.ref("/products/"+id).once('value')
    .then(snapshots=>{
      return snapshots.val();
    }).catch(error => {
        console.log(error)
        return error})
    // console.log(data)
    return data;
  }

}

  export default Firebase;