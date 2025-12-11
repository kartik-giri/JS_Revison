// components/TextFeed.jsx
import { forwardRef } from "react";

const TextFeed = forwardRef(
  (
    { value, onChange, handleInput, type = "text", placeholder, children },
    ref
  ) => {
    return (
      <div className="flex justify-center mt-6">
        <input
          ref={ref}
          type={type}
          value={value ?? ""}                 // ← support controlled
          onChange={onChange || handleInput}  // ← support both names
          placeholder={placeholder || children}
          className="w-80 h-10 px-4 rounded-lg bg-[#1e426d] text-white placeholder-[#5d7692] outline-none"
          autoComplete="email"
        />
      </div>
    );
  }
);

TextFeed.displayName = "TextFeed";
export default TextFeed;