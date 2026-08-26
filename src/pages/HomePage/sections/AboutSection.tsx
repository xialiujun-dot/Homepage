import { motion } from 'framer-motion';
import { MOCK_PROFILE } from '@/data/profile';
import { Badge } from '@/components/ui/badge';

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-5">
            最近在忙啥
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-card border border-border rounded-xl p-5 md:p-6"
        >
          <p className="text-sm md:text-base text-foreground leading-relaxed">
            嘿，我是老夏～目前赋闲在家，每天瞅瞅投资、学学 AI 编程，日子过得慵懒但也充实。
            对科技和投资一直挺感兴趣，也在努力跟上时代的脚步。
            如果你也对这些感兴趣，或者就是想随便唠唠，欢迎找我的数字分身聊聊～
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-5"
        >
          <div className="text-xs text-muted-foreground mb-2">平时关注这些</div>
          <div className="flex flex-wrap gap-2">
            {MOCK_PROFILE.interests.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-muted-foreground"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
