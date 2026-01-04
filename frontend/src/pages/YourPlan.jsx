import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Check, Zap } from "lucide-react";

const plans = [
  {
    name: "Basic",
    price: 29,
    features: ["Up to 5 courses", "100 students", "Email support", "Basic analytics"],
    current: false,
  },
  {
    name: "Pro",
    price: 79,
    features: ["Unlimited courses", "1,000 students", "Priority support", "Advanced analytics", "Custom domain"],
    current: true,
  },
  {
    name: "Business",
    price: 199,
    features: ["Everything in Pro", "Unlimited students", "24/7 support", "API access", "White-label options"],
    current: false,
  },
];

export default function YourPlan() {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-foreground mb-8">Your Plan</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`bg-card rounded-xl border p-6 relative ${
                plan.current ? 'border-primary ring-2 ring-primary/20' : 'border-border'
              }`}
            >
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Current Plan
                </div>
              )}
              
              <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
              <div className="mb-6">
                <span className="text-3xl font-bold text-foreground">${plan.price}</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm">
                    <Check className="w-4 h-4 text-chart-green" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={`w-full py-3 rounded-lg font-medium transition-opacity ${
                  plan.current 
                    ? 'bg-muted text-muted-foreground cursor-default' 
                    : 'bg-primary text-primary-foreground hover:opacity-90'
                }`}
                disabled={plan.current}
              >
                {plan.current ? 'Current Plan' : 'Upgrade'}
              </button>
            </div>
          ))}
        </div>

        {/* Usage Stats */}
        <div className="mt-8 bg-card rounded-xl border border-border p-6">
          <h3 className="font-semibold text-foreground mb-6">Current Usage</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Courses</span>
                <span className="text-sm font-medium text-foreground">4 / Unlimited</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[40%]" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Students</span>
                <span className="text-sm font-medium text-foreground">48 / 1,000</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[5%]" />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Storage</span>
                <span className="text-sm font-medium text-foreground">2.4 GB / 10 GB</span>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full w-[24%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
