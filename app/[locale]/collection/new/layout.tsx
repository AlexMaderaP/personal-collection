export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="flex flex-col items-start">{children}</section>;
}
