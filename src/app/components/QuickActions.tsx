import { ArrowUpRight, ArrowDownLeft, Smartphone, CreditCard } from "lucide-react";

export function QuickActions() {
  const actions = [
    { icon: ArrowUpRight, label: "Send", color: "from-orange-500 to-red-500" },
    { icon: ArrowDownLeft, label: "Request", color: "from-green-500 to-emerald-500" },
    { icon: Smartphone, label: "Mobile", color: "from-blue-500 to-cyan-500" },
    { icon: CreditCard, label: "Bank", color: "from-purple-500 to-pink-500" },
  ];

  return (
    <div className="flex gap-4 justify-center">
      {actions.map((action) => (
        <button
          key={action.label}
          className="flex flex-col items-center gap-2 group"
        >
          <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-md group-hover:shadow-lg transition-all group-hover:scale-110`}>
            <action.icon className="w-6 h-6 text-white" />
          </div>
          <span className="text-xs text-gray-600">{action.label}</span>
        </button>
      ))}
    </div>
  );
}
