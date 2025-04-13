import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  FolderOpen, 
  Palette, 
  MessageSquare, 
  BookOpen, 
  Settings, 
  LogOut, 
  ChevronLeft, 
  ChevronRight 
} from "lucide-react";

type NavItem = {
  name: string;
  path: string;
  icon: React.ReactNode;
  badge?: number;
};

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();

  if (!user) return null;

  const navItems: NavItem[] = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { name: "Projects", path: "/projects", icon: <FolderOpen className="h-5 w-5" /> },
    { name: "Brand Library", path: "/brand-library", icon: <Palette className="h-5 w-5" /> },
    { name: "Messages", path: "/messages", icon: <MessageSquare className="h-5 w-5" />, badge: 3 },
    { name: "Our Story", path: "/our-story", icon: <BookOpen className="h-5 w-5" /> },
  ];

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const userInitials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;

  return (
    <aside 
      className={`bg-black text-white flex flex-col h-full transition-all duration-300 ease-in-out relative ${
        collapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Collapse toggle button */}
      <button 
        className="absolute -right-3 top-6 bg-black text-white p-1 rounded-full border border-gray-700 hidden md:block"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Logo */}
      <div className="flex items-center justify-center md:justify-start h-16 px-4">
        <span className={`${collapsed ? "block" : "hidden md:hidden"} text-xl font-bold`}>NE</span>
        <h1 className={`${collapsed ? "hidden" : "hidden md:block"} font-playfair text-xl font-bold`}>Nompo Evelyn</h1>
      </div>

      {/* User info */}
      <div className={`${collapsed ? "hidden" : "hidden md:flex"} items-center px-4 py-3 border-b border-gray-700`}>
        <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center">
          <span className="text-xs font-semibold">{userInitials}</span>
        </div>
        <div className="ml-3">
          <p className="font-medium text-sm">{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-xs text-gray-400">{user.companyName || "Client"}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul>
          {navItems.map((item) => (
            <li key={item.path} className="mb-1 px-2">
              <Link 
                href={item.path}
                className={`flex items-center px-4 py-2 rounded-lg transition-all ${
                  location === item.path
                    ? "bg-gray-800 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
                {!collapsed && item.badge && (
                  <span className="ml-auto bg-white text-black text-xs px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Settings and logout */}
      <div className="p-4 border-t border-gray-700">
        <Link 
          href="/settings"
          className={`flex items-center mb-4 px-4 py-2 rounded-lg ${
            location === "/settings" 
              ? "bg-gray-800 text-white"
              : "text-gray-300 hover:bg-gray-800 hover:text-white"
          }`}>
            <Settings className="h-5 w-5 mr-3" />
            {!collapsed && <span>Settings</span>}
        </Link>
        <Button 
          variant="ghost" 
          className="w-full text-left justify-start text-gray-300 hover:text-white hover:bg-gray-800"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          {!collapsed && <span>Logout</span>}
        </Button>
      </div>
    </aside>
  );
}