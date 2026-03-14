import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

const Totop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) setIsVisible(true);
      else setIsVisible(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 flex items-center justify-center right-6 h-13 w-13 rounded-lg shadow-lg bg-[#150f33] text-[#f0f0f0] hover:bg-[#271c5d] hover:cursor-pointer active:bg-[#150f33] transition-all duration-300 border ${
        isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
      }`}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default Totop;
