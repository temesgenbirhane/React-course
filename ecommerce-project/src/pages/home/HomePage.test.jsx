import { it, expect, describe, vi, beforeEach } from "vitest";  // vi is for creating mock functions for props that make api to the backend, since we dont actually want to contact the backend
import { render, screen, within } from '@testing-library/react'; // renders a component in a fake web page
// screen helps us if the fake wepage has been renderd correctly
import axios from 'axios';
import { MemoryRouter } from "react-router-dom";
import { HomePage } from "./HomePage";
import userEvent from '@testing-library/user-event'; // helps us to interact with the fake webpage like clicking buttons, selecting options, etc


vi.mock('axios'); // We are going to mock the implementation, and not just a symbol. our HomePage.jsx makes
// an api call and displays sth on the homepage, so we will mock that implemenation
describe('HomePage component', () => {
    let loadCart;
    let user;
    beforeEach(() => {
        loadCart = vi.fn();  // Remeber this is a mock function

    axios.get.mockImplementation(async (urlPath) => {  // when ever we run axios.get, It will run this fake function
      if (urlPath === '/api/products') {
                return {
                    data: [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    rating: {
      stars: 4.5,
      count: 87
    },
    priceCents: 1090,
    keywords: ["socks", "sports", "apparel"]
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: ["sports", "basketballs"]
  }]
                }
            }
        });
    });

    it('displays the rpoducts correctly', async () => {
     
    render(
    // Had to include this apparently since we are using Link in the HomePage.jsx, we need to wrapped them a router. But the Link in App.jsx are safe since they are already wrapped around in main.jsx
    <MemoryRouter>  
        <HomePage cart={[]} loadCart={loadCart}/>
    </MemoryRouter>
    );
    const productContainers  = await screen.findAllByTestId('product-container');  // Find will wait until useEffect in out Homepage.jsx is done. For that reason we assigned it to a value
    expect(productContainers.length).toBe(2);
    
    expect (
        within(productContainers[0]).getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument();

     expect (
        within(productContainers[1]).getByText('Intermediate Size Basketball')
    ).toBeInTheDocument();
     });

     user = userEvent.setup();  // we need to setup userEvent before the test, since we are going to use it in the test, and it is not related to the other tests, so we dont need to setup it in beforeEach
it('adds a product to the cart', async () => {
    render(
      <MemoryRouter>
        <HomePage cart={[]} loadCart={loadCart} />
      </MemoryRouter>
    );
    const productContainers = await screen.findAllByTestId('product-container');  // grabbed all the products from homepage

    const quantitySelector1 = within(productContainers[0]).getByTestId('product-quantity-selector'); // grabbed the quantity selector of the first product
    await user.selectOptions(quantitySelector1, '3'); // changing the value of quantity to 3

    const quantitySelector2 = within(productContainers[1]).getByTestId('product-quantity-selector');
    await user.selectOptions(quantitySelector2, '2');


    const addToCartButton1 = within(productContainers[0])
      .getByTestId('add-to-cart-button');    // grabbed the add to cart button of the first product


    await user.click(addToCartButton1); // click on the add to cart button
     const addToCartButton2 = within(productContainers[1])
      .getByTestId('add-to-cart-button');
    await user.click(addToCartButton2);

    expect(axios.post).toHaveBeenNthCalledWith(1, '/api/cart-items', { 
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // checking if the correct id is sent to the backend when clicking
      quantity: 3
    });
    expect(axios.post).toHaveBeenNthCalledWith(2, '/api/cart-items', {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 2
    });
    expect(loadCart).toHaveBeenCalledTimes(2);
  });

});

// There is no point of using screen since it searches the whole page, 
// So it is more efficient to use within() to look inside specific element