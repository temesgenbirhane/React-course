import './header.css';
import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
export function Header({ cart }){

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const searchText = searchParams.get('search');
    const [search, setSearch] = useState(searchText || '');  // || '' is a shortcut. It means if searchText does not exist
                        // it will use a default value of ''.
    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    });

    const SearchProducts = () => {
        console.log(search);
        navigate(`/?search=${search}`);  // is also considered a query parameter, it does not load another page, it just updates the URL
    }
    const updateSearchInput = (event) => {
        setSearch(event.target.value);
    }
    return(
            <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                <img className="logo"
                    src="images/logo-white.png" />
                <img className="mobile-logo"
                    src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" onClick={SearchProducts} value={search} onChange={updateSearchInput} />

                <button className="search-button">
                <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link to="/orders" className="orders-link header-link">
                    <span className="orders-text">Orders</span>
                </Link>

                <Link to="/checkout" className="cart-link header-link">
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
            </div>
 
    );
}