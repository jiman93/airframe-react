import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

// ----------- Pages Imports ---------------
import Doctors from './Doctors';

// ----------- Layout Imports ---------------
import { DefaultNavbar } from './../layout/components/DefaultNavbar';
import { DefaultSidebar } from './../layout/components/DefaultSidebar';

//------ Route Definitions --------
// eslint-disable-next-line no-unused-vars
export const RoutedContent = () => {
  return (
    <Switch>
      <Route path="/doctors" exact component={Doctors} />
    </Switch>
  );
};

//------ Custom Layout Parts --------
export const RoutedNavbars = () => (
  <Switch>
    {/* Other Navbars: */}
    {/* <Route
            component={ SidebarANavbar }
            path="/layouts/sidebar-a"
        /> */}
    {/* Default Navbar: */}
    <Route component={DefaultNavbar} />
  </Switch>
);

export const RoutedSidebars = () => (
  <Switch>
    {/* Other Sidebars: */}
    {/* <Route component={SidebarASidebar} path="/layouts/sidebar-a" /> */}
    {/* Default Sidebar: */}
    <Route component={DefaultSidebar} />
  </Switch>
);
