export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <div className="hidden bg-red-300 lg:w-1/5 lg:block">SideMenu</div>
      <main className="bg-blue-300 w-full lg:w-4/5">{children}</main>
    </div>
  );
}
