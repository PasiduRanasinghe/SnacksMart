import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import { Button, Input, Option, Select } from '@material-tailwind/react';

export default function Shop() {
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
    <div className="pt-6">
      <div className="mx-2 flex flex-row gap-2">
        <Input placeholder="Search" label="Search" className="w-4" />
        <Select>
          <Option>1</Option>
          <Option>1</Option>
          <Option>1</Option>
        </Select>
        <Select>
          <Option>1</Option>
          <Option>1</Option>
          <Option>1</Option>
        </Select>
        <Button variant="outlined">Search</Button>
      </div>
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
