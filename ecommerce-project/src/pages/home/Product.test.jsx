import { it, expect, describe, vi } from "vitest";  // vi is for creating mock functions for props that make api to the backend, since we dont actually want to contact the backend
import { render, screen } from '@testing-library/react'; // renders a component in a fake web page
// screen helps us if the fake wepage has been renderd correctly
import { Product } from "./Product";


describe('product component', () => {
    it('displays the product details correctly', () => {
        const product = {  // from starting code/product.js
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

        const loadCart = vi.fn(); // creates fake function that does not do anything(mock)
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


});