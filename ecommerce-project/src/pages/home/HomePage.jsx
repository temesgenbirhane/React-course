import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';
    
export function HomePage({ cart, loadCart }) {   // export it so that you can use it in another file
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');

    useEffect(() => {
        const getHomeData = async () => {
            const urlPath = search ? `/api/products?search=${search}` : '/api/products';
            const response = await axios.get(urlPath);
            setProducts(response.data);
        };
        getHomeData();
    }, [search]);  // this useEffect will run every time the search query parameter changes, which happens when the user types in the search bar and clicks the search button.
    return (
        <>
          
        <title>Ecommerce Project</title>
           <Header cart={cart} /> 
  
           <div className="home-page">

            <ProductsGrid products={products} loadCart={loadCart} />
            
            </div>
        </>
    );
}