import { ReactNode } from "react";
import Sidebar from "./sidebar";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-white">
        {children}
      </main>
    </div>
  );
}
