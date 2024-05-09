import Info from "@/components/info";
import MasonryGrid from "@/components/masonry-grid";
import Image from "next/image";

export default function Home() {
  return (
    <main className="w-full h-full flex flex-col md:flex-row overflow-y-hidden">
      <Info />
      <MasonryGrid />
    </main>
  );
}