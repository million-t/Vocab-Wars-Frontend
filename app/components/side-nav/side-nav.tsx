"use client";

import { useSidebar, Sidebar, Button, SidebarState } from "@rewind-ui/core";
import { View } from "lucide-react";
import React, { useState } from "react";
import { GiAchievement } from "react-icons/gi";

const SideNav = () => {
  const [expanded, setExpanded] = useState(true);
  const [mobile, setMobile] = useState(false);
  const sidebar = useSidebar();

  return (
    <div>
      <Sidebar
        onToggle={(state: SidebarState) => {
          setExpanded(!state.expanded);
          setMobile(state.mobile);
        }}
      >
        <Sidebar.Nav>
          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<GiAchievement />}
              label="Daily"
              href="./arena"
              active
            />
          </Sidebar.Nav.Section>

          <Sidebar.Nav.Section>
            <Sidebar.Nav.Section.Item
              icon={<GiAchievement />}
              label="Contests"
              href="#"
            />
            <Sidebar.Nav.Section.Item
              icon={<GiAchievement />}
              label="Mashups"
              href="#"
            />
          </Sidebar.Nav.Section>
        </Sidebar.Nav>
        <Button
          onClick={() => sidebar.toggleMobile()}
          className="ml-auto flex"
        >
          Toggle
        </Button>
      </Sidebar>
    </div>
  );
};

export default SideNav;
