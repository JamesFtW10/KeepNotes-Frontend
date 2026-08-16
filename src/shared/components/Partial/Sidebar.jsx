import { Lightbulb, Bell, Pen, ArchiveRestore, Trash2 } from "lucide-react";
import { NavLink } from 'react-router-dom';

function Sidebar() {
  const sidebarItems = [
    {
      name: "Notes",
      icon: (
        <Lightbulb className="text-gray-600 text-size-[24px] h-10 w-10 hover:bg-gray-200 p-2 cursor-pointer rounded-full" />
      ),
      link: "/app",
      
    },
    {
      name: "Reminders",
      icon: (
        <Bell className="text-gray-600 text-size-[24px] h-10 w-10 hover:bg-gray-200 p-2 cursor-pointer rounded-full" />
      ),
      link: "/app/reminders",
    },
    {
      name: "Edit Labels",
      icon: (
        <Pen className="text-gray-600 text-size-[24px] p-2 h-10 w-10 hover:bg-gray-200  cursor-pointer hover:rounded-[18px]" />
      ),
      link: "/app/edit-labels",
    },
    {
      name: "Archive",
      icon: (
        <ArchiveRestore className="text-gray-600 text-size-[24px] h-10 w-10 hover:bg-gray-200 p-2 cursor-pointer rounded-full" />
      ),
      link: "/app/archive",
    },
    {
      name: "Trash",
      icon: (
        <Trash2 className="text-gray-600 text-size-[24px] h-10 w-10 hover:bg-gray-200 p-2 cursor-pointer rounded-full" />
      ),
      link: "/app/trash",
    },
  ];

  return (
    <aside className="fixed left-0 top-16 z-40 flex h-[calc(100vh-4rem)] w-20 flex-col items-center gap-1 bg-white pt-3">
      {sidebarItems.map((item) => (
        <NavLink
          to={item.link}
          key={item.name}
          title={item.name}
          className={({ isActive }) =>
            `flex h-12 w-12 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 ${
              isActive ? 'bg-amber-100 text-gray-900' : ''
            }`
          }
        >
          {item.icon}
        </NavLink>
      ))}
    </aside>
  );
}

export default Sidebar;
