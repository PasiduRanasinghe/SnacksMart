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
      <Carousel autoplay={true} loop={true} className=" h-96">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/snacksmart-2ccf7.appspot.com/o/images%2Fpizza.jpg?alt=media&token=08c20d14-7e50-4e70-a0bf-dd4d8448a1be"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <img
          src="https://firebasestorage.googleapis.com/v0/b/snacksmart-2ccf7.appspot.com/o/images%2Fsamosa.jpg?alt=media&token=1ec81b21-150a-408c-b056-33d11f44a0d4"
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
