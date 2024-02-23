import { LmsNavbar } from "./_components/lms-navbar";
import { LmsSidebar } from "./_components/lms-sidebar";

export default async function LmsDashboardLayout({ children }) {
  return (
    <div className=" flex w-screen h-screen">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <LmsNavbar />
      </div>
      <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
        <LmsSidebar />
      </div>
      <main className="md:pl-56 pt-[80px] w-full h-full bg-background">
        {children}
      </main>
    </div>
  );
}
