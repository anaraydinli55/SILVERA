import { useInView } from "framer-motion";
import { useRef } from "react";

const useScrollReveal = (options = { once: true, amount: 0.3 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, options);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return { ref, isInView, variants };
};

export default useScrollReveal;
