import { Toaster } from '@/components/ui/sonner';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ChatSection from './sections/ChatSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-4 md:space-y-6">
        <HeroSection />
        <AboutSection />
        <ChatSection />
      </main>
      <footer className="w-full py-8 text-center text-xs text-muted-foreground">
        <div className="max-w-3xl mx-auto px-4">
          © {new Date().getFullYear()} 夏刘军 · 闲云野鹤
        </div>
      </footer>
      <Toaster />
    </div>
  );
}
