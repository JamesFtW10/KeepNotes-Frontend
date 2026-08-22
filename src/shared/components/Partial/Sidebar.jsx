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
    <aside className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-gray-200 bg-white px-2 py-1 shadow-[0_-8px_24px_rgba(15,23,42,0.06)] md:bottom-auto md:right-auto md:top-16 md:h-[calc(100vh-4rem)] md:w-20 md:flex-col md:justify-start md:gap-1 md:border-t-0 md:border-r md:px-0 md:py-3">
      {sidebarItems.map((item) => (
        <NavLink
          to={item.link}
          key={item.name}
          title={item.name}
          className={({ isActive }) =>
            `flex h-12 w-12 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 md:h-12 md:w-12 ${
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
