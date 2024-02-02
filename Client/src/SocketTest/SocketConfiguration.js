import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

//window.Pusher = Pusher;

// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: 'd43f0f1892e906321311',
//   cluster: 'eu',
// });

window.Echo = new Echo({
    broadcaster: 'pusher',
    key: 'd43f0f1892e906321311',
    cluster: 'eu',
    wsHost: 'ws-eu.pusher.com',
    wsPort: 80,
    wssPort: 443,
    forceTLS: 'https',
    enabledTransports: ['ws', 'wss'],
});