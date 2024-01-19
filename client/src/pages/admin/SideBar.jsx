import { Drawer, List, ListItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  return (
    <Drawer open={true}>
      <div className="mb-2 flex items-center justify-between p-4">
        <List>
          <ListItem>
            <Link>DashBoard</Link>
          </ListItem>
          <ListItem>Products</ListItem>
          <ListItem>
            <Link to="/create-product">Create New Product</Link>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}
