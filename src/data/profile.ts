// EXPORTS: IProfile, MOCK_PROFILE
export interface IProfile {
  id: string
  name: string
  tagline: string
  avatarUrl: string
  interests: string[]
  currentStatus: string
  feature: string
  recommendedQuestions: string[]
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
  ]
}