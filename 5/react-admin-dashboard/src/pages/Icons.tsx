import React from 'react'

const iconCategories = {
  'Action': ['pi pi-check', 'pi pi-times', 'pi pi-plus', 'pi pi-minus', 'pi pi-search', 'pi pi-refresh', 'pi pi-sync', 'pi pi-cog', 'pi pi-cog', 'pi pi-wrench'],
  'Navigation': ['pi pi-home', 'pi pi-arrow-left', 'pi pi-arrow-right', 'pi pi-arrow-up', 'pi pi-arrow-down', 'pi pi-chevron-left', 'pi pi-chevron-right', 'pi pi-chevron-up', 'pi pi-chevron-down', 'pi pi-angle-double-left'],
  'User': ['pi pi-user', 'pi pi-users', 'pi pi-user-plus', 'pi pi-user-minus', 'pi pi-user-edit', 'pi pi-id-card', 'pi pi-lock', 'pi pi-lock-open', 'pi pi-key', 'pi pi-shield'],
  'Business': ['pi pi-briefcase', 'pi pi-building', 'pi pi-building-columns', 'pi pi-calendar', 'pi pi-calendar-plus', 'pi pi-calendar-minus', 'pi pi-calendar-times', 'pi pi-envelope', 'pi pi-phone', 'pi pi-mobile'],
  'Social': ['pi pi-twitter', 'pi pi-facebook', 'pi pi-instagram', 'pi pi-linkedin', 'pi pi-github', 'pi pi-youtube', 'pi pi-discord', 'pi pi-slack', 'pi pi-whatsapp', 'pi pi-telegram'],
  'File': ['pi pi-file', 'pi pi-file-o', 'pi pi-file-pdf', 'pi pi-file-word', 'pi pi-file-excel', 'pi pi-file-image', 'pi pi-folder', 'pi pi-folder-open', 'pi pi-download', 'pi pi-upload'],
}

const Icons: React.FC = () => {
  const [copiedIcon, setCopiedIcon] = React.useState<string | null>(null)

  const copyToClipboard = (icon: string) => {
    navigator.clipboard.writeText(icon)
    setCopiedIcon(icon)
    setTimeout(() => setCopiedIcon(null), 2000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Icons</h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">Click an icon to copy its class name</p>
      </div>

      <div className="space-y-8">
        {Object.entries(iconCategories).map(([category, icons]) => (
          <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">{category}</h2>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {icons.map((icon, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-all group"
                  onClick={() => copyToClipboard(icon)}
                >
                  <i className={`${icon} text-2xl text-gray-700 dark:text-gray-300 group-hover:text-blue-500 transition-colors`} />
                  <span className="text-xs text-gray-500 dark:text-gray-400 text-center break-all">
                    {copiedIcon === icon ? 'Copied!' : icon.split(' ')[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Icons
