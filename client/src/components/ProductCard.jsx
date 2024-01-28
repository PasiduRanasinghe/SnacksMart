import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export default function ProductCard(props) {
  return (
    <Card className="mt-6 w-64 h-80">
      <CardHeader color="blue-gray" floated={false} className="m-2 shadow-none">
        <img
          src="https://images.unsplash.com/photo-1540553016722-983e48a2cd10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80"
          alt="card-image"
        />
      </CardHeader>
      <CardBody className="m-0 p-2">
        <Typography variant="h6" color="blue-gray" className="mb-2">
          UI/UX Review Check
        </Typography>
        <Typography variant="small">
          The place is close to Barceloneta Beach and bus stop just 2 min by
        </Typography>
      </CardBody>
      <CardFooter className="p-2 flex justify-evenly">
        <Button size="sm" className="">
          buy now
        </Button>

        <Button size="sm">add cart</Button>
      </CardFooter>
    </Card>
  );
}
