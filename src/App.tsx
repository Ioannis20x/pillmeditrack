import { useEffect, useRef, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate, useNavigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { Capacitor } from "@capacitor/core";
import { App as CapApp } from "@capacitor/app";
import { Browser } from "@capacitor/browser";
import { supabase } from "@/integrations/supabase/client";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import { PushNotifications } from "@capacitor/push-notifications";
import { toast } from "@/hooks/use-toast";
import Index from "./pages/Index.tsx";
import Auth from "./pages/Auth.tsx";
import History from "./pages/History.tsx";
import Statistics from "./pages/Statistics.tsx";
import NotFound from "./pages/NotFound.tsx";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="size-8 animate-spin text-primary" />
      </div>
    );
  }
  
  if (!user) return <Navigate to="/auth" replace />;
  return <>{children}</>;
}

function AuthRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

// Requests push permission and registers FCM token on first authenticated app start
function NotificationAutoSubscribe() {
  const { user } = useAuth();
  const { subscribe } = usePushNotifications();
  const attempted = useRef(false);

  useEffect(() => {
    if (!Capacitor.isNativePlatform() || !user || attempted.current) return;
    attempted.current = true;
    subscribe();
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps

  return null;
}

// Shows push notifications as in-app banner while the app is in the foreground
function ForegroundNotificationHandler() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const listener = PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: { title?: string; body?: string }) => {
        toast({
          title: notification.title ?? 'MediTrack',
          description: notification.body,
          duration: 6000,
        });
      }
    );
    return () => { listener.then(l => l.remove()); };
  }, []);
  return null;
}

// Handles Android hardware back button: navigate home first, exit on double-press
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();
  const locationRef = useRef(location.pathname);
  const backPressedOnce = useRef(false);
  const [showExitHint, setShowExitHint] = useState(false);

  useEffect(() => {
    locationRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const listener = CapApp.addListener('backButton', () => {
      if (locationRef.current !== '/') {
        navigate('/');
        return;
      }
      if (backPressedOnce.current) {
        CapApp.exitApp();
        return;
      }
      backPressedOnce.current = true;
      setShowExitHint(true);
      setTimeout(() => {
        backPressedOnce.current = false;
        setShowExitHint(false);
      }, 2000);
    });
    return () => { listener.then(l => l.remove()); };
  }, [navigate]);

  if (!showExitHint) return null;
  return (
    <div className="fixed inset-x-0 flex justify-center z-50 pointer-events-none" style={{ bottom: '12%' }}>
      <div className="bg-gray-900/90 text-white text-sm px-5 py-2.5 rounded-full shadow-lg">
        Nochmal zurück um die App zu beenden
      </div>
    </div>
  );
}

function DeepLinkHandler() {
  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const listener = CapApp.addListener('appUrlOpen', async ({ url }) => {
      if (!url.startsWith('com.ioannisdev.meditrack://')) return;
      try {
        const parsed = new URL(url);

        // PKCE flow: code in query params
        const code = parsed.searchParams.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
          await Browser.close();
          return;
        }

        // Implicit flow: tokens in hash fragment
        const hash = parsed.hash.substring(1);
        if (hash) {
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');
          if (accessToken) {
            await supabase.auth.setSession({
              access_token: accessToken,
              refresh_token: refreshToken ?? '',
            });
            await Browser.close();
          }
        }
      } catch (e) {
        console.error('Deep link auth error:', e);
      }
    });
    return () => { listener.then(l => l.remove()); };
  }, []);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <DeepLinkHandler />
        <NotificationAutoSubscribe />
        <ForegroundNotificationHandler />
        <BrowserRouter>
          <BackButtonHandler />
          <Routes>
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
            <Route path="/statistics" element={<ProtectedRoute><Statistics /></ProtectedRoute>} />
            <Route path="/auth" element={<AuthRoute><Auth /></AuthRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
