import { useFinance } from "../context/FinanceContext";
import { TrendingUp, AlertTriangle, Lightbulb, TrendingDown, Target, Zap, Rocket } from "lucide-react";
import { motion } from "framer-motion";

export default function Insights() {
    const { transactions, totalIncome, totalExpenses } = useFinance();

    // 🔹 Advanced Data Intelligence Logic
    const analyzeData = () => {
        const categories = {};
        const dailyTransactions = { weekday: { sum: 0, count: 0 }, weekend: { sum: 0, count: 0 } };
        
        transactions.forEach(t => {
            if (t.type === 'expense') {
                categories[t.category] = (categories[t.category] || 0) + t.amount;
                
                const date = new Date(t.date);
                const isWeekend = date.getDay() === 0 || date.getDay() === 6;
                if (isWeekend) {
                    dailyTransactions.weekend.sum += t.amount;
                    dailyTransactions.weekend.count++;
                } else {
                    dailyTransactions.weekday.sum += t.amount;
                    dailyTransactions.weekday.count++;
                }
            }
        });

        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0] || ["None", 0];
        const weekendAvg = dailyTransactions.weekend.count > 0 ? dailyTransactions.weekend.sum / dailyTransactions.weekend.count : 0;
        const weekdayAvg = dailyTransactions.weekday.count > 0 ? dailyTransactions.weekday.sum / dailyTransactions.weekday.count : 0;
        
        return {
            topCategory: topCategory[0],
            topAmount: topCategory[1],
            isDeficit: totalExpenses > totalIncome,
            deficitAmount: totalExpenses - totalIncome,
            isWeekendHeavy: weekendAvg > weekdayAvg * 1.5,
            categories: Object.entries(categories).slice(0, 4)
        };
    };

    const intel = analyzeData();

    return (
        <div className="space-y-10">
            {/* Header */}
            <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/20 rounded-xl flex items-center justify-center border border-brand-primary/20 shadow-lg shadow-brand-primary/10 animate-pulse">
                        <Zap size={20} className="text-brand-primary" />
                    </div>
                    <div>
                        <h3 className="text-xl font-extrabold tracking-tighter text-white">Smart Intelligence</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Automated Advisory</p>
                    </div>
                </div>
            </div>

            {/* Main Cards Row */}
            <div className="grid grid-cols-1 gap-6">
                {/* 1. Volatility / Top Spending */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-slate-950 border border-white/5 rounded-[2rem] shadow-2xl relative overflow-hidden group"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-brand-primary/10 rounded-xl text-brand-primary border border-brand-primary/20 shadow-inner">
                            <TrendingUp size={24} />
                        </div>
                        <h4 className="text-sm font-black uppercase tracking-widest text-[#00c0c9]">Volatile Category</h4>
                    </div>

                    <div className="space-y-2 relative z-10">
                        <h2 className="text-5xl font-extrabold text-white tracking-tighter">{intel.topCategory}</h2>
                        <p className="text-xs text-slate-400 font-bold leading-relaxed">
                            Your spending here is significant. Implementing a 15% budget cap could save you approx. ₹{(intel.topAmount * 0.15).toFixed(0)} per month.
                        </p>
                    </div>

                    {/* Gradient Accent */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full" />
                </motion.div>

                {/* 2. Deficit / Advisory */}
                {intel.isDeficit && (
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="p-8 bg-red-400/5 border border-red-500/20 rounded-[2rem] shadow-3xl relative overflow-hidden"
                    >
                        <div className="flex items-center gap-4 mb-4 text-red-400">
                            <AlertTriangle size={20} className="animate-bounce" />
                            <h4 className="text-[10px] font-black uppercase tracking-widest">Financial Alert</h4>
                        </div>
                        <h3 className="text-2xl font-extrabold text-white tracking-tight mb-2">Deficit Detected</h3>
                        <p className="text-xs text-red-200/60 font-medium leading-relaxed">
                            Expenses exceeded income by ₹{intel.deficitAmount.toLocaleString()} this period. Reconsider large purchases.
                        </p>
                    </motion.div>
                )}

                {/* 3. Behavioral Insight */}
                <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-brand-accent/5 border border-brand-accent/20 rounded-[2rem] shadow-2xl relative overflow-hidden"
                >
                    <div className="flex items-center gap-4 mb-4 text-brand-accent">
                        <Lightbulb size={24} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest">Behavioral Pattern</h4>
                    </div>
                    <p className="text-xs text-slate-200 font-bold leading-relaxed pr-8">
                        {intel.isWeekendHeavy 
                            ? "🚀 Weekend spikes detected! Saturday spending is 50% higher than average. Try automated saving on Fridays."
                            : "💡 Sustainable pattern! Your weekday and weekend spending are balanced. Top performance."}
                    </p>
                    <div className="absolute bottom-6 right-6">
                        <Rocket size={48} className="text-brand-accent opacity-10 rotate-12" />
                    </div>
                </motion.div>
            </div>

            {/* Categorical Pulse Breakdown */}
            <section className="space-y-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3 px-2">
                    <Target size={18} className="text-slate-500" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Live Breakdown</h4>
                </div>
                <div className="space-y-6">
                    {intel.categories.map(([cat, amt]) => (
                        <div key={cat} className="space-y-3 px-2 group">
                            <div className="flex items-center justify-between text-xs font-black uppercase tracking-widest">
                                <span className="text-slate-400 group-hover:text-white transition-colors">{cat}</span>
                                <span className="text-white">₹{amt.toLocaleString()}</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-white/5 shadow-inner">
                                <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(amt / intel.topAmount) * 100}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className={`h-full bg-gradient-to-r ${cat === intel.topCategory ? 'from-brand-primary to-brand-accent' : 'from-slate-600 to-slate-400'} shadow-[0_0_15px_rgba(0,192,201,0.3)]`}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}