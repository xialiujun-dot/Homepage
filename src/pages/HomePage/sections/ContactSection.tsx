import { motion } from 'framer-motion';
import { MOCK_PROFILE, type IContact } from '@/data/profile';
import { Mail, Phone, Github, Link2, MessageCircle } from 'lucide-react';

function ContactIcon({ type }: { type: IContact['type'] }) {
  const className = 'w-5 h-5 text-primary';
  switch (type) {
    case 'email':
      return <Mail className={className} />;
    case 'phone':
      return <Phone className={className} />;
    case 'github':
      return <Github className={className} />;
    case 'wechat':
      return <MessageCircle className={className} />;
    default:
      return <Link2 className={className} />;
  }
}

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-5"
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground flex items-center gap-2">
            <Link2 className="w-5 h-5 text-primary" />
            联系我
          </h2>
          <p className="text-sm text-muted-foreground mt-2">
            想聊聊？可以通过下面的方式找到我～
          </p>
        </motion.div>

        <div className="bg-card border border-border rounded-xl p-5 md:p-6">
          <div className="space-y-4">
            {MOCK_PROFILE.contacts.map((contact, index) => (
              <motion.div
                key={contact.label}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-center gap-4"
              >
                <div className="shrink-0 w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                  <ContactIcon type={contact.type} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-muted-foreground mb-0.5">
                    {contact.label}
                  </div>
                  {contact.link ? (
                    <a
                      href={contact.link}
                      className="text-sm font-medium text-foreground hover:text-primary transition-colors truncate block"
                    >
                      {contact.value}
                    </a>
                  ) : (
                    <div className="text-sm font-medium text-foreground truncate">
                      {contact.value}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
