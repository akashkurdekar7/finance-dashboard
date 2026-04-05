import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  options,
  value,
  onChange,
  placeholder = "Select...",
  icon: Icon,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openUpward, setOpenUpward] = useState(false);
  const containerRef = useRef(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // 🔥 CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 AUTO POSITION (UP / DOWN)
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;

      if (spaceBelow < 250) {
        setOpenUpward(true);
      } else {
        setOpenUpward(false);
      }
    }
  }, [isOpen]);

  const handleSelect = (val) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* 🔥 SELECT BUTTON */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between gap-4 px-5 py-3.5 rounded-2xl cursor-pointer transition-all
          bg-slate-900 border border-white/5 shadow-lg
          ${isOpen ? "ring-2 ring-brand-primary border-transparent" : ""}
        `}
      >
        <div className="flex items-center gap-3">
          {Icon && <Icon size={18} className="text-brand-primary" />}
          <span className="text-xs font-black uppercase tracking-widest text-slate-200">
            {selectedOption?.label || placeholder}
          </span>
        </div>

        <ChevronDown
          size={14}
          className={`text-slate-500 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* 🔥 DROPDOWN */}
      {isOpen && (
        <div
          className={`absolute w-full z-[9999]
            ${openUpward ? "bottom-full mb-2" : "top-full mt-2"}
            bg-slate-900/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-3xl overflow-hidden
          `}
        >
          <div className="max-h-[260px] overflow-y-auto">
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => handleSelect(option.value)}
                className={`
                  px-6 py-4 text-xs font-black uppercase tracking-widest cursor-pointer transition-all
                  ${
                    value === option.value
                      ? "bg-brand-primary/20 text-brand-primary"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}