import { useFinance } from "../context/FinanceContext";
import { Wallet, TrendingUp, TrendingDown, Landmark } from "lucide-react";

export default function SummaryCards() {
    const { totalBalance, totalIncome, totalExpenses } = useFinance();

    const stats = [
        {
            label: "Total Balance",
            amount: totalBalance,
            icon: <Wallet className="text-brand-accent" size={24} />,
            trend: "Overall",
            color: "bg-brand-accent/10 border-brand-accent/20"
        },
        {
            label: "Total Income",
            amount: totalIncome,
            icon: <TrendingUp className="text-brand-primary" size={24} />,
            trend: "+12.5%",
            color: "bg-brand-primary/10 border-brand-primary/20 text-brand-primary"
        },
        {
            label: "Total Expenses",
            amount: totalExpenses,
            icon: <TrendingDown className="text-red-400" size={24} />,
            trend: "-4.2%",
            color: "bg-red-400/10 border-red-400/20 text-red-400"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="stat-card border border-slate-700/50">
                    <div className={`p-4 rounded-xl ${stat.color} flex items-center justify-center shrink-0`}>
                        {stat.icon}
                    </div>
                    <div>
                        <p className="text-slate-400 text-sm font-medium mb-1 tracking-tight">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-white tracking-tighter">
                            ₹{stat.amount.toLocaleString()}
                        </h3>
                        {stat.trend && (
                            <p className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${stat.color.split(' ')[2]}`}>
                                {stat.trend}
                            </p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}