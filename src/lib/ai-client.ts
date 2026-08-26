// AI 大模型客户端（OpenAI 兼容格式，支持流式输出）
// 配置见项目根目录 .env.local

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface StreamChatOptions {
  signal?: AbortSignal
}

function getConfig() {
  const baseURL = import.meta.env.VITE_AI_BASE_URL as string | undefined
  const apiKey = import.meta.env.VITE_AI_API_KEY as string | undefined
  const model = import.meta.env.VITE_AI_MODEL as string | undefined

  if (!baseURL) {
    throw new Error('请在 .env.local 中配置 VITE_AI_BASE_URL')
  }
  if (!apiKey || apiKey === 'your-api-key-here') {
    throw new Error('请在 .env.local 中配置 VITE_AI_API_KEY')
  }
  if (!model || model === 'your-model-id-here') {
    throw new Error('请在 .env.local 中配置 VITE_AI_MODEL')
  }

  return { baseURL: baseURL.replace(/\/$/, ''), apiKey, model }
}

/**
 * 流式聊天，返回异步生成器，逐段 yield 回复内容
 */
export async function* streamChat(
  messages: ChatMessage[],
  options?: StreamChatOptions,
): AsyncGenerator<string, void, unknown> {
  const { baseURL, apiKey, model } = getConfig()

  const response = await fetch(`${baseURL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      messages,
      stream: true,
      temperature: 0.7,
    }),
    signal: options?.signal,
  })

  if (!response.ok) {
    const text = await response.text().catch(() => '')
    throw new Error(`API 请求失败 (${response.status}): ${text || response.statusText}`)
  }

  const reader = response.body?.getReader()
  if (!reader) {
    throw new Error('无法读取响应流')
  }

  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed || !trimmed.startsWith('data:')) continue

        const data = trimmed.slice(5).trim()
        if (data === '[DONE]') return

        try {
          const json = JSON.parse(data)
          const content = json.choices?.[0]?.delta?.content
          if (content) {
            yield content
          }
        } catch {
          // 忽略非 JSON 行（部分平台可能有心跳行）
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
