export const countries = [
  { code: 'CN', name: '中国', dialCode: '+86', flag: '🇨🇳', format: '### #### ####' },
  { code: 'US', name: '美国', dialCode: '+1', flag: '🇺🇸', format: '(###) ###-####' },
  { code: 'GB', name: '英国', dialCode: '+44', flag: '🇬🇧', format: '#### ######' },
  { code: 'JP', name: '日本', dialCode: '+81', flag: '🇯🇵', format: '##-####-####' },
  { code: 'KR', name: '韩国', dialCode: '+82', flag: '🇰🇷', format: '##-####-####' },
  { code: 'DE', name: '德国', dialCode: '+49', flag: '🇩🇪', format: '#### #######' },
  { code: 'FR', name: '法国', dialCode: '+33', flag: '🇫🇷', format: '# ## ## ## ##' },
  { code: 'IT', name: '意大利', dialCode: '+39', flag: '🇮🇹', format: '### ### ####' },
  { code: 'ES', name: '西班牙', dialCode: '+34', flag: '🇪🇸', format: '### ### ###' },
  { code: 'AU', name: '澳大利亚', dialCode: '+61', flag: '🇦🇺', format: '#### ### ###' },
  { code: 'CA', name: '加拿大', dialCode: '+1', flag: '🇨🇦', format: '(###) ###-####' },
  { code: 'BR', name: '巴西', dialCode: '+55', flag: '🇧🇷', format: '## #####-####' },
  { code: 'MX', name: '墨西哥', dialCode: '+52', flag: '🇲🇽', format: '### ### ####' },
  { code: 'IN', name: '印度', dialCode: '+91', flag: '🇮🇳', format: '##### #####' },
  { code: 'RU', name: '俄罗斯', dialCode: '+7', flag: '🇷🇺', format: '### ###-##-##' },
  { code: 'HK', name: '香港', dialCode: '+852', flag: '🇭🇰', format: '#### ####' },
  { code: 'TW', name: '台湾', dialCode: '+886', flag: '🇹🇼', format: '### ### ###' },
  { code: 'SG', name: '新加坡', dialCode: '+65', flag: '🇸🇬', format: '#### ####' },
  { code: 'MY', name: '马来西亚', dialCode: '+60', flag: '🇲🇾', format: '###-### ####' },
]

export const getCountryByCode = (code) => {
  return countries.find(c => c.code === code) || countries[0]
}

export const getCountryByDialCode = (dialCode) => {
  return countries.find(c => c.dialCode === dialCode) || countries[0]
}
