import {
  ArrowBendDownLeftIcon,
  ArrowDownIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BellIcon,
  PersonIcon,
  GearIcon,
  MagnifyingGlassIcon,
  PaintBrushIcon,
  UserCircleIcon,
} from '@phosphor-icons/react';
import {
  createFileRoute,
  Link,
  Outlet,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import { Dialog as DialogPrimitive } from 'radix-ui';
import * as React from 'react';
import { cn } from '@/helpers/utils';
import { Kbd } from '@/routes/~shared/components/ui/kbd';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from '@/routes/~shared/components/ui/sidebar';
import { TooltipProvider } from '@/routes/~shared/components/ui/tooltip';

export const Route = createFileRoute('/settings')({
  component: RouteComponent,
});

const settingsNavigationItems = [
  {
    label: 'Appearance',
    to: '/settings/appearance' as const,
    icon: PaintBrushIcon,
  },
  {
    label: 'Account',
    to: '/settings/account' as const,
    icon: GearIcon,
  },
  {
    label: 'Profile',
    to: '/settings/profile' as const,
    icon: UserCircleIcon,
  },
  {
    label: 'Notifications',
    to: '/settings/notifications' as const,
    icon: BellIcon,
  },
  {
    label: 'Accessibility',
    to: '/settings/accessibility' as const,
    icon: PersonIcon,
  },
];

const quickSearchItems = [
  {
    label: 'Appearance',
    section: 'Settings',
    to: '/settings/appearance' as const,
  },
  {
    label: 'Account',
    section: 'Settings',
    to: '/settings/account' as const,
  },
  {
    label: 'Profile',
    section: 'Settings',
    to: '/settings/profile' as const,
  },
  {
    label: 'Notifications',
    section: 'Settings',
    to: '/settings/notifications' as const,
  },
  {
    label: 'Accessibility',
    section: 'Settings',
    to: '/settings/accessibility' as const,
  },
];

const breadcrumbSegmentLabels: Record<string, string> = {
  settings: 'Settings',
  appearance: 'Appearance',
  account: 'Account',
  profile: 'Profile',
  notifications: 'Notifications',
  accessibility: 'Accessibility',
};

function RouteComponent() {
  const location = useLocation();
  const navigate = useNavigate();
  const quickSearchInputRef = React.useRef<HTMLInputElement>(null);
  const [isQuickSearchOpen, setIsQuickSearchOpen] = React.useState(false);
  const [isMacOs, setIsMacOs] = React.useState(false);
  const [quickSearchQuery, setQuickSearchQuery] = React.useState('');
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  React.useEffect(() => {
    const platform = (
      navigator as Navigator & {
        userAgentData?: {
          platform?: string;
        };
      }
    ).userAgentData?.platform;

    const userPlatform = platform ?? navigator.platform ?? navigator.userAgent;

    setIsMacOs(/Mac|iPhone|iPad|iPod/i.test(userPlatform));
  }, []);

  React.useEffect(() => {
    const handleQuickSearchShortcut = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setIsQuickSearchOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleQuickSearchShortcut);

    return () => {
      window.removeEventListener('keydown', handleQuickSearchShortcut);
    };
  }, []);

  const filteredQuickSearchItems = React.useMemo(() => {
    const normalizedQuery = quickSearchQuery.trim().toLowerCase();

    if (normalizedQuery.length === 0) {
      return quickSearchItems;
    }

    return quickSearchItems.filter((item) =>
      `${item.label} ${item.section} ${item.to}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [quickSearchQuery]);

  const handleQuickSearchOpenChange = (open: boolean) => {
    setIsQuickSearchOpen(open);

    if (!open) {
      setQuickSearchQuery('');
      setSelectedIndex(0);
    }
  };

  const handleQuickSearchKeyDown = (
    event: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (filteredQuickSearchItems.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredQuickSearchItems.length - 1 ? prev + 1 : 0,
      );
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredQuickSearchItems.length - 1,
      );
    } else if (event.key === 'Enter') {
      event.preventDefault();
      const selectedItem = filteredQuickSearchItems[selectedIndex];
      if (selectedItem) {
        setIsQuickSearchOpen(false);
        navigate({ to: selectedItem.to });
      }
    }
  };

  const breadcrumbItems = React.useMemo(() => {
    const segments = location.pathname.split('/').filter(Boolean);

    return segments.map((segment, index) => {
      const label = breadcrumbSegmentLabels[segment];

      return {
        id: segments.slice(0, index + 1).join('/'),
        label: label ?? segment.charAt(0).toUpperCase() + segment.slice(1),
      };
    });
  }, [location.pathname]);

  const getIconForLabel = (label: string) => {
    switch (label) {
      case 'Appearance':
        return <PaintBrushIcon className="size-4" />;
      case 'Account':
        return <GearIcon className="size-4" />;
      case 'Profile':
        return <UserCircleIcon className="size-4" />;
      case 'Notifications':
        return <BellIcon className="size-4" />;
      case 'Accessibility':
        return <PersonIcon className="size-4" />;
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  size="sm"
                  tooltip="Back to dashboard"
                  onClick={() => navigate({ to: '/' })}
                  className="h-9 border border-input shadow-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all px-2.5"
                >
                  <ArrowLeftIcon />
                  <span className="group-data-[collapsible=icon]:hidden">
                    Back
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup className="pb-1">
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      type="button"
                      tooltip="Quick search"
                      onClick={() => setIsQuickSearchOpen(true)}
                      className="h-9 border border-input shadow-xs text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all px-2.5"
                    >
                      <MagnifyingGlassIcon />
                      <span className="group-data-[collapsible=icon]:hidden">
                        Quick search...
                      </span>
                      <div className="ml-auto flex items-center gap-1 group-data-[collapsible=icon]:hidden">
                        <Kbd className="flex h-5 select-none items-center justify-center rounded-[4px] border border-sidebar-border bg-sidebar-accent/60 px-1.5 font-mono text-[10px] font-medium text-sidebar-foreground/70 shadow-[0_2px_0_rgba(0,0,0,0.04)] sm:flex tracking-wide">
                          {isMacOs ? '⌘' : 'Ctrl'}
                        </Kbd>
                        <span className="text-sidebar-foreground/60 text-[9px]">
                          +
                        </span>
                        <Kbd className="flex h-5 select-none items-center justify-center rounded-[4px] border border-sidebar-border bg-sidebar-accent/60 px-1.5 font-mono text-[10px] font-medium text-sidebar-foreground/70 shadow-[0_2px_0_rgba(0,0,0,0.04)] sm:flex tracking-wide">
                          K
                        </Kbd>
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Settings</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {settingsNavigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.to;

                    return (
                      <SidebarMenuItem key={item.label}>
                        <SidebarMenuButton
                          asChild
                          tooltip={item.label}
                          isActive={isActive}
                        >
                          <Link to={item.to}>
                            <Icon />
                            <span className="group-data-[collapsible=icon]:hidden">
                              {item.label}
                            </span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter />
          <SidebarRail />
        </Sidebar>

        <DialogPrimitive.Root
          open={isQuickSearchOpen}
          onOpenChange={handleQuickSearchOpenChange}
        >
          <DialogPrimitive.Portal>
            <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/10 duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0" />
            <DialogPrimitive.Content
              onOpenAutoFocus={(event) => {
                event.preventDefault();
                quickSearchInputRef.current?.focus();
              }}
              className="fixed top-[15%] left-1/2 z-50 w-[min(48rem,calc(100vw-2rem))] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background shadow-2xl duration-200 data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-top-10 data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-top-10"
            >
              <DialogPrimitive.Title className="sr-only">
                Quick search
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="sr-only">
                Search and jump between settings pages.
              </DialogPrimitive.Description>

              <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
                <MagnifyingGlassIcon className="size-5 shrink-0 text-foreground" />
                <input
                  ref={quickSearchInputRef}
                  type="text"
                  value={quickSearchQuery}
                  onChange={(event) => {
                    setQuickSearchQuery(event.target.value);
                    setSelectedIndex(0);
                  }}
                  onKeyDown={handleQuickSearchKeyDown}
                  placeholder="Search settings..."
                  className="h-6 w-full border-0 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground text-foreground"
                />
                <Kbd className="hidden h-6 select-none items-center justify-center rounded-md border border-border bg-muted px-2 font-mono text-[12px] text-muted-foreground shadow-none sm:flex">
                  Esc
                </Kbd>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-2">
                {filteredQuickSearchItems.length === 0 ? (
                  <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                    No results for &quot;{quickSearchQuery}&quot;
                  </div>
                ) : (
                  <div className="py-1">
                    {Object.entries(
                      filteredQuickSearchItems.reduce(
                        (acc, item) => {
                          if (!acc[item.section]) acc[item.section] = [];
                          acc[item.section].push(item);
                          return acc;
                        },
                        {} as Record<string, typeof quickSearchItems>,
                      ),
                    ).map(([section, items]) => (
                      <div key={section} className="mb-2 last:mb-0">
                        <div className="px-2 pb-1.5 pt-2 text-[13px] font-medium text-muted-foreground">
                          {section} tips
                        </div>
                        <ul className="flex flex-col gap-0.5">
                          {items.map((item) => {
                            const itemIndex =
                              filteredQuickSearchItems.findIndex(
                                (x) => x.to === item.to,
                              );
                            const isSelected = itemIndex === selectedIndex;
                            return (
                              <li key={item.to}>
                                <DialogPrimitive.Close asChild>
                                  <Link
                                    to={item.to}
                                    className={cn(
                                      'group flex w-full items-center justify-between rounded-lg px-3 py-2.5 outline-none transition-colors',
                                      isSelected
                                        ? 'bg-muted'
                                        : 'hover:bg-muted focus:bg-muted',
                                    )}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className="size-5 shrink-0 text-muted-foreground flex items-center justify-center">
                                        {getIconForLabel(item.label)}
                                      </div>
                                      <div className="flex w-full items-baseline gap-2 truncate">
                                        <span className="text-[14px] font-medium text-foreground">
                                          {item.label.toLowerCase()}:
                                        </span>
                                        <span className="text-muted-foreground/50 select-none">
                                          —
                                        </span>
                                        <span className="text-[14px] text-muted-foreground truncate">
                                          Search {item.label} settings
                                        </span>
                                      </div>
                                    </div>
                                    <ArrowRightIcon
                                      className={cn(
                                        'size-4 shrink-0 text-muted-foreground transition-opacity',
                                        isSelected
                                          ? 'opacity-100'
                                          : 'opacity-0 group-hover:opacity-100 group-focus:opacity-100',
                                      )}
                                    />
                                  </Link>
                                </DialogPrimitive.Close>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4 rounded-b-xl border-t border-border bg-muted/40 px-4 py-3 text-[12px] text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <span className="flex size-5 items-center justify-center rounded border border-border/50 text-muted-foreground bg-background">
                      <ArrowUpIcon className="size-3.5" />
                    </span>
                    <span className="flex size-5 items-center justify-center rounded border border-border/50 text-muted-foreground bg-background">
                      <ArrowDownIcon className="size-3.5" />
                    </span>
                  </div>
                  <span>to navigate</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-5 px-1.5 items-center justify-center rounded border border-border/50 text-muted-foreground bg-background">
                    <ArrowBendDownLeftIcon className="size-3.5" />
                  </span>
                  <span>to select</span>
                </div>
              </div>
            </DialogPrimitive.Content>
          </DialogPrimitive.Portal>
        </DialogPrimitive.Root>

        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b px-4">
            <SidebarTrigger className="shrink-0" />
            <nav aria-label="Breadcrumb" className="flex items-center">
              <ol className="m-0! flex list-none items-center gap-1.5 p-0 text-sm">
                <li className="flex items-center">
                  <Link
                    to="/"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Overview
                  </Link>
                </li>
                {breadcrumbItems.map((item, index) => {
                  const isLast = index === breadcrumbItems.length - 1;

                  return (
                    <React.Fragment key={item.id}>
                      <li
                        className="text-muted-foreground/60"
                        aria-hidden="true"
                      >
                        /
                      </li>
                      <li
                        className={
                          isLast
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground'
                        }
                      >
                        {item.label}
                      </li>
                    </React.Fragment>
                  );
                })}
              </ol>
            </nav>
          </header>
          <div className="flex-1">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
