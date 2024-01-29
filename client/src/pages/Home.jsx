import React, { useEffect, useState } from 'react';
import { Carousel } from '@material-tailwind/react';
import ProductCard from './../components/ProductCard';
import { toast } from 'react-toastify';

export default function Home() {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    const handleProducts = async () => {
      const res = await fetch('/api/v1/product/list');
      const data = await res.json();
      if (data.success === false) {
        toast.error(data.message);
        return;
      }
      setProductList(data);
    };

    handleProducts();
  }, []);
  return (
    <div>
      <Carousel autoplay={true} loop={true} className=" h-80">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
          alt="image 2"
          className="h-full w-full object-cover"
        />
      </Carousel>
      <div className=" mx-5 justify-items-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
        {productList &&
          productList.length > 0 &&
          productList.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </div>
    </div>
  );
}
