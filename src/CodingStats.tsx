import React, { useEffect, useState } from "react";

interface CodingStats {
  leetcode: {
    totalSolved: number;
    easy: number;
    medium: number;
    hard: number;
    ranking: number;
  };
  hackerRank: {
    rank: number;
    badges: number;
    followers: number;
  };
  codeWars: {
    honor: number;
    totalCompleted: number;
    rank: string;
  };
}

const CodingStats: React.FC = () => {
  const [stats, setStats] = useState<CodingStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // ✅ Fetch LeetCode Stats
        const leetcodeResponse = await fetch(
          "https://leetcode-stats-api.herokuapp.com/saikumar2304"
        );
        const leetcodeData = await leetcodeResponse.json();

        // ✅ Fetch CodeWars Stats
        const codeWarsResponse = await fetch(
          "https://www.codewars.com/api/v1/users/saikumar2304"
        );
        const codeWarsData = await codeWarsResponse.json();

        // ❌ HackerRank API is failing, so we use a placeholder
        const hackerRankData = {
          rank: 0, // No global ranking available
          badges: 5, // Placeholder for badges
          followers: 20, // Placeholder followers
        };

        setStats({
          leetcode: {
            totalSolved: leetcodeData.totalSolved || 0,
            easy: leetcodeData.easySolved || 0,
            medium: leetcodeData.mediumSolved || 0,
            hard: leetcodeData.hardSolved || 0,
            ranking: leetcodeData.ranking || "N/A",
          },
          hackerRank: {
            rank: hackerRankData.rank,
            badges: hackerRankData.badges,
            followers: hackerRankData.followers,
          },
          codeWars: {
            honor: codeWarsData.honor || 0,
            totalCompleted: codeWarsData.codeChallenges?.totalCompleted || 0,
            rank: codeWarsData.ranks?.overall?.name || "Unranked",
          },
        });
      } catch (error) {
        console.error("Error fetching coding stats:", error);
        setError("Failed to load some stats, but other data is available.");
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center text-slate-900 mb-6">
        My Coding Stats
      </h2>
      <div className="h-1 w-24 bg-indigo-600 mx-auto mb-12"></div>

      {error ? (
        <p className="text-center text-red-600">{error}</p>
      ) : stats ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* LeetCode Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-indigo-600">LeetCode</h3>
            <p className="text-slate-700 mt-2">Total Solved: {stats.leetcode.totalSolved}</p>
            <p className="text-green-600">Easy: {stats.leetcode.easy}</p>
            <p className="text-yellow-600">Medium: {stats.leetcode.medium}</p>
            <p className="text-red-600">Hard: {stats.leetcode.hard}</p>
            <p className="text-slate-500 mt-2">Ranking: #{stats.leetcode.ranking}</p>
          </div>

          {/* HackerRank Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-green-600">HackerRank</h3>
            <p className="text-slate-700 mt-2">Global Rank: {stats.hackerRank.rank}</p>
            <p className="text-indigo-600">Badges: {stats.hackerRank.badges}</p>
            <p className="text-slate-500 mt-2">Followers: {stats.hackerRank.followers}</p>
            <p className="text-gray-500 text-sm mt-1">*Estimated (API not available)</p>
          </div>

          {/* CodeWars Stats */}
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-2xl font-semibold text-red-600">CodeWars</h3>
            <p className="text-slate-700 mt-2">Honor: {stats.codeWars.honor}</p>
            <p className="text-indigo-600">Challenges Completed: {stats.codeWars.totalCompleted}</p>
            <p className="text-slate-500 mt-2">Rank: {stats.codeWars.rank}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-slate-700">Loading coding stats...</p>
      )}
    </div>
  );
};

export default CodingStats;