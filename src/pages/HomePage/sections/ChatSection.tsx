import { useState, useRef, useEffect, useMemo, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, Bot, User } from 'lucide-react';
import { scopedStorage } from '@lark-apaas/client-toolkit-lite';
import { toast } from 'sonner';
import { streamChat, type ChatMessage as AiChatMessage } from '@/lib/ai-client';
import { MOCK_PROFILE } from '@/data/profile';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'chat_history';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'welcome',
  role: 'assistant',
  content: '嘿，这是我的数字分身，你可以和我聊！',
  timestamp: Date.now(),
};

function loadHistory(): ChatMessage[] {
  try {
    const raw = scopedStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME_MESSAGE];
    const parsed = JSON.parse(raw) as ChatMessage[];
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    return [WELCOME_MESSAGE];
  } catch {
    return [WELCOME_MESSAGE];
  }
}

function saveHistory(messages: ChatMessage[]) {
  try {
    scopedStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // ignore
  }
}

export default function ChatSection() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadHistory());
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // 持久化
  useEffect(() => {
    saveHistory(messages);
  }, [messages]);

  // 自动滚动到底部
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  const hasContent = useMemo(
    () => messages.length > 1 || messages[0]?.id !== 'welcome',
    [messages]
  );

  async function sendMessage(question: string) {
    const trimmed = question.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    const assistantMsg: ChatMessage = {
      id: `assistant_${Date.now()}`,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg, assistantMsg]);
    setInput('');
    setIsLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const systemPrompt = `你是夏刘军的数字分身，用来在个人主页里回答访客关于夏刘军的问题。

你的任务：
- 介绍夏刘军是谁
- 回答和夏刘军有关的问题
- 帮访客了解夏刘军最近在做什么、做过什么、怎么联系他

关于夏刘军：
- 姓名：${MOCK_PROFILE.name}
- 一句话介绍：${MOCK_PROFILE.tagline}
- 最近在做：待业在家，主要是休养身体，学习AI
- 擅长或长期关注：销售、科技、投资

说话方式：
- 语气：真诚，温和
- 回答尽量简洁、真诚、人话一点、不装专家
- 像平时聊天一样，口语化，不官方不正式

边界：
- 不要编造夏刘军没做过的经历
- 不要假装知道夏刘军没提供的信息
- 不知道时要明确说不知道，并建议访客通过页面底部的联系方式进一步确认`;

      const aiMessages: AiChatMessage[] = [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: trimmed },
      ];

      const stream = streamChat(aiMessages, { signal: controller.signal });

      let full = '';
      for await (const piece of stream) {
        if (piece) {
          // 去掉回复开头的空行和空白字符（AI 模型经常先输出换行符导致第一行空行）
          if (full === '') {
            full = piece.trimStart();
          } else {
            full += piece;
          }
          if (full) {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMsg.id ? { ...m, content: full } : m
              )
            );
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        return;
      }
      console.error('[ChatSection] AI 调用失败:', err);
      toast.error((err as Error).message || '数字分身暂时开小差了，稍后再试试～');
      setMessages((prev) =>
        prev.map((m) =>
          m.id === assistantMsg.id
            ? { ...m, content: '哎呀，刚才走神了，能再说一遍吗？' }
            : m
        )
      );
    } finally {
      setIsLoading(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  function handleQuickQuestion(q: string) {
    if (isLoading) return;
    sendMessage(q);
  }

  return (
    <section id="chat" className="w-full py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-lg md:text-xl font-semibold text-foreground mb-2">
            数字分身
          </h2>
          <p className="text-sm text-muted-foreground mb-5">
            想知道点什么？来跟我的 AI 分身聊聊吧～
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className="border-border overflow-hidden">
            <CardHeader className="pb-3 border-b border-border">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Bot className="w-3.5 h-3.5 text-primary" />
                老夏的数字分身
              </CardTitle>
              <CardDescription className="text-xs">
                基于我的信息回答
              </CardDescription>
            </CardHeader>

            <CardContent className="p-0">
              {/* 消息区 */}
              <div
                ref={scrollRef}
                className="h-[380px] overflow-y-auto p-4 space-y-3 bg-background"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={cn(
                        'flex gap-2 max-w-[85%]',
                        msg.role === 'user'
                          ? 'ml-auto flex-row-reverse'
                          : 'mr-auto'
                      )}
                    >
                      <div
                        className={cn(
                          'shrink-0 w-6 h-6 rounded-full flex items-center justify-center',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        )}
                      >
                        {msg.role === 'user' ? (
                          <User className="w-3 h-3" />
                        ) : (
                          <Bot className="w-3 h-3" />
                        )}
                      </div>
                      <div
                        className={cn(
                          'px-3 py-2 rounded-lg text-sm leading-relaxed whitespace-pre-wrap break-words',
                          msg.role === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        )}
                      >
                        {msg.content || (
                          <span className="inline-block w-2 h-4 bg-current opacity-40 animate-pulse rounded-sm" />
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-2 items-center text-xs text-muted-foreground pl-1"
                  >
                    <Loader2 className="w-3 h-3 animate-spin" />
                    <span>正在思考中…</span>
                  </motion.div>
                )}
              </div>

              {/* 推荐问题 */}
              {!hasContent && (
                <div className="px-4 py-3 border-t border-border bg-background">
                  <div className="text-xs text-muted-foreground mb-2">
                    试试问这些：
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {MOCK_PROFILE.recommendedQuestions.map((q) => (
                      <Button
                        key={q}
                        variant="outline"
                        size="sm"
                        className="text-xs h-7 px-3 rounded-md"
                        onClick={() => handleQuickQuestion(q)}
                        disabled={isLoading}
                      >
                        {q}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {/* 输入框 */}
              <form
                onSubmit={handleSubmit}
                className="p-3 border-t border-border flex gap-2"
              >
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="说点什么吧…"
                  className="flex-1 h-9"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!input.trim() || isLoading}
                  className="h-9 w-9 shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
