import {useState, useEffect} from "react";
import {useFinance} from "../context/FinanceContext";
import SummaryCards from "../features/dashboard/components/SummaryCards";
import Filters from "../features/dashboard/components/Filters";
import BalanceTrend from "../features/dashboard/components/BalanceTrend";
import Insights from "./Insights";
import CardStack from "../components/CardStack";
import CustomSelect from "../components/ui/CustomSelect";
import {
  Plus,
  X,
  ListPlus,
  CreditCard as CardIcon,
  Palette,
  ArrowRightLeft,
  Sparkles,
} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";
import TransactionsTable from "./Transactions";
import AddTransactionModal from "../features/dashboard/modals/AddTransactionModal";
import AddCardModal from "../features/dashboard/modals/AddCardModal";

export default function Dashboard() {
  const {addTransaction, addCard, permissions} = useFinance();
  const {cards} = useFinance();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingCard, setIsAddingCard] = useState(false);

  // 🔹 Simulate 'Elite' Data Loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const [newTxn, setNewTxn] = useState({
    amount: "",
    category: "",
    type: "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiry: "",
    holder: "",
    type: "visa",
    theme: "from-slate-950 via-slate-900 to-indigo-950",
    balance: 0,
  });

  const typeOptions = [
    {value: "expense", label: "Expense (-)"},
    {value: "income", label: "Income (+)"},
  ];

  const cardTypeOptions = [
    {value: "visa", label: "Visa"},
    {value: "mastercard", label: "Mastercard"},
  ];

  const themeOptions = [
    {value: "from-slate-950 via-slate-900 to-indigo-950", label: "Midnight"},
    {value: "from-emerald-600 via-emerald-800 to-slate-900", label: "Emerald"},
    {value: "from-amber-500 via-amber-700 to-slate-900", label: "Gold"},
    {value: "from-rose-600 via-rose-800 to-slate-950", label: "Corporate"},
  ];

  // const handleAddTxn = (e) => {
  //   e.preventDefault();

  //   if (!newTxn.amount || isNaN(newTxn.amount)) return;

  //   addTransaction({
  //     ...newTxn,
  //     amount: parseFloat(newTxn.amount),
  //   });

  //   setIsAdding(false);
  // };
const handleAddTxn = (e) => {
  e.preventDefault();

  if (!newTxn.amount || isNaN(newTxn.amount)) return;

  addTransaction({
    ...newTxn,
    amount: parseFloat(newTxn.amount),
    id: Date.now(),
  });

  // ✅ RESET FORM
  setNewTxn({
    amount: "",
    category: "",
    type: "expense",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  setIsAdding(false);
};
  const handleAddCard = (e) => {
    e.preventDefault();
    if (newCard.cardNumber.replace(/\s/g, "").length !== 16) {
      alert("Card number must be 16 digits");
      return;
    }
    if (!newCard.expiry || !newCard.holder) {
      alert("Card expiry and holder are required");
      return;
    }
    addCard({...newCard, balance: parseFloat(newCard.balance)});
    setIsAddingCard(false);
    setNewCard({
      cardNumber: "",
      expiry: "",
      holder: "",
      type: "visa",
      theme: "from-slate-950 via-slate-900 to-indigo-950",
      balance: 0,
    });
  };

  if (isLoading) {
    return (
      <div className="space-y-16 p-10 animate-pulse">
        <div className="h-20 w-1/3 bg-slate-800/40 rounded-3xl animate-shimmer" />
        <div className="grid grid-cols-3 gap-10">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-64 bg-slate-800/20 rounded-[2.5rem] animate-shimmer"
            />
          ))}
        </div>
        <div className="grid grid-cols-12 gap-16">
          <div className="col-span-8 h-[500px] bg-slate-800/10 rounded-[3rem] animate-shimmer" />
          <div className="col-span-4 h-[500px] bg-slate-800/10 rounded-[3rem] animate-shimmer" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{opacity: 0}}
      animate={{opacity: 1}}>
      <header className="
  sticky top-0 z-[100]
   backdrop-blur-2xl rounded-3xl 
  flex flex-col md:flex-row md:items-end justify-between gap-12
  px-6 py-4 
">
        <div className="space-y-2">
          <div className="flex items-center gap-3 text-brand-primary">
            <Sparkles size={16} className="animate-spin-slow" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">
              Live Intelligence
            </span>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tighter text-white">
            Overview
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <Filters />
          {permissions?.canAdd && (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-brand-primary text-slate-950 px-8 py-4 rounded-3xl font-black text-sm flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-primary/40 group shrink-0 cursor-pointer">
              <Plus
                size={22}
                className="group-hover:rotate-90 transition-transform"
              />
              <span>Post Entry</span>
            </button>
          )}
        </div>
      </header>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mt-6">
        <div className="lg:col-span-8 flex flex-col gap-20">
          <div className="w-full">
            <SummaryCards />
          </div>

          <section className="w-full">
            <BalanceTrend />
          </section>

          <section className="space-y-8">
            <div className="flex items-center justify-between px-6">
              <div className="flex items-center gap-4">
                <h3 className="text-3xl font-extrabold tracking-tighter">
                  Recent Records
                </h3>
                <div className="h-1.5 w-1.5 rounded-full bg-brand-primary/40" />
                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">
                  History
                </span>
              </div>
            </div>
            <div className="glass-container">
              <TransactionsTable />
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 flex flex-col gap-20 sticky top-12">
          <div className="flex justify-center w-full">
            <CardStack cards={cards} onAddClick={() => setIsAddingCard(true)} />
          </div>

          <div className="flex justify-center lg:justify-end w-full">
            <Insights />
          </div>
        </div>
      </div>
      <AddTransactionModal
        open={isAdding}
        onClose={() => setIsAdding(false)}
        newTxn={newTxn}
        setNewTxn={setNewTxn}
        onSubmit={handleAddTxn}
        typeOptions={typeOptions}
      />

      <AddCardModal
        open={isAddingCard}
        onClose={() => setIsAddingCard(false)}
        newCard={newCard}
        setNewCard={setNewCard}
        onSubmit={handleAddCard}
        cardTypeOptions={cardTypeOptions}
        themeOptions={themeOptions}
      />
    </motion.div>
  );
}
