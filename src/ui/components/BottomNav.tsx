export function BottomNav() {
  const items = [
    { icon: 'potted_plant', label: 'Vault', active: true },
    { icon: 'monitoring', label: 'Analytics', active: false },
    { icon: 'sync_alt', label: 'Exchange', active: false },
    { icon: 'settings', label: 'Settings', active: false },
  ]

  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-4 pt-2 bg-surface-low/90 backdrop-blur-lg shadow-nav rounded-t-lg"
      aria-label="Primary"
    >
      {items.map((item) => (
        <a
          key={item.label}
          href="#"
          aria-current={item.active ? 'page' : undefined}
          className={`flex flex-col items-center justify-center px-4 py-1.5 rounded-xl active:scale-90 duration-200 ${
            item.active
              ? 'bg-secondary-container text-on-secondary-container'
              : 'text-outline hover:text-primary transition-colors'
          }`}
        >
          <span className="material-symbols-outlined">{item.icon}</span>
          <span className="text-label-caps mt-1">{item.label}</span>
        </a>
      ))}
    </nav>
  )
}
