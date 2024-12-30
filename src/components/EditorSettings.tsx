import type { ColorTheme, ThemeConfig, ThemeFont, ThemeIcon } from '../types'; // 导入类型定义
import { TabPanel } from '@headlessui/react'; // 导入TabPanel组件
import { useTranslation } from 'react-i18next'; // 导入国际化钩子
import Select from 'react-select'; // 导入选择组件
import fixitIcon from '../assets/icons/fixit.svg'; // 导入FixIt图标
import defaultIcon from '../assets/icons/default-icon.png'; // 导入默认图标
import { fontOptions, patternOptions, platformOptions } from '../common'; // 导入常用选项
import { useDevIcon } from '../hooks/useDevIcon'; // 导入自定义钩子以获取开发图标
import RandomTheme from './RandomTheme'; // 导入随机主题组件

// 定义EditorSettingsProps接口，描述组件的属性
export interface EditorSettingsProps {
  settings: ThemeConfig; // 当前主题配置
  updateSettings: (updater: Partial<ThemeConfig>) => void; // 更新设置的函数
  handleReset: () => void; // 重置设置的函数
}

// 定义EditorSettings组件
function EditorSettings({ settings, updateSettings, handleReset }: EditorSettingsProps) {
  const { t } = useTranslation(); // 使用翻译钩子
  const devIconOptions = useDevIcon(); // 获取开发图标选项

  // 设置默认图标 URL
  const defaultCustomIconUrl = defaultIcon; // 使用项目中的指定PNG作为默认图标

  // 初始化设置
  const initialSettings = {
    title: '',
    author: '',
    icon: {
      label: '理型健',
      value: 'custom',
      opts: [],
    },
    customIcon: defaultCustomIconUrl, // 默认自定义图标
    // 其他设置...
  };

  // 处理平台选择的变化
  const handleSelectPlatform = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateSettings({ platform: e.target.value }); // 更新平台设置
    if (e.target.value === 'hugo-fixit') {
      updateSettings({ icon: { label: 'Hugo FixIt', value: 'hugo-fixit', opts: [] } }); // 特殊处理Hugo FixIt平台
    }
  };

  // 获取随机主题并更新设置
  const getRandomTheme = (theme: ColorTheme, pattern: string) =>
    updateSettings({ pattern, bgColor: theme.bgColor, borderColor: theme.bdColor });

  return (
    <TabPanel>
      {/* 标题设置 */}
      <div className="m-2 flex flex-col">
        <span className="font-medium pb-1">{t('editor.title')}</span>
        <textarea
          className="focus:outline-none border text-gray-700 text-xl rounded p-2 h-24"
          placeholder={t('editor.title')}
          value={settings.title}
          onChange={e => updateSettings({ title: e.target.value })} // 更新标题
        />
      </div>

      {/* 作者设置 */}
      <div className="flex flex-col m-2">
        <span className="font-medium pb-1">{t('editor.author')}</span>
        <input
          className="focus:outline-none border text-gray-700 text-xl rounded bg-white p-2"
          placeholder={t('editor.author')}
          type="text"
          value={settings.author}
          onChange={e => updateSettings({ author: e.target.value })} // 更新作者
        />
      </div>

      {/* 图标选择 */}
      <div className="flex flex-col m-2">
        <span className="font-medium pb-1">{t('editor.icon')}</span>
        <Select
          className="outline-none focus:outline-none text-xl text-gray-700"
          formatOptionLabel={formatOptionLabel} // 自定义选项标签格式
          options={devIconOptions} // 图标选项
          value={settings.icon} // 当前选择的图标
          onChange={selected => updateSettings({
            icon: selected!, // 更新图标
            iconStyle: selected!.opts[0], // 更新图标样式
            iconStyleOptions: selected!.opts, // 更新图标样式选项
            customIcon: '', // 清空自定义图标
          })}
        />
      </div>

      {/* 自定义图标上传 */}
      <div className={`flex items-center justify-center ${settings.icon.value === 'custom' ? '' : 'hidden'}`}>
        <input
          className="focus:outline-none text-lg cursor-pointer bg-white rounded border m-2"
          type="file"
          accept="image/png, image/jpeg" // 只接受PNG和JPEG格式
          onChange={e => {
            if (e.target.files?.[0]) {
              const fileUrl = URL.createObjectURL(e.target.files[0]);
              updateSettings({
                customIcon: fileUrl, // 生成自定义图标的URL
                icon: {
                  label: 'Custom Icon',
                  value: '../assets/icons/default-icon.png',
                  opts: [],
                },
              });
            }
          }}
        />
      </div>

      {/* 字体和平台设置 */}
      <div className="flex items-center">
        <div className="flex flex-col m-2 w-1/2">
          <span className="font-medium pb-1">{t('editor.font')}</span>
          <select
            className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
            value={settings.font}
            onChange={e => updateSettings({ font: e.target.value as ThemeFont })} // 更新字体
          >
            {
              fontOptions.map(font => (
                <option key={font} value={font}>{t(`editor.fonts.${font}`)}</option>
              ))
            }
          </select>
        </div>
        <div className="flex flex-col m-2 w-full">
          <span className="font-medium pb-1">{t('editor.platform')}</span>
          <select
            className="focus:outline-none text-gray-700 text-xl p-2 rounded border"
            value={settings.platform}
            onChange={handleSelectPlatform} // 处理平台选择变化
          >
            <option value="custom">{t('editor.custom')}</option>
            {
              platformOptions.map(platform => (
                <option key={platform.value} value={platform.value}>{platform.label}</option>
              ))
            }
          </select>
        </div>
      </div>

      {/* 自定义平台设置 */}
      <div className={`flex items-center justify-center ${settings.platform === 'custom' ? '' : 'hidden'}`}>
        <input
          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
          min={500}
          placeholder="width"
          type="number"
          value={settings.customPlatformWidth}
          onChange={e => updateSettings({ customPlatformWidth: Number(e.target.value) })} // 更新自定义平台宽度
        />
        <input
          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
          min={1}
          placeholder="x"
          type="number"
          value={settings.customPlatformX}
          onChange={e => updateSettings({ customPlatformX: Number(e.target.value) })} // 更新自定义平台X坐标
        />
        :
        <input
          className="w-1/3 focus:outline-none border text-gray-700 text-xl rounded p-2 m-2"
          min={1}
          placeholder="y"
          type="number"
          value={settings.customPlatformY}
          onChange={e => updateSettings({ customPlatformY: Number(e.target.value) })} // 更新自定义平台Y坐标
        />
      </div>

      {/* 颜色和图案设置 */}
      <div className={`flex items-center ${settings.theme === 'background' ? 'hidden' : ''}`}>
        <div className="flex flex-col m-2 w-1/2">
          <span className="font-medium pb-1">{t('editor.color')}</span>
          <div className="border rounded flex items-center p-2">
            <span className="text-xl text-gray-700 mx-2">{settings.bgColor}</span>
            <input
              className="h-8 w-8 ml-auto mr-1 rounded"
              type="color"
              value={settings.bgColor}
              onChange={e => updateSettings({ bgColor: e.target.value })} // 更新背景颜色
            />
          </div>
        </div>
        <div className="flex flex-col m-2 w-1/2">
          <span className="font-medium pb-1">{t('editor.pattern')}</span>
          <select
            className="focus:outline-none border text-xl p-2 rounded"
            value={settings.pattern}
            onChange={e => updateSettings({ pattern: e.target.value })} // 更新图案
          >
            {patternOptions.map(item => (<option key={item}>{item}</option>))}
          </select>
        </div>
      </div>

      {/* 随机主题和重置按钮 */}
      <div className="flex items-center justify-center gap-2 md:gap-4 m-2">
        <RandomTheme
          className={settings.theme === 'background' ? 'hidden' : ''}
          onThemeChange={getRandomTheme} // 随机主题变化处理
        />
        <button
          type="button"
          className="bg-gray-700 text-white rounded-lg text-lg font-semibold py-1 px-4 border"
          onClick={handleReset} // 重置设置的处理
        >
          <span>{t('editor.resetBtn')}</span>
        </button>
      </div>
    </TabPanel>
  );
}

// 自定义图标选项标签格式化函数
function formatOptionLabel({ value, label, opts }: ThemeIcon) {
  return (
    <div className="flex items-center">
      <span className="mr-2">{label}</span>
      <div className="ml-auto mr-2">
        {value === 'custom' ? (
          <img
            alt={`${label} Icon`}
            className="w-6 h-6"
            src={defaultIcon} // 使用默认图标
          />
        ) : (
          value !== 'custom' && (
            <img
              alt={`${label} Icon`}
              className="w-6 h-6"
              src={value === 'hugo-fixit'
                ? fixitIcon // 特殊处理Hugo FixIt图标
                : `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${value}/${value}-${opts[0]}.svg`} // 默认图标链接
            />
          )
        )}
      </div>
    </div>
  );
}

// 导出EditorSettings组件
export default EditorSettings;
