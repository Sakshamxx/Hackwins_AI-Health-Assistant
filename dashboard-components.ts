// File: app/dashboard/layout.tsx
import { Sidebar } from "../components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

// File: app/components/layout/Sidebar.tsx
import Link from "next/link";
import { 
  Home, 
  Dumbbell, 
  LineChart, 
  User, 
  Settings 
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Workouts", href: "/dashboard/workouts", icon: Dumbbell },
  { name: "Progress", href: "/dashboard/progress", icon: LineChart },
  { name: "Profile", href: "/dashboard/profile", icon: User },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  return (
    <div className="w-64 bg-white border-r">
      <div className="flex flex-col h-full">
        <div className="flex-1 flex flex-col pt-5 pb-4">
          <nav className="mt-5 flex-1 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex items-center px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

// File: app/dashboard/page.tsx
import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs";
import { WorkoutOverview } from "../components/dashboard/WorkoutOverview";
import { ProgressChart } from "../components/dashboard/ProgressChart";
import { NextWorkout } from "../components/dashboard/NextWorkout";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Welcome back, {user.firstName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WorkoutOverview />
        <NextWorkout />
      </div>
      
      <ProgressChart />
    </div>
  );
}
