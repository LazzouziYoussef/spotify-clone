import TopBar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    trendingSongs,
    fetchTrendingSongs,
    madeForYouSongs,
    fetchMadeForYouSongs,
    isLoading,
  } = useMusicStore();
  useEffect(() => {
    fetchMadeForYouSongs();
    fetchFeaturedSongs();
    fetchTrendingSongs();
  }, [fetchMadeForYouSongs, fetchTrendingSongs, fetchFeaturedSongs]);
  return (
    <main className="space-y-4 rounded-lg overflow-hidden h-full bg-linear-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6 ">
            Good Afternoon
          </h1>
          <FeaturedSection />
        </div>
        <div className="space-y-8 p-4">
          <SectionGrid
            title="Made For You"
            songs={madeForYouSongs}
            isLoading={isLoading}
          />
          <SectionGrid
            title="Trending"
            songs={trendingSongs}
            isLoading={isLoading}
          />
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
