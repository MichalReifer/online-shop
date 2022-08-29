import { Link } from "react-router-dom";


const ProductPreview = ({products, title}) => {
    
    return (
        <div className="product-list">
            <h1>{title}</h1>
            <div className="products">
                {products.map(product => (
                    <div className="product-preview" key={product.id}>
                        <Link className='link' to={{pathname: `/products/${product.cakeId}`,state : {id: `${product.id}`}}}>
                            <img src={'data:image/png;base64,'+product.image} width='100px'></img>
                            <h2>{product.title}</h2>
                            <p className="price">{product.price} ₪</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default ProductPreview;
