import { motion } from 'framer-motion';
import { MOCK_PROFILE } from '@/data/profile';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function HeroSection() {
  const scrollToChat = () => {
    document.querySelector('#chat')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="w-full py-24 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="mb-8">
            <Image
              src={MOCK_PROFILE.avatarUrl}
              alt={MOCK_PROFILE.name}
              className="w-32 h-32 md:w-36 md:h-36 rounded-full object-cover border-2 border-border shadow-sm"
            />
          </div>

          <div className="space-y-4 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {MOCK_PROFILE.name}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {MOCK_PROFILE.tagline}
            </p>
          </div>

          <Button
            onClick={scrollToChat}
            size="lg"
            className="rounded-full h-12 px-8 text-base font-medium gap-2.5 shadow-md hover:shadow-lg transition-shadow"
          >
            <MessageCircle className="w-5 h-5" />
            想了解更多，和我聊聊吧
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
