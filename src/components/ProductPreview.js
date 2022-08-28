import { Link } from "react-router-dom";

const arrayBufferToBase64 = buffer => {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return 'data:image/png;base64,' + window.btoa(binary);
};

const ProductPreview = ({products, title}) => {


    return (
        <div className="product-list">
            <h1>{title}</h1>
            <div className="products">
                {products.map(product => (
                    <div className="product-preview" key={product.id}>
                        <Link className='link' to={{pathname: `/products/${product.cakeId}`,state : {id: `${product.id}`}}}>
                            {/* <img src={product.image} alt="" /> */}
                            {/* <img src={require(`${product.image}`).default} alt="" /> */}
                            <img src={arrayBufferToBase64(product.image.data)} width='100px'></img>
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
