import { useEffect, useState } from "react";
import { motion, useSpring, useTransform, animate } from "framer-motion";

export default function CountUp({ value, duration = 2 }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        const controls = animate(displayValue, value, {
            duration,
            onUpdate: (latest) => setDisplayValue(Math.floor(latest)),
        });
        return () => controls.stop();
    }, [value, duration]);

    return (
        <motion.span>
            ₹{displayValue.toLocaleString()}
        </motion.span>
    );
}
