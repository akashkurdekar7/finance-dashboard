import { useFinance } from "../../../context/FinanceContext";
import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { motion } from "framer-motion";
import CountUp from "../../../components/CountUp";

export default function SummaryCards() {
    const { totalBalance, totalIncome, totalExpenses, trends } = useFinance();

    const stats = [
        {
            label: "Current Balance",
            amount: totalBalance,
            icon: <Wallet className="text-brand-accent" size={24} />,
            trendValue: null,
            color: "brand-accent"
        },
        {
            label: "Monthly Influx",
            amount: totalIncome,
            icon: <TrendingUp className="text-brand-primary" size={24} />,
            trendValue: trends?.income || 0,
            color: "brand-primary"
        },
        {
            label: "Monthly Outflow",
            amount: totalExpenses,
            icon: <TrendingDown className="text-red-400" size={24} />,
            trendValue: trends?.expenses || 0,
            color: "red-400"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden"
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 blur-2xl bg-${stat.color}/10`} />

                    <div className="relative z-10 flex flex-col gap-6">

                        {/* Top Row */}
                        <div className="flex items-center justify-between">
                            <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                                {stat.icon}
                            </div>

                            {stat.trendValue !== null && (
                                <div className={`text-xs font-semibold px-3 py-1 rounded-full 
                                    ${stat.trendValue >= 0 ? "text-emerald-400 bg-emerald-400/10" : "text-red-400 bg-red-400/10"}`}>
                                    {stat.trendValue >= 0 ? "+" : ""}
                                    {stat.trendValue.toFixed(1)}%
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div>
                            <p className="text-slate-400 text-xs uppercase tracking-wider mb-2">
                                {stat.label}
                            </p>

                            <h3 className="text-3xl font-bold text-white tracking-tight">
                                <CountUp value={stat.amount} />
                            </h3>
                        </div>
                    </div>

                    {/* Subtle Gradient Border Glow */}
                    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition" />
                </motion.div>
            ))}
        </div>
    );
}