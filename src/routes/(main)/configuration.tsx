import { createFileRoute } from '@tanstack/react-router';
import * as React from 'react';
import { type Theme, useTheme } from '@/routes/~shared/hooks/common/use-theme';
import { Input } from '@/routes/~shared/components/ui/input';
import { Button } from '@/routes/~shared/components/ui/button';
import {
  Bell,
  CreditCard,
  Desktop,
  Moon,
  Palette,
  ShieldCheck,
  Sun,
  UserCircle,
  CheckCircle,
} from '@phosphor-icons/react';

export const Route = createFileRoute('/(main)/configuration')({
  component: RouteComponent,
});

enum SettingsMenuKey {
  APPEARANCE = 'appearance',
  PROFILE = 'profile',
  NOTIFICATIONS = 'notifications',
  SECURITY = 'security',
  BILLING = 'billing',
}

const menuItems = [
  { key: SettingsMenuKey.APPEARANCE, label: 'Appearance', icon: Palette },
  { key: SettingsMenuKey.PROFILE, label: 'Profile', icon: UserCircle },
  { key: SettingsMenuKey.NOTIFICATIONS, label: 'Notifications', icon: Bell },
  { key: SettingsMenuKey.SECURITY, label: 'Security', icon: ShieldCheck },
  { key: SettingsMenuKey.BILLING, label: 'Billing', icon: CreditCard },
];

function Switch({ checked, onChange }: { checked: boolean; onChange: (checked: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${checked ? 'bg-primary' : 'bg-input hover:bg-input/80'
        }`}
    >
      <span
        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-background shadow-lg ring-0 transition duration-200 ease-in-out ${checked ? 'translate-x-5' : 'translate-x-0'
          }`}
      />
    </button>
  );
}

function VercelCard({
  title,
  description,
  children,
  footer,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border/80 bg-card text-card-foreground shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] overflow-hidden mb-8 transition-all duration-200 hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.08)]">
      <div className="p-6 sm:p-8">
        <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
        {description && <p className="text-sm text-muted-foreground mt-2 max-w-2xl leading-relaxed">{description}</p>}
        <div className="mt-8">{children}</div>
      </div>
      {footer && (
        <div className="bg-muted/30 border-t border-border/40 px-6 py-4 sm:px-8 flex items-center justify-between text-sm text-muted-foreground mt-auto">
          {footer}
        </div>
      )}
    </div>
  );
}

function RouteComponent() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [activeMenu, setActiveMenu] = React.useState<SettingsMenuKey>(SettingsMenuKey.APPEARANCE);
  const [notifications, setNotifications] = React.useState({
    productUpdates: true,
    weeklyDigest: false,
    securityAlerts: true,
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = React.useState(true);
  const [sessionTimeout, setSessionTimeout] = React.useState('30 minutes');

  const handleThemeChange = (event: React.MouseEvent<Element>, nextTheme: Theme) => {
    if (theme === nextTheme) return;

    if (!document.startViewTransition) {
      setTheme(nextTheme);
      return;
    }

    const x = event.clientX;
    const y = event.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isEnteringDark =
      nextTheme === 'dark' ||
      (nextTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

    const transition = document.startViewTransition(async () => {
      setTheme(nextTheme);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        { clipPath: isEnteringDark ? [...clipPath].reverse() : clipPath },
        {
          duration: 500,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pseudoElement: isEnteringDark
            ? '::view-transition-old(root)'
            : '::view-transition-new(root)',
        }
      );
    });
  };

  const renderContent = () => {
    switch (activeMenu) {
      case SettingsMenuKey.APPEARANCE:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <VercelCard
              title="Interface Theme"
              description="Select or customize your UI theme. Your choice will be applied across your entire workspace, providing a seamless visual experience."
              footer={
                <>
                  <span>Preferences are automatically saved.</span>
                </>
              }
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl">
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Desktop },
                ].map((opt) => {
                  const isSelected = theme === opt.value;
                  const Icon = opt.icon;
                  return (
                    <button
                      key={opt.value}
                      onClick={(e) => handleThemeChange(e, opt.value as Theme)}
                      className={`group relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 ${isSelected
                          ? 'border-primary bg-primary/5 shadow-md shadow-primary/5'
                          : 'border-border/50 bg-background hover:border-primary/40 hover:bg-muted/20'
                        }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 text-primary">
                          <CheckCircle weight="fill" className="size-5 animate-in zoom-in duration-300" />
                        </div>
                      )}
                      <div className={`p-4 rounded-full mb-4 transition-colors ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground group-hover:text-foreground'}`}>
                        <Icon weight={isSelected ? "duotone" : "regular"} className="size-7" />
                      </div>
                      <span className={`font-semibold tracking-wide text-sm ${isSelected ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'}`}>
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </VercelCard>
          </div>
        );

      case SettingsMenuKey.PROFILE:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <VercelCard
              title="Public Identity"
              description="This information will be displayed publicly so be careful what you share."
              footer={
                <>
                  <span>Please use 32 characters at maximum.</span>
                  <Button size="sm" className="rounded-lg h-9 px-6 font-semibold">Save</Button>
                </>
              }
            >
              <div className="grid gap-8 max-w-xl">
                <div className="space-y-3">
                  <label htmlFor="display-name" className="text-sm font-semibold tracking-wide">Display Name</label>
                  <Input id="display-name" defaultValue="shadcn" className="h-11 rounded-xl bg-muted/20 px-4 text-base focus-visible:ring-primary/30" />
                </div>
                <div className="space-y-3">
                  <label htmlFor="email" className="text-sm font-semibold tracking-wide">Email Address</label>
                  <Input id="email" defaultValue="m@example.com" type="email" className="h-11 rounded-xl bg-muted/20 px-4 text-base focus-visible:ring-primary/30" />
                </div>
              </div>
            </VercelCard>
          </div>
        );

      case SettingsMenuKey.NOTIFICATIONS:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <VercelCard
              title="Communications"
              description="Manage how we contact you regarding your account, products, and operational changes."
            >
              <div className="space-y-6">
                {[
                  { key: 'productUpdates', title: 'Product Updates', desc: 'Updates on features and releases.' },
                  { key: 'weeklyDigest', title: 'Weekly Digest', desc: 'Summary of workspace activity and general reporting.' },
                  { key: 'securityAlerts', title: 'Security Alerts', desc: 'Critical security notifications and login attempts.' },
                ].map((item, id) => (
                  <React.Fragment key={item.key}>
                    {id > 0 && <hr className="border-border/40" />}
                    <div className="flex items-center justify-between group">
                      <div className="pr-8">
                        <p className="text-base font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{item.desc}</p>
                      </div>
                      <Switch
                        checked={notifications[item.key as keyof typeof notifications]}
                        onChange={(checked) => setNotifications(prev => ({ ...prev, [item.key]: checked }))}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </VercelCard>
          </div>
        );

      case SettingsMenuKey.SECURITY:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <VercelCard
              title="Two-Factor Authentication"
              description="Add an extra layer of security to your account by requesting a code every time you sign in."
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-foreground">Enable 2FA</p>
                  <p className="text-sm text-muted-foreground mt-1">Recommended for all administrators.</p>
                </div>
                <Switch checked={twoFactorEnabled} onChange={setTwoFactorEnabled} />
              </div>
            </VercelCard>

            <VercelCard
              title="Session Management"
              description="Manage how long your interactive sessions last before enforcing automatic re-authentication."
              footer={
                <>
                  <span />
                  <Button variant="destructive" size="sm" className="rounded-lg h-9 font-semibold">Terminate all sessions</Button>
                </>
              }
            >
              <div className="flex flex-wrap gap-3">
                {['15 minutes', '30 minutes', '60 minutes', 'Never'].map((time) => {
                  const isSelected = sessionTimeout === time;
                  return (
                    <button
                      key={time}
                      onClick={() => setSessionTimeout(time)}
                      className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm border ${isSelected
                          ? 'bg-foreground text-background border-foreground hover:bg-foreground/90'
                          : 'bg-background text-foreground border-border/60 hover:border-foreground/30 hover:bg-muted/30'
                        }`}
                    >
                      {time}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">Changes to session management will only affect future logins.</p>
            </VercelCard>
          </div>
        );

      case SettingsMenuKey.BILLING:
        return (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <VercelCard
              title="Subscription Plan"
              description="Review your active subscription, usage metrics, and current billing cycle."
              footer={
                <>
                  <span>Prices exclude applicable taxes.</span>
                  <Button variant="outline" size="sm" className="rounded-lg h-9 font-semibold">View invoices</Button>
                </>
              }
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 md:p-8 rounded-2xl border border-border/60 bg-gradient-to-br from-card to-muted/20">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-3xl font-bold tracking-tight text-foreground">Enterprise</h4>
                    <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                      Active
                    </span>
                  </div>
                  <p className="text-base text-muted-foreground max-w-sm leading-relaxed">Unlimited members, advanced integrations, SAML SSO, and priority 24/7 support.</p>
                </div>
                <div className="flex flex-col items-start md:items-end md:text-right gap-4">
                  <div>
                    <span className="text-4xl font-extrabold tracking-tighter text-foreground">$499</span>
                    <span className="text-muted-foreground font-medium ml-1">/ mo</span>
                  </div>
                  <Button className="rounded-xl px-8 w-full md:w-auto font-semibold">Change Plan</Button>
                </div>
              </div>
            </VercelCard>
          </div>
        );
    }
  };

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 md:px-8 md:py-12">
      <div className="mb-10 sm:mb-14">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">Settings</h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">Manage your account preferences, billing, and workspace configuration.</p>
      </div>

      {/* Horizontal smooth tabs navigation */}
      <nav className="flex gap-2 p-1.5 mb-10 overflow-x-auto scrollbar-none rounded-2xl bg-muted/40 border border-border/40 max-w-fit shadow-inner">
        {menuItems.map((item) => {
          const isActive = activeMenu === item.key;
          const Icon = item.icon;
          return (
            <button
              key={item.key}
              onClick={() => {
                if (document.startViewTransition) {
                  document.startViewTransition(() => setActiveMenu(item.key));
                } else {
                  setActiveMenu(item.key);
                }
              }}
              className={`relative flex items-center gap-2.5 px-5 py-2.5 text-sm font-semibold transition-all duration-300 rounded-xl whitespace-nowrap ${isActive
                  ? 'text-foreground bg-background shadow-[0_2px_8px_-2px_rgba(0,0,0,0.1)]'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
            >
              <Icon weight={isActive ? "fill" : "regular"} className="size-5" />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="w-full">
        {renderContent()}
      </main>
    </div>
  );
}
