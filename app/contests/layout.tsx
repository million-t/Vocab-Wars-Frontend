

export default function ArenaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <div className="flex flex-col w-full ">
      
      <div className="">{children}</div>
    </div>
  );
}
