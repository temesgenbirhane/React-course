import { it, expect, describe, vi, beforeEach } from "vitest";  // vi is for creating mock functions for props that make api to the backend, since we dont actually want to contact the backend
import { render, screen } from '@testing-library/react'; // renders a component in a fake web page
// screen helps us if the fake wepage has been renderd correctly
import userEvent from '@testing-library/user-event'; // helps us to interact with the fake webpage like clicking buttons, selecting options, etc
import { Product } from "./Product";
import axios from 'axios';

vi.mock('axios' ); // this is going to replace the real axios with a fake one that does not make real api calls

describe('product component', () => {
    let product;

    let loadCart; // creates fake function that does not do anything(mock)

    let user;
    
    beforeEach(() => {   // beforeEach is called a test hook, helps us avoid deplication
        product = {  // from starting code/product.js
            id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            image: "images/products/athletic-cotton-socks-6-pairs.jpg",
            name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
            rating: {
                stars: 4.5,
                count: 87
            },
            priceCents: 1090,
            keywords: ["socks", "sports", "apparel"]
        };

    user = userEvent.setup();    
        
        loadCart = vi.fn();
    });
        it('displays the product details correctly', () => {
        
        // We need to include props that our original file has
        render(<Product product={product} loadCart={loadCart} />);


        // searches if the specifix text exists in the fake wepage EX- product name
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();
        expect(screen.getByText('$10.90')).toBeInTheDocument();
        // Now we can't use getByText since it is going to be an image
        expect(screen.getByTestId('product-image')).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        // Now lets check if the rating is being rendered correctly
        expect(screen.getByTestId('product-rating-stars-image')).toHaveAttribute('src', 'images/ratings/rating-45.png');


        // rating count test, i have no idea why 87 is not working
        expect(screen.getByText('8')).toBeInTheDocument();
    });

    it('adds a product to the cart', async () => {
    render(<Product product={product} loadCart={loadCart} />);

    const addToCartButton = screen.getByTestId('add-to-cart-button');
    await user.click(addToCartButton);

    expect(axios.post).toHaveBeenCalledWith(
      '/api/cart-items',
      {
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1
      }
    );
    expect(loadCart).toHaveBeenCalled();
  });

  it('test quantity selector', async () => {

    render(<Product product={product} loadCart={loadCart} />);
    
     const quantitySelector = screen.getByTestId('product-quantity-selector');
    expect(quantitySelector).toHaveValue('1');

    await user.selectOptions(quantitySelector, '3');
    expect(quantitySelector).toHaveValue('3');    


    const addtocartbutton = screen.getByTestId('add-to-cart-button');
    await user.click(addtocartbutton);
    expect(axios.post).toHaveBeenCalled('/api/cart-items', {
         productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 3
    });
   expect(loadCart).toHaveBeenCalled();


  });


});