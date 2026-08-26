import { Toaster } from '@/components/ui/sonner';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import WorksSection from './sections/WorksSection';
import ChatSection from './sections/ChatSection';
import ContactSection from './sections/ContactSection';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="space-y-4 md:space-y-6">
        <HeroSection />
        <AboutSection />
        <WorksSection />
        <ChatSection />
        <ContactSection />
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
