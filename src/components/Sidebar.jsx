import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFinance } from "../context/FinanceContext";
import { LayoutDashboard, ReceiptText, PieChart, ShieldUser, TrendingUp, Sun, Moon, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import CustomSelect from "./ui/CustomSelect";

const Sidebar = () => {
    const { role, setRole, darkMode, setDarkMode } = useFinance();
    const [isHovered, setIsHovered] = useState(false);

    const navItems = [
        { icon: <LayoutDashboard size={22} />, label: "Dashboard", path: "/" },
        { icon: <ReceiptText size={22} />, label: "Transactions", path: "/transactions" },
        { icon: <PieChart size={22} />, label: "Insights", path: "/insights" },
    ];

    const roleOptions = [
        { value: "viewer", label: "Viewer Mode" },
        { value: "admin", label: "Admin Access" }
    ];

    return (
        <motion.div
            className="h-full bg-slate-950/40 backdrop-blur-3xl border-r border-slate-800 flex flex-col gap-10 shadow-2xl relative z-50 overflow-visible"
            initial={{ width: 100 }}
            animate={{ width: isHovered ? 280 : 100 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
            {/* Logo Section */}
            <div className="flex items-center gap-4 px-6 pt-10">
                <motion.div
                    className="w-12 h-12 bg-gradient-to-tr from-brand-primary to-brand-accent rounded-2xl flex items-center justify-center shadow-lg shadow-brand-primary/20 shrink-0"
                    whileHover={{ scale: 1.1, rotate: 15 }}
                >
                    <TrendingUp className="text-white" size={24} />
                </motion.div>
                <AnimatePresence>
                    {isHovered && (
                        <motion.h1
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-2xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent whitespace-nowrap"
                        >
                            Finance.io
                        </motion.h1>
                    )}
                </AnimatePresence>
            </div>

            {/* Navigation Section */}
            <nav className="flex-1 space-y-4 px-4 overflow-hidden">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `
                            flex items-center gap-6 px-4 py-4 rounded-2xl cursor-pointer transition-all duration-300
                            ${isActive
                                ? "bg-brand-primary/10 text-brand-primary border border-brand-primary/20 shadow-lg shadow-brand-primary/5"
                                : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-100"}
                        `}
                    >
                        <div className="shrink-0">{item.icon}</div>
                        <AnimatePresence>
                            {isHovered && (
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="font-bold whitespace-nowrap flex-1"
                                >
                                    {item.label}
                                </motion.span>
                            )}
                        </AnimatePresence>
                        {isHovered && <ChevronRight size={14} className="opacity-40" />}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Controls */}
            <div className={`px-4 pb-30 space-y-6 transition-all ${isHovered ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
                {/* Dark Mode Toggle */}
                <div className="flex items-center justify-between px-4 py-4 bg-slate-900 border border-white/5 rounded-2xl">
                    <div className="flex items-center gap-3">
                        {darkMode ? <Moon size={18} className="text-brand-accent" /> : <Sun size={18} className="text-brand-primary" />}
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Night Flow</span>
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className={`w-10 h-5 rounded-full relative transition-colors ${darkMode ? 'bg-brand-accent' : 'bg-slate-700'}`}
                    >
                        <motion.div
                            className="w-4 h-4 bg-white rounded-full absolute top-0.5"
                            animate={{ left: darkMode ? 22 : 2 }}
                        />
                    </button>
                </div>

                {/* Role Switcher */}
                <div className="glass p-5 rounded-2xl border-brand-accent/20 bg-brand-accent/5 relative overflow-visible group">
                    <div className="flex items-center gap-2 mb-4 text-brand-accent relative z-10">
                        <ShieldUser size={18} />
                        <span className="text-[10px] font-black uppercase tracking-widest leading-none">Security Access</span>
                    </div>

                    <div className="relative z-10">
                        <CustomSelect
                            options={roleOptions}
                            value={role}
                            onChange={setRole}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

            {/* Hint for narrow view */}
            {!isHovered && (
                <div className="absolute inset-x-0 bottom-10 flex justify-center">
                    <ChevronRight size={20} className="text-slate-700 animate-pulse" />
                </div>
            )}
        </motion.div>
    );
};

export default Sidebar;