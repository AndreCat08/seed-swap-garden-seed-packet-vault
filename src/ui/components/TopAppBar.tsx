interface TopAppBarProps {
  onAdd: () => void
}

export function TopAppBar({ onAdd }: TopAppBarProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-container-padding py-4 bg-surface/80 backdrop-blur-md shadow-sm text-primary">
      <span className="font-headline text-2xl md:text-3xl font-bold text-on-surface">Seed Vault</span>
      <button
        onClick={onAdd}
        aria-label="Add seed"
        className="hover:bg-surface-container-high transition-colors p-2 rounded-full active:scale-95 duration-150 ease-in-out"
      >
        <span className="material-symbols-outlined">add_circle</span>
      </button>
    </header>
  )
}
