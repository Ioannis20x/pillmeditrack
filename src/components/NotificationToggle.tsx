import { usePushNotifications } from '@/hooks/usePushNotifications';
import { Bell, BellOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationToggle() {
  const { supported, isSubscribed, loading, subscribe, unsubscribe } = usePushNotifications();

  if (!supported) return null;

  return (
    <Button
      variant="ghost"
      size="icon"
      className="rounded-full text-muted-foreground hover:text-foreground"
      onClick={isSubscribed ? unsubscribe : subscribe}
      disabled={loading}
      title={isSubscribed ? 'Benachrichtigungen deaktivieren' : 'Benachrichtigungen aktivieren'}
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : isSubscribed ? (
        <Bell className="size-4 text-primary" />
      ) : (
        <BellOff className="size-4" />
      )}
    </Button>
  );
}
