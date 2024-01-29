import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <Tabs value="dashboard" orientation="vertical" className=" mt-4">
      <TabsHeader className=" p-4 w-48 h-screen">
        <NavLink to={''}>
          <Tab key="dashboard" value="dashboard">
            DashBoard
          </Tab>
        </NavLink>
        <NavLink to={'list-products'}>
          <Tab key="products" value="products">
            Products
          </Tab>
        </NavLink>

        <NavLink to={'create-product'}>
          <Tab key="createProduct" value="createProduct">
            Create Product
          </Tab>
        </NavLink>
      </TabsHeader>
      <TabsBody className=" p-4">
        <Outlet />
      </TabsBody>
    </Tabs>
  );
}
