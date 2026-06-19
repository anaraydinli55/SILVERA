import React from 'react';
import { motion } from 'framer-motion';

const TextArea = ({ label, id, value, onChange, placeholder, className = '', ...props }) => {
  return (
    <div className="relative z-0 w-full mb-6 group">
      <motion.textarea
        name={id}
        id={id}
        rows="4"
        className={`block py-2.5 px-0 w-full text-sm text-text-light bg-transparent border-0 border-b-2 border-text-muted appearance-none
                  focus:outline-none focus:ring-0 focus:border-accent-gold peer ${className}`}
        placeholder=" "
        required
        value={value}
        onChange={onChange}
        {...props}
      ></motion.textarea>
      <label
        htmlFor={id}
        className="peer-focus:font-medium absolute text-sm text-text-muted duration-300 transform -translate-y-6 scale-75 top-3 z-10 origin-[0] peer-focus:start-0
                  peer-focus:text-accent-gold peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-full rtl:peer-focus:left-auto"
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
