export function Loading() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

export function LoadingWithText({ text = 'Cargando...' }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loading />
      <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>
    </div>
  );
}