self.addEventListener('push', function(event) {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'MediTrack Erinnerung';
  const options = {
    body: data.body || 'Zeit für deine Medikamente!',
    icon: data.icon || '/pill-icon.png',
    badge: '/pill-icon.png',
    vibrate: [200, 100, 200],
    tag: data.tag || 'medication-reminder',
    data: {
      url: self.location.origin,
    },
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  const url = event.notification.data?.url || '/';
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function(clientList) {
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          return client.focus();
        }
      }
      return clients.openWindow(url);
    })
  );
});
