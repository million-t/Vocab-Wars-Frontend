export default function ArenaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex w-full justify-center">{children}</div>;
}
