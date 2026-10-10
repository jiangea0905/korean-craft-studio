import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PracticeNotice } from "@/components/PracticeNotice";
import { StudioApp } from "@/components/StudioApp";
import { craftClasses } from "@/mocks/classes";
import { crafts } from "@/mocks/crafts";

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-16 sm:px-6">
        <Hero />
        <PracticeNotice className="mb-8" />
        <StudioApp crafts={crafts} classes={craftClasses} />
      </main>
      <Footer />
    </>
  );
}
