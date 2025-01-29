'use client';
import { ChartBarStackedIcon, PlusIcon } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { ThemeToggle } from './ui/theme-toggle';
import { useAddPropertyModal } from '@/store/modal-store';
import { cn } from '@/lib/utils';

export function AppSidebar({
  footer,
}: Readonly<{
  footer?: React.ReactNode;
}>) {
  const addPropertyStore = useAddPropertyModal();

  const menu: SideBarMenuList = {
    '1': [
      {
        name: 'Add Property',
        icon: <PlusIcon className="h-5 w-5" />,
        onClick: () => addPropertyStore.onOpen(),
      },
    ],
  };

  return (
    <Sidebar className="border-r-2 border-border">
      <SidebarContent>
        <SidebarHeader className="flex items-center gap-2 flex-row p-4 bg-primary border-b-2 border-primary">
          <div className="flex items-center justify-center w-8 h-8 bg-background rounded-none border-2 border-border shadow-pixel">
            <ChartBarStackedIcon className="h-5 w-5 text-primary" />
          </div>
          <span className="text-lg font-pixel text-primary-foreground">
            Trackion Studio
          </span>
        </SidebarHeader>
        {Object.keys(menu).map((key) => (
          <SidebarGroup key={key}>
            <SidebarGroupContent className="p-2">
              {menu[key].map(({ name, icon, onClick }, idx) => (
                <SidebarMenuItem
                  key={idx}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 text-sm font-pixel',
                    'border-2 border-border bg-background shadow-pixel',
                    'hover:translate-y-[2px] hover:shadow-pixel-sm',
                    'active:translate-y-[4px] active:shadow-none',
                    'transition-all duration-150 cursor-pointer',
                    'text-foreground',
                  )}
                  onClick={onClick}
                >
                  {icon}
                  {name}
                </SidebarMenuItem>
              ))}
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="flex border-t-2 border-border justify-between items-center p-4 bg-muted">
            {footer}
            <ThemeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
