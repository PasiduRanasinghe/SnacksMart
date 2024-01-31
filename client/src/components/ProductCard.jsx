import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart/cartSlice';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const dispatch = useDispatch();

  const HandleAddToCart = (product) => {
    dispatch(addToCart(product));
    toast.success('Added To Cart Successfully');
  };

  return (
    <Card className="mt-6 w-64 h-80">
      <CardHeader color="blue-gray" floated={false} className="m-2 shadow-none">
        <img src={product.image} alt="card-image" />
      </CardHeader>
      <CardBody className="m-0 p-2 flex flex-col">
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {product.title}
        </Typography>
        <Typography variant="small">{product.description}</Typography>
        <Typography className=" self-end font-bold" variant="medium">
          LKR {product.price}
        </Typography>
      </CardBody>
      <CardFooter className="p-2 flex justify-center">
        <Button size="sm" onClick={() => HandleAddToCart(product)}>
          add cart
        </Button>
      </CardFooter>
    </Card>
  );
}
