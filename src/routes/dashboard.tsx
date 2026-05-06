import { createFileRoute, Outlet } from "@tanstack/react-router";
import { DashSidebar } from "@/components/dashboard/DashSidebar";
import { DashHeader } from "@/components/dashboard/DashHeader";
import { DashboardProvider } from "@/lib/dashboardData";

export const Route = createFileRoute("/dashboard")({
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <DashboardProvider>
      <div className="flex min-h-screen">
        <DashSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashHeader />
          <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
}
