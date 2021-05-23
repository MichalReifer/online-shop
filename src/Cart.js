import useFetch from "./useFetch";

const Cart = () => {


    // const handleDelete = (id) => {
    //     const uri = 'http://localhost:8000/products/'+id;
    //     fetch(uri, {
    //         method: 'DELETE'
    //     }).then(()=>{
    //             history.push('/');
    //     })
    // }

    const myUser = 1;
    const uri = 'http://localhost:8000/users/' + myUser;

    const { data: user, isLoading, error } = useFetch(uri);

    return (
        <div className="cart">
            { isLoading && <div>Loading...</div>}
            { error && <div>{ error }</div>}
            { user && (
                <div>
                    {/* <h1>{user.name}</h1> */}
                    {/* <p>{user.items}</p> */}
                </div>
            )}

            <h1>Your cart is empty.</h1>
        </div>
    );
}
 
export default Cart;