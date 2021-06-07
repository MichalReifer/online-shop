import swal from 'sweetalert';


const CartProducts = ({products, isJsonServer}) => {

    const removeFromCart = (id) => {
        swal({
            title: "Are you sure?",
            text: "This cake looks yummy!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          }).then((willDelete) => {
            if (willDelete) {
              let cartProducts = localStorage.getItem('products');
              cartProducts = cartProducts.replace(","+id, "");
              if (cartProducts===','){ 
                  cartProducts='';
              }
              localStorage.setItem('products', cartProducts);
              swal("Poof!", { icon: "success",})
              .then(value=>{window.location.reload();})
            }})
        .catch(e=>
            console.log('error occured: ', e)
        )
    }

    return (
        <div>
            <h1>Cart</h1>
            <div>
                {products.map((product) => (
                    <div className="cart-preview" key={product.id}>
                        <a href={`/products/${product.id}`}><img src={require(`${product.image}`).default} alt="" /></a>
                        {/* {!isJsonServer && <img src={product.image} alt="" />} */}
                            <h2>{product.title}</h2>
                            <p>{product.price} ₪</p>
                            <input type="number" id="quantity" name="quantity" min="1" max="5" placeholder="1"></input>                    
                            <button onClick={()=>removeFromCart(product.id)}>Remove</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default CartProducts;
