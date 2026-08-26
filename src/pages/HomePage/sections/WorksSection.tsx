import { motion } from 'framer-motion';
import { MOCK_PROFILE } from '@/data/profile';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';

export default function WorksSection() {
  return (
    <section id="works" className="w-full py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-primary" />
            做过的事
          </h2>
        </motion.div>

        <div className="space-y-4">
          {MOCK_PROFILE.works.map((work, index) => (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <a
                href={work.link || '#'}
                onClick={(e) => { if (!work.link) e.preventDefault(); }}
                className="block bg-card border border-border rounded-xl p-5 md:p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-base md:text-lg font-medium text-foreground group-hover:text-primary transition-colors">
                    {work.title}
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  {work.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {work.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-xs text-muted-foreground"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
