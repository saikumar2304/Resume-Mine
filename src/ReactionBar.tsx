import React, { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

const reactionsList = [
  { type: "like", emoji: "👍" },
  { type: "idea", emoji: "💡" },
  { type: "wow", emoji: "🤯" },
];

const ReactionBar: React.FC = () => {
  const [counts, setCounts] = useState<{ [key: string]: number }>({});

  const fetchCounts = async () => {
    const { data, error } = await supabase
      .from("reactions")
      .select("type");

    if (!error && data) {
      const grouped = data.reduce((acc: any, item: any) => {
        acc[item.type] = (acc[item.type] || 0) + 1;
        return acc;
      }, {});
      setCounts(grouped);
    }
  };

  const handleReact = async (type: string) => {
    await supabase.from("reactions").insert({ type });
    fetchCounts(); // update counts after reaction
  };

  useEffect(() => {
    fetchCounts();
    const interval = setInterval(fetchCounts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed right-2 top-1/2 -translate-y-1/2 z-50 bg-slate-800 p-3 rounded-lg shadow-lg space-y-3">
      {reactionsList.map(({ type, emoji }) => (
        <button
          key={type}
          onClick={() => handleReact(type)}
          className="flex flex-col items-center text-white hover:text-indigo-400 transition"
        >
          <span className="text-2xl">{emoji}</span>
          <span className="text-sm font-semibold">{counts[type] || 0}</span>
        </button>
      ))}
    </div>
  );
};

export default ReactionBar;