// 导入相关类型
import type { ColorId, Orientation } from 'unsplash-js'
import type { ThemeConfig, ThemeFont, ThemePattern, ThemeType } from '../types'

// 导入主题图片
import theme1 from '../assets/images/theme1.webp'
import theme2 from '../assets/images/theme2.webp'
import theme3 from '../assets/images/theme3.webp'
import theme4 from '../assets/images/theme4.webp'
import theme5 from '../assets/images/theme5.webp'
import theme6 from '../assets/images/theme6.webp'
import theme7 from '../assets/images/theme7.webp'

// 默认设置的主题配置
export const defaultSettings: ThemeConfig = {
  title: '一个标题大大的标题', // 主题标题
  bgColor: '#ffa500', // 背景颜色
  pattern: '', // 背景图案
  author: import.meta.env.REACT_APP_AUTHOR || '理 · 型 · 健', // 作者信息
  icon: { label: 'github', value: 'github', opts: ['original', 'original-wordmark'] }, // 图标设置
  iconStyle: 'original', // 图标样式
  iconStyleOptions: ['original', 'original-wordmark'], // 可选图标样式
  font: 'font-Anek', // 字体
  theme: 'background', // 主题类型
  customIcon: '', // 自定义图标
  platform: 'size-16:9', // 平台设置
  customPlatformWidth: 1440, // 自定义平台宽度
  customPlatformX: 0, // 自定义平台X坐标
  customPlatformY: 0, // 自定义平台Y坐标
}

// 字体选项
export const fontOptions: ThemeFont[] = [
  'font-Virgil',
  'font-MMT',
  'font-Anek',
  'font-Inter',
  'font-Poppins',
  'font-mono',
  'font-sans',
  'font-serif',
]

// 背景图案选项
export const patternOptions: ThemePattern[] = [
  'none',
  'graph-paper',
  'jigsaw',
  'hideout',
  'dots',
  'falling-triangles',
  'circuit-board',
  'temple',
  'anchors',
  'brickwall',
  'overlapping-circles',
  'wiggle',
  'tic-tac-toe',
  'leaf',
  'bubbles',
  'squares',
  'explorer',
  'jupiter',
  'sun',
]

// 平台选项
export const platformOptions: { label: string, value: string }[] = [
  { label: '16:9', value: 'size-16:9' },
  { label: '9:16', value: 'size-9:16' },
  { label: '5:4', value: 'size-5:4' },
  { label: '7:5', value: 'size-7:5' },
  { label: '4:3', value: 'size-4:3' },
  { label: '5:3', value: 'size-5:3' },
  { label: '3:2', value: 'size-3:2' },
  { label: '2:1', value: 'size-2:1' },
  { label: '1:1', value: 'size-1:1' },
  { label: 'Hashnode', value: 'hashnode' },
  { label: 'Dev.to', value: 'dev' },
  { label: 'Hugo FixIt', value: 'hugo-fixit' },
  { label: '稀土掘金', value: 'juejin' },
]

// 主题选项
export const themeOptions: { name: ThemeType, src: string }[] = [
  { name: 'background', src: theme7 },
  { name: 'basic', src: theme1 },
  { name: 'modern', src: theme2 },
  { name: 'stylish', src: theme3 },
  { name: 'outline', src: theme5 },
  { name: 'preview', src: theme4 },
  { name: 'mobile', src: theme6 },
]

// 方向选项
export const orientationOptions: (Orientation | 'all')[] = [
  'all',
  'landscape',
  'portrait',
  'squarish',
]

// 结果颜色选项
export const resultColorOptions: (ColorId | 'all')[] = [
  'all',
  'black_and_white',
  'black',
  'white',
  'yellow',
  'orange',
  'red',
  'purple',
  'magenta',
  'green',
  'teal',
  'blue',
]
