import { Button, Card, Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    discount: 0,
  });
  const params = useParams();
  useEffect(() => {
    const fetchProduct = async () => {
      const productId = params.productId;
      const res = await fetch(`/api/v1/product/${productId}`);

      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }
      setProductData(data);
    };

    fetchProduct();
  }, []);
  return (
    <Card className=" w-2/5">
      <div className="flex flex-row items-center">
        <img className=" w-1/2 object-cover" src={productData.image} />
        <div className="flex flex-col ">
          <Typography variant="h3">{productData.title}</Typography>
          <Typography variant="small">{productData.description}</Typography>
          <div>
            <Button>add to cart</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
