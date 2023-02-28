import React from "react";
import { Products, FooterBanner, HeroBanner } from "../components";
import { client } from "../lib/client";
const homePage = ({ products, bannerData }) => {
  console.log(products);
  return (
    <div>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>best selling products</h2>
        <p>speaker of the year</p>
      </div>
      <div className="products-container">
        {products.map((product) => {
          return <Products key={product.id} product={product} />;
        })}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
};

export default homePage;

export const getServerSideProps = async () => {
  const query = `*[_type == "product"]`;
  const products = await client.fetch(query);
  const bannerQuery = `*[_type == "banner"]`;
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: {
      products,
      bannerData,
    },
  };
};
