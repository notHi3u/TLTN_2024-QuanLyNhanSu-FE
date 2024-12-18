"use client";

import Cookies from "js-cookie"; // Install with `npm install js-cookie`

// Menu object
const menu = {
  options: [] as string[], // Initialize an empty menu

  setMenuOptions() {
    // Get roles from cookies or default to ["Guest"]
    const roles = Cookies.get("roles") ? JSON.parse(Cookies.get("roles")!) : ["Guest"];

    // Role-to-menu mapping
    const roleMenuMap: Record<string, string[]> = {
      Admin: ["Dashboard", "Manage Users", "Settings"],
      HR: ["Profile", "Settings"],
      "Department Manager": ["Profile", "Settings"],
      Employee: ["Profile", "Settings"],
      Guest: [] // Default empty menu for "Guest" or unknown roles
    };

    // Generate menu items based on roles
    const menuItems = new Set<string>();
    roles.forEach((role: string) => {
      const items = roleMenuMap[role] || []; // Default to empty if role not mapped
      items.forEach((item) => menuItems.add(item)); // Add items to the Set
    });

    // Convert Set to Array and assign to `options`
    this.options = Array.from(menuItems);

    // Store the options in cookies for persistence (only if changed)
    const existingMenu = Cookies.get("menuOptions");
    const newMenu = JSON.stringify(this.options);
    if (existingMenu !== newMenu) {
      Cookies.set("menuOptions", newMenu, { expires: 7 });
    }
  },

  removeMenuOptions() {
    Cookies.remove("menuOptions");
  }
};

export default menu;
