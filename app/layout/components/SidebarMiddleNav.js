import React from "react";

import { SidebarMenu } from "./../../components";

export const SidebarMiddleNav = () => (
  <SidebarMenu>
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-user-md"></i>}
      title="Dashboard"
      to="/dashboard"
    />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-calendar"></i>}
      title="Bookings"
    >
      <SidebarMenu.Item title="Wizard" to="/bookings/wizard" exact />
      <SidebarMenu.Item
        title="Booking List"
        to="/bookings/booking-list"
        exact
      />
      <SidebarMenu.Item title="Scheduler" to="/bookings/scheduler" exact />
    </SidebarMenu.Item>
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-wheelchair"></i>}
      title="Patients"
      to="/patients"
    />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-user-md"></i>}
      title="Doctors"
      to="/doctors"
    />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-pencil-square-o"></i>}
      title="Referrals"
    />
    <SidebarMenu.Item icon={<i className="fa fa-fw fa-fax"></i>} title="Fax" />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-mobile"></i>}
      title="SMS"
    />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-inbox"></i>}
      title="Email"
    />
    <SidebarMenu.Item
      icon={<i className="fa fa-fw fa-windows"></i>}
      title="Helpdesk"
    />
  </SidebarMenu>
);
