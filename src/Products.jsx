import { useEffect, useState } from 'react';
import styles from './Products.module.css';
import PropTypes from 'prop-types';

function Products(props) {

    let [products, setProducts] = useState(() => {
        let storedProducts = localStorage.getItem('products');
        return storedProducts ? JSON.parse(storedProducts) : {
            'Laptop': 999,
            'Smartphone': 699,
            'Tablet': 499,
            'Headphones': 199
    }}
    );

    let [productName, setProductName] = useState();
    let [productPrice, setProductPrice] = useState();

    const addProduct = () => { 
        if (!productName || !productPrice) {
            alert('Please enter both product name and price.');
            return;
        }

        setProducts(currentProducts => ({
            ...currentProducts,
            [productName]: parseInt(productPrice)
        }));

        setProductName('');
        setProductPrice('');
    };

    const deleteProduct = (name) => {
        setProducts(currentProducts => {
            const updatedProducts = { ...currentProducts };
            delete updatedProducts[name];
            return updatedProducts;
        });
    }

    useEffect(() => {
        localStorage.setItem('products', JSON.stringify(products));
    }, [products]);


    return (
        <>
        <div>
            <h2 className={styles.h2}>{props.name} Product List</h2>
            <ul className={styles.ul}>
                {Object.entries(products).map(([product, price]) => (
                    <li key={product} className={styles.li} onDoubleClick={() => deleteProduct(product)}> For {product} price is ${price}, and including tax is ${price + (price * props.tax / 100)}. Available: {props.isAvailable ? 'Yes' : 'No'}</li>
                ))}
            </ul>
        </div>

        <div>
            <input value={productName} type="text" onInput={(i) => {setProductName(i.target.value)}} placeholder='Enter product name' className={styles.input}/>
            <input value={productPrice} type="number" onInput={(i) => {setProductPrice(i.target.value)}} placeholder='Enter product price' className={styles.input} />
            <button onClick={addProduct} className={styles.button}>Add Product</button>
            <button onClick={() => setProducts({})} className={styles.button}>Clear Products</button>
        </div>
        </>
    );
}

Products.propTypes = {
    tax: PropTypes.number,
    isAvailable: PropTypes.bool,
    name: PropTypes.string
};

Products.defaultProps = {
    tax: 10,
    isAvailable: true,
    name: 'Default'
};

export default Products;
