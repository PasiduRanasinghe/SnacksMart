import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <Tabs value="dashboard" orientation="vertical" className="">
      <TabsHeader className=" w-52 h-screen">
        <NavLink to={''}>
          <Tab className=" p-2" key="dashboard" value="dashboard">
            DashBoard
          </Tab>
        </NavLink>
        <NavLink to={'create-product'}>
          <Tab className=" p-2" key="createProduct" value="createProduct">
            Create Product
          </Tab>
        </NavLink>
        <NavLink to={'list-products'}>
          <Tab className=" p-2" key="products" value="products">
            Products
          </Tab>
        </NavLink>

        <NavLink to={'list-inquiries'}>
          <Tab className=" p-2" key="inquiries" value="inquiries">
            Inquiries
          </Tab>
        </NavLink>
        <NavLink to={'list-users'}>
          <Tab className=" p-2" key="users" value="users">
            Users
          </Tab>
        </NavLink>
        <NavLink to={'list-orders'}>
          <Tab className=" p-2" key="orders" value="orders">
            Orders
          </Tab>
        </NavLink>
      </TabsHeader>
      <TabsBody className=" p-4">
        <Outlet />
      </TabsBody>
    </Tabs>
  );
}
