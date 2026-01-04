import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  { day: "M", hours: 4, active: true },
  { day: "T", hours: 6 },
  { day: "W", hours: 5 },
  { day: "T", hours: 8 },
  { day: "F", hours: 7 },
  { day: "S", hours: 9 },
  { day: "S", hours: 6 },
];

export function TimeDataChart() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-6">Student Time Data</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap="20%">
            <XAxis 
              dataKey="day" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: 'hsl(220 10% 46%)' }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(0 0% 100%)', 
                border: '1px solid hsl(220 13% 91%)',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`${value} hours`, 'Time']}
            />
            <Bar 
              dataKey="hours" 
              fill="hsl(24 95% 53%)" 
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <button className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
        View More
      </button>
    </div>
  );
}
