import { Tabs, TabsHeader, TabsBody, Tab } from '@material-tailwind/react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Admin() {
  return (
    <Tabs value="html" orientation="vertical" className=" mt-4">
      <TabsHeader className=" p-4 w-48 h-full">
        <NavLink to={'list-products'}>
          <Tab key="react" value="react">
            Products
          </Tab>
        </NavLink>

        <NavLink to={'create-product'}>
          <Tab key="vue" value="vue">
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
