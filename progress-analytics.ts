// File: app/components/dashboard/ProgressChart.tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

interface ProgressData {
  date: string;
  weight: number;
  bodyFat?: number;
}

export function ProgressChart() {
  const data: ProgressData[] = [
    { date: '2024-01-01', weight: 80, bodyFat: 20 },
    { date: '2024-01-08', weight: 79.5, bodyFat: 19.5 },
    { date: '2024-01-15', weight: 79, bodyFat: 19 },
    { date: '2024-01-22', weight: 78.5, bodyFat: 18.5 },
  ];

  return (
    <div className="h-96 w-full bg-white p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Progress Over Time</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="weight"
            stroke="#8884d8"
            name="Weight (kg)"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="bodyFat"
            stroke="#82ca9d"
            name="Body Fat %"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// File: app/components/dashboard/WorkoutOverview.tsx
import { Card } from "../ui/card";

export function WorkoutOverview() {
  const stats = [
    { label: "Workouts Completed", value: 12 },
    { label: "Total Time", value: "8h 30m" },
    { label: "Calories Burned", value: "4,800" },
    { label: "Current Streak", value: "5 days" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Workout Overview</h2>
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {stat.value}
            </div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}

// File: app/components/dashboard/NextWorkout.tsx
import { Card } from "../ui/card";
import { Button } from "../ui/button";

export function NextWorkout() {
  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Next Workout</h2>
      <div className="space-y-4">
        <div>
          <h3 className="font-medium">Upper Body Strength</h3>
          <p className="text-sm text-gray-500">Duration: 45 minutes</p>
        </div>
        <ul className="space-y-2">
          <li className="text-sm">Bench Press: 4 sets x 8 reps</li>
          <li className="text-sm">Pull-ups: 3 sets x 10 reps</li>
          <li className="text-sm">Shoulder Press: 3 sets x 12 reps</li>
        </ul>
        <Button className="w-full">Start Workout</Button>
      </div>
    </Card>
  );
}
