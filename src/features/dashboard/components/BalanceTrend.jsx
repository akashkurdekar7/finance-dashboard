import { useState, useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useFinance } from "../../../context/FinanceContext";
import { TrendingUp, TrendingDown, Clock, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function BalanceTrend() {
    const { transactions, timeRange, setTimeRange } = useFinance();

    // 🔹 Data Transformation Hub
    const data = useMemo(() => {
        const aggregated = {};
        const days = 7; // Fixed window for visualization
        const today = new Date();

        for (let i = days - 1; i >= 0; i--) {
            const date = new Date(today);
            date.setDate(today.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            const displayDate = date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });

            aggregated[dateStr] = { date: displayDate, income: 0, expense: 0 };
        }

        transactions.forEach(t => {
            if (aggregated[t.date]) {
                if (t.type === 'income') aggregated[t.date].income += t.amount;
                else aggregated[t.date].expense += t.amount;
            }
        });

        return Object.values(aggregated);
    }, [transactions]);

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-slate-900/90 backdrop-blur-3xl border border-white/10 p-5 rounded-2xl shadow-3xl animate-in zoom-in-95">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-3">{label}</p>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-brand-primary shadow-[0_0_8px_rgba(0,192,201,0.5)]" />
                                <span className="text-xs font-bold text-slate-300">Net Inflow</span>
                            </div>
                            <span className="text-sm font-black text-brand-primary">₹{payload[0].value.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]" />
                                <span className="text-xs font-bold text-slate-300">Outflow</span>
                            </div>
                            <span className="text-sm font-black text-rose-400">₹{payload[1].value.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    return (
        <motion.div
            className="w-full space-y-8 p-10 bg-slate-900/40 rounded-[3rem] border border-white/5 backdrop-blur-xl relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
                        <Activity className="text-brand-accent animate-pulse" size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-extrabold tracking-tighter text-white">Dynamic Flow</h3>
                        <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest leading-none">Net Analytics Engine</p>
                    </div>
                </div>

                {/* Time Switcher */}
                <div className="flex items-center bg-slate-950/60 p-1.5 rounded-2xl border border-white/5 shadow-inner">
                    {['daily', 'weekly', 'monthly'].map((range) => (
                        <button
                            key={range}
                            onClick={() => setTimeRange(range)}
                            className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${timeRange === range ? 'bg-slate-800 text-brand-primary shadow-lg shadow-black/40 border border-white/5' : 'text-slate-500 hover:text-slate-300'}`}
                        >
                            {range}
                        </button>
                    ))}
                </div>
            </header>

            <div className="h-[350px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--brand-primary)" stopOpacity={0.4} />
                                <stop offset="95%" stopColor="var(--brand-primary)" stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#f43f5e" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                        <XAxis
                            dataKey="date"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: '#475569', fontSize: 10, fontWeight: 800 }}
                            dy={20}
                        />
                        <YAxis hide />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.05)', strokeWidth: 2 }} />
                        <Area
                            type="monotone"
                            dataKey="income"
                            stroke="var(--brand-primary)"
                            strokeWidth={4}
                            fillOpacity={1}
                            fill="url(#colorIncome)"
                            animationDuration={2000}
                        />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            stroke="#f43f5e"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorExpense)"
                            animationDuration={2500}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>

            {/* Alive Stat Pulses */}
            <footer className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <TrendingUp size={20} className="text-brand-primary" />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Inbound Peak</span>
                        <h4 className="text-lg font-extrabold text-white">₹{Math.max(...data.map(d => d.income)).toLocaleString()}</h4>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
                        <TrendingDown size={20} className="text-rose-500" />
                    </div>
                    <div>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">Outbound Peak</span>
                        <h4 className="text-lg font-extrabold text-white">₹{Math.max(...data.map(d => d.expense)).toLocaleString()}</h4>
                    </div>
                </div>
            </footer>
        </motion.div>
    );
}
