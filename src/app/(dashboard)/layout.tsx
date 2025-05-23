import Navigation from '@/components/Navigation';
import SideMenu from '@/components/SideMenu';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-full">
      <div className="hidden lg:w-1/5 lg:block">
        <SideMenu />
      </div>
      <main className="bg-stone-200 w-full lg:w-4/5">
        <div className="h-full flex flex-col">
          <Navigation />
          {children}
        </div>
      </main>
    </div>
  );
}
