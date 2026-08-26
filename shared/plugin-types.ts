// ---- plugin:personal_digital_avatar_chat_1 ----
// ============================================================
// 插件 personal_digital_avatar_chat_1 (个人主页数字分身聊天) 的类型定义
// 由 get_plugin_ai_json 自动生成
// ============================================================

export interface PersonalDigitalAvatarChatOneInput {
  /** 访客提出的问题 */
  visitor_question: string;
}

/**
 * capabilityClient.load('personal_digital_avatar_chat_1').callStream<PersonalDigitalAvatarChatOneOutput>('textGenerate', input)
 * 每个 chunk 就是下面这个扁平对象，字段名与 PersonalDigitalAvatarChatOneOutput 一致，外面没有 data / choices / message 包装：
 *   {"response":"示例文本","content":"示例文本"}
 * 返回值可能是 AsyncIterable<chunk>，也可能是 { output: AsyncIterable<chunk> }，取流前先归一化。
 * 逐段累加：
 *   for await (const chunk of stream) { result += chunk.response ?? ''; }
 */
export interface PersonalDigitalAvatarChatOneOutput {
  /** [object Object] */
  response?: string;
  /** [object Object] */
  content: string;
}
// ---- end:personal_digital_avatar_chat_1 ----