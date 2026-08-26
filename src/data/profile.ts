// EXPORTS: IProfile, MOCK_PROFILE
export interface IWork {
  title: string
  description: string
  tags: string[]
  link?: string
}

export interface IContact {
  type: 'email' | 'wechat' | 'phone' | 'github' | 'other'
  label: string
  value: string
  link?: string
}

export interface IProfile {
  id: string
  name: string
  tagline: string
  avatarUrl: string
  interests: string[]
  currentStatus: string
  feature: string
  recommendedQuestions: string[]
  works: IWork[]
  contacts: IContact[]
}

export const MOCK_PROFILE: IProfile = {
  id: '1',
  name: '夏刘军',
  tagline: '中年大叔，待业在家。肉体慵懒，思想不辍。跟上时代，AI学习。',
  avatarUrl: '/avatar.jpg',
  interests: ['投资', '科技'],
  currentStatus: '赋闲在家，闲来无事',
  feature: '待补充',
  recommendedQuestions: [
    '你最近在干什么？',
    '还上班吗？',
    'AI可以用来干什么？'
  ],
  works: [
    {
      title: '作品一（待补充）',
      description: '这里简单描述一下这个作品做了什么、用了什么技术、有什么成果。',
      tags: ['标签1', '标签2'],
    },
    {
      title: '作品二（待补充）',
      description: '这里简单描述一下这个作品做了什么、用了什么技术、有什么成果。',
      tags: ['标签1', '标签2'],
    },
  ],
  contacts: [
    {
      type: 'email',
      label: '邮箱',
      value: 'your@email.com',
      link: 'mailto:your@email.com',
    },
    {
      type: 'wechat',
      label: '微信',
      value: 'your-wechat-id',
    },
  ],
}