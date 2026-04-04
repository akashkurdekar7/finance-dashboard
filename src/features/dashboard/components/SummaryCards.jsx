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
            icon: <Wallet className="text-brand-accent group-hover:scale-110 transition-transform" size={28} />,
            trendValue: null,
            bg: "bg-brand-accent/5",
            dot: "bg-brand-accent",
            glow: "shadow-brand-accent/20"
        },
        {
            label: "Monthly Influx",
            amount: totalIncome,
            icon: <TrendingUp className="text-brand-primary group-hover:scale-110 transition-transform" size={28} />,
            trendValue: trends?.income || 0,
            bg: "bg-brand-primary/5",
            dot: "bg-brand-primary",
            glow: "shadow-brand-primary/20"
        },
        {
            label: "Monthly Outflow",
            amount: totalExpenses,
            icon: <TrendingDown className="text-red-400 group-hover:scale-110 transition-transform" size={28} />,
            trendValue: trends?.expenses || 0,
            bg: "bg-red-400/5",
            dot: "bg-red-400",
            glow: "shadow-red-400/20"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {stats.map((stat, idx) => (
                <motion.div
                    key={idx}
                    className={`stat-card group relative p-8 bg-slate-900 border border-white/5 rounded-[2.5rem] shadow-2xl transition-shadow hover:${stat.glow}`}
                    whileHover={{
                        scale: 1.02,
                        rotateX: 5,
                        rotateY: 5,
                        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                    }}
                    style={{ perspective: 1000 }}
                >
                    <div className="flex flex-col gap-8 w-full relative z-10">
                        <div className="flex items-center justify-between">
                            <div className={`${stat.bg} w-16 h-16 rounded-2xl flex items-center justify-center border border-white/5 shadow-inner`}>
                                {stat.icon}
                            </div>
                            {stat.trendValue !== null && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase ${stat.trendValue >= 0 ? 'bg-brand-primary/10 text-brand-primary' : 'bg-red-400/10 text-red-400'}`}
                                >
                                    {stat.trendValue >= 0 ? '+' : ''}{stat.trendValue.toFixed(1)}%
                                </motion.div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em]">{stat.label}</p>
                            <h3 className="text-5xl font-extrabold text-white tracking-tighter">
                                <CountUp value={stat.amount} />
                            </h3>
                        </div>

                        {/* Interactive Dot with Pulse */}
                        <div className="absolute top-0 right-0 p-8">
                            <div className={`w-2 h-2 rounded-full ${stat.dot} animate-pulse shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
                        </div>
                    </div>

                    {/* Gradient Overlay for Depth */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />
                </motion.div>
            ))}
        </div>
    );
}