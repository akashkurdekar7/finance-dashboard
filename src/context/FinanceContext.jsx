import { createContext, useContext, useState, useEffect } from "react";

const FinanceContext = createContext();

export const FinanceProvider = ({ children }) => {
    const [role, setRole] = useState("viewer");
    const [transactions, setTransactions] = useState([]);
    const [cards, setCards] = useState([]);
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("all");

    // Static baseline for trends (In real app, this would be computed from past month's data)
    const [lastMonthData] = useState({
        income: 58000,
        expenses: 32000
    });

    useEffect(() => {
        const enrichedTransactions = [
            { id: 1, date: "2026-04-01", amount: 65000, category: "Salary", type: "income", description: "Monthly fixed salary" },
            { id: 2, date: "2026-04-02", amount: 12000, category: "Freelance", type: "income", description: "Website redesign project" },
            { id: 3, date: "2026-04-03", amount: 25000, category: "Rent", type: "expense", description: "Apartment monthly rent" },
            { id: 4, date: "2026-04-04", amount: 4500, category: "Food", type: "expense", description: "Weekly grocery shopping" },
            { id: 5, date: "2026-04-05", amount: 1200, category: "Dining", type: "expense", description: "Dinner at Sushi Sensation" },
            { id: 6, date: "2026-04-06", amount: 3500, category: "Transport", type: "expense", description: "Monthly fuel refill" },
            { id: 7, date: "2026-04-07", amount: 800, category: "Subscription", type: "expense", description: "Netflix Premium" },
            { id: 8, date: "2026-04-08", amount: 1500, category: "Utilities", type: "expense", description: "Water bill payment" },
            { id: 9, date: "2026-04-09", amount: 2200, category: "Shopping", type: "expense", description: "New wireless earbuds" },
            { id: 10, date: "2026-04-10", amount: 5000, category: "Freelance", type: "income", description: "Logo design commission" },
            { id: 11, date: "2026-04-11", amount: 1800, category: "Dining", type: "expense", description: "Brunch with friends" },
            { id: 12, date: "2026-04-12", amount: 600, category: "Subscription", type: "expense", description: "Spotify Family" },
            { id: 13, date: "2026-04-13", amount: 9500, category: "Electronics", type: "expense", description: "Mechanical keyboard upgrade" },
            { id: 14, date: "2026-04-14", amount: 500, category: "Transport", type: "expense", description: "Uber ride" },
            { id: 15, date: "2026-04-15", amount: 4000, category: "Dividends", type: "income", description: "Stock market payouts" },
        ];

        const initialCards = [
            { id: 1, cardNumber: "**** **** **** 4242", expiry: "12/28", holder: "John Doe", type: "visa", theme: "from-slate-950 via-slate-900 to-indigo-950", balance: 100000, cardType: "credit" },
            { id: 2, cardNumber: "**** **** **** 8888", expiry: "04/30", holder: "John Doe", type: "mastercard", theme: "from-emerald-600 via-emerald-800 to-slate-900", balance: 10000, cardType: "credit" },
            { id: 3, cardNumber: "**** **** **** 1234", expiry: "09/27", holder: "John Doe", type: "visa", theme: "from-amber-500 via-amber-700 to-slate-900", balance: 15000, cardType: "saving" },
            { id: 4, cardNumber: "**** **** **** 9999", expiry: "01/29", holder: "John Doe", type: "mastercard", theme: "from-rose-600 via-rose-800 to-slate-950", balance: 200, cardType: "saving" }
        ];

        const savedTxns = localStorage.getItem("transactions");
        const savedCards = localStorage.getItem("cards");

        setTransactions(savedTxns ? JSON.parse(savedTxns) : enrichedTransactions);
        setCards(savedCards ? JSON.parse(savedCards) : initialCards);
    }, []);

    useEffect(() => {
        if (transactions.length > 0) localStorage.setItem("transactions", JSON.stringify(transactions));
    }, [transactions]);

    useEffect(() => {
        if (cards.length > 0) localStorage.setItem("cards", JSON.stringify(cards));
    }, [cards]);

    const totalIncome = transactions.filter(t => t.type === "income").reduce((acc, t) => acc + t.amount, 0);
    const totalExpenses = transactions.filter(t => t.type === "expense").reduce((acc, t) => acc + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;

    // 🔹 Trend Calculations
    const calculateTrend = (current, previous) => {
        if (previous === 0) return 0;
        return ((current - previous) / previous) * 100;
    };

    const trends = {
        income: calculateTrend(totalIncome, lastMonthData.income),
        expenses: calculateTrend(totalExpenses, lastMonthData.expenses)
    };

    const filteredTransactions = transactions.filter(t => {
        const matchesSearch = t.category.toLowerCase().includes(search.toLowerCase()) || 
                             t.description.toLowerCase().includes(search.toLowerCase());
        const matchesType = filterType === "all" ? true : t.type === filterType;
        return matchesSearch && matchesType;
    });

    const deleteTransaction = (id) => setTransactions(prev => prev.filter(t => t.id !== id));
    const addTransaction = (newTransaction) => setTransactions(prev => [{ ...newTransaction, id: Date.now() }, ...prev]);
    const addCard = (newCard) => setCards(prev => [...prev, { ...newCard, id: Date.now() }]);
    const deleteCard = (id) => setCards(prev => prev.filter(c => c.id !== id));

    const permissions = {
        admin: { canAdd: true, canEdit: true, canDelete: true },
        viewer: { canAdd: false, canEdit: false, canDelete: false },
    };

    return (
        <FinanceContext.Provider
            value={{
                role, setRole,
                transactions, setTransactions, filteredTransactions,
                search, setSearch,
                filterType, setFilterType,
                cards, setCards,
                deleteTransaction, addTransaction,
                addCard, deleteCard,
                totalIncome, totalExpenses, totalBalance,
                trends, // 🔹 Exposing calculated trends
                permissions: permissions[role],
            }}
        >
            {children}
        </FinanceContext.Provider>
    );
};

export const useFinance = () => useContext(FinanceContext);