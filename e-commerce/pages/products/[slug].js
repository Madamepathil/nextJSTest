import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { urlFor, client } from "../../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from "react-icons/ai";
import { Products } from "../../components";
import { Context } from "../../context/StateContext";
const productDetail = ({ product, products }) => {
  const { image, name, details, price } = product;
  const { incQty, qty, decQty, onAddToCart } = useContext(Context);

  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="product-detail-container">
        <div>
          <div className="image-container">
            <img
              src={urlFor(image && image[index])}
              className="product-detail-image"
            />
          </div>
          <div className="small-images-container">
            {image?.map((item, i) => {
              return (
                <img
                  src={urlFor(item)}
                  key={i}
                  className={
                    i === index ? "small-image selected-image" : "small-image"
                  }
                  onMouseEnter={() => setIndex(i)}
                />
              );
            })}
          </div>
        </div>
        <div className="product-detail-desc">
          <h2>{name}</h2>
          <div className="reviews">
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>details</h4>
          <p>{details}</p>
          <p className="price">${price}</p>
          <div className="quantity">
            <h3>Quantity:</h3>
            <p className="quantity-desc">
              <span className="minus" onClick={decQty}>
                <AiOutlineMinus />
              </span>
              <span className="num" onClick={""}>
                {qty}
              </span>
              <span className="plus" onClick={incQty}>
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              className="add-to-cart"
              onClick={() => onAddToCart(product, qty)}
            >
              Add to cart
            </button>
            <button type="button" className="buy-now" onClick={""}>
              Buy now
            </button>
          </div>
        </div>
      </div>
      <div className="maylike-products-wrapper">
        <h2>You may also like</h2>
        <div className="marquee">
          <div className="maylike-products-container track">
            {products.map((item, i) => {
              return <Products key={item._id} product={item} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default productDetail;

export const getStaticPaths = async () => {
  const query = `*[_type == "product"]{
  slug {
    current
  }
}`;

  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: ` ${product.slug.current}`,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const products = await client.fetch(productsQuery);
  const product = await client.fetch(query);

  return {
    props: {
      products,
      product,
    },
  };
};
