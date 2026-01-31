import { useEffect, useState, useRef,} from 'react';
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

    let [productName, setProductName] = useState('');
    let [productPrice, setProductPrice] = useState('');
    let [paymentMethod, setPaymentMethod] = useState('');
    let [deliveryMethod, setDeliveryMethod] = useState('');

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

    const inputRef = useRef(null);
    const inputRef2 = useRef(null);
    const paymentRef = useRef(null);
    const deliveryRef = useRef(null);

    function selectedInput() {
        inputRef.current.style.backgroundColor = 'lightyellow';
        setTimeout(() => {
            inputRef.current.style.backgroundColor = 'white';
        }, 500);
    }

    function selectedInput2() {
        inputRef2.current.style.backgroundColor = 'lightyellow';
        setTimeout(() => {
            inputRef2.current.style.backgroundColor = 'white';
        }, 500);
    }

    function selectedPayment() {
        paymentRef.current.style.backgroundColor = 'lightblue';
    }

    function selectedDelivery() {
        deliveryRef.current.style.backgroundColor = 'lightgreen';
    }

    useEffect(() => {
        if (paymentMethod !== '') {
        selectedPayment();
        }
    }, [paymentMethod]);

    useEffect(() => {
        if (deliveryMethod !== '') {
        selectedDelivery();
        }
    }, [deliveryMethod]);



    return (
        <>
        <div>
            <h2 className={styles.h2}>{props.name} Product List</h2>
            <ul className={styles.ul }>
                {Object.entries(products).map(([product, price]) => (
                    <li key={product} className={styles.li} onDoubleClick={() => deleteProduct(product)}> For {product} price is ${price}, and including tax is ${price + (price * props.tax / 100)}. Available: {props.isAvailable ? 'Yes' : 'No'}</li>
                ))}
            </ul>
        </div>

        <div>
            <input value={productName} ref={inputRef} type="text" onInput={(i) => {setProductName(i.target.value)}} onClick={selectedInput} placeholder='Enter product name' className={styles.input}/>
            <input value={productPrice} ref={inputRef2} type="number" onInput={(i) => {setProductPrice(i.target.value)}} onClick={selectedInput2} placeholder='Enter product price' className={styles.input} />
            <button onClick={addProduct} className={styles.button}>Add Product</button>
            <button onClick={() => setProducts({})} className={styles.button}>Clear Products</button>
        </div>

        <div className={styles.optionsContainer}>
            <div className={styles.optionSection}>
                <p>Please check available payment options:</p>
                <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className={styles.select}>
                    <option value="">Select Payment Method</option>
                    <option value="Visa">Visa</option>
                    <option value="Master Card">Master Card</option>
                    <option value="Dina Card">Dina Card</option>
                </select>
                <p ref={paymentRef}>Payment via: {paymentMethod}</p>
            </div>

            <div className={styles.optionSection}>
                <p>Please select available delivery options:</p>
                <label>
                    <input type="radio" name="delivery" value="PostExpress" onChange={(e) => setDeliveryMethod(e.target.value)} />
                    PostExpress
                </label>
                <label>
                    <input type="radio" name="delivery" value="Self pickup" onChange={(e) => setDeliveryMethod(e.target.value)} />
                    Self pickup
                </label>
                <p ref={deliveryRef}>Delivery method: {deliveryMethod}</p>
            </div>
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
