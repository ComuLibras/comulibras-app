import { Outlet } from "react-router";

export const AppLayout: React.FC = () => {
  return (
    <div className="w-full space-y-4 max-w-[500px] mx-auto">
      <Outlet />
    </div> 
  )
};