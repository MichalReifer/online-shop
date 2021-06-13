import { Link } from "react-router-dom";

const ProductPreview = ({products, title}) => {

    return (
        <div className="product-list">
            <h1>{title}</h1>
            <div className="products">
                {products.map((product) => (
                    <div className="product-preview" key={product.id}>
                        <Link className='link' to={`/products/${product.id}`}>
                        <img src={require(`${product.image}`).default} alt="" />
                        {/* {<img src={product.image} alt="" />} */}
                            <h2>{product.title}</h2>
                            <p>{product.price} ₪</p>                    
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default ProductPreview;
