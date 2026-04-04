import { useFinance } from "../context/FinanceContext";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";

export default function SummaryCards() {
    const { totalBalance, totalIncome, totalExpenses, trends } = useFinance();

    const stats = [
        {
            label: "Current Balance",
            amount: totalBalance,
            icon: <Wallet className="text-brand-accent group-hover:scale-110 transition-transform" size={28} />,
            trendValue: null,
            bg: "bg-brand-accent/5",
            dot: "bg-brand-accent"
        },
        {
            label: "Monthly Influx",
            amount: totalIncome,
            icon: <TrendingUp className="text-brand-primary group-hover:scale-110 transition-transform" size={28} />,
            trendValue: trends?.income || 0,
            bg: "bg-brand-primary/5",
            dot: "bg-brand-primary"
        },
        {
            label: "Monthly Outflow",
            amount: totalExpenses,
            icon: <TrendingDown className="text-red-400 group-hover:scale-110 transition-transform" size={28} />,
            trendValue: trends?.expenses || 0,
            bg: "bg-red-400/5",
            dot: "bg-red-400"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="stat-card group relative overflow-hidden">
                    <div className="flex flex-col gap-6 w-full">
                        <div className="flex items-center justify-between">
                            <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner`}>
                                {stat.icon}
                            </div>
                            {stat.trendValue !== null && (
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${stat.trendValue >= 0 ? 'bg-brand-primary/10 text-brand-primary' : 'bg-red-400/10 text-red-400'}`}>
                                    {stat.trendValue >= 0 ? '+' : ''}{stat.trendValue.toFixed(1)}%
                                </div>
                            )}
                        </div>
                        
                        <div className="space-y-1">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">{stat.label}</p>
                            <h3 className="text-4xl font-extrabold text-white tracking-tighter">
                                ₹{stat.amount.toLocaleString()}
                            </h3>
                        </div>

                        {/* Subtle interactive dot */}
                        <div className={`absolute top-6 right-6 w-1.5 h-1.5 rounded-full ${stat.dot} opacity-20 group-hover:opacity-100 transition-opacity`} />
                    </div>
                </div>
            ))}
        </div>
    );
}