import { ComponentProps } from 'preact/compat';

type IconProps = ComponentProps<'svg'> & {
	icon: IconName;
	size?: keyof typeof ICON_SIZES;
};

const ICON_SIZES = {
	sm: { width: 16, height: 16 },
	md: { width: 24, height: 24 },
	lg: { width: 32, height: 32 },
	xl: { width: 48, height: 48 }
};

// then define an Icon component that references the
export function Icon({ icon, size = 'md', ...props }: IconProps) {
	const { width, height } = ICON_SIZES[size];
	return (
		<svg {...props} width={width} height={height}>
			<use href={`/pixelarticons.svg#${icon}`} />
		</svg>
	);
}

type IconName = (typeof iconsNames)[number];

const iconsNames = [
	'4g',
	'4k-box',
	'4k',
	'5g',
	'ab-testing',
	'ac',
	'add-box-multiple',
	'add-box',
	'add-col',
	'add-grid',
	'add-row',
	'alert',
	'align-center',
	'align-justify',
	'align-left',
	'align-right',
	'analytics',
	'anchor',
	'android',
	'animation',
	'archive',
	'arrow-bar-down',
	'arrow-bar-left',
	'arrow-bar-right',
	'arrow-bar-up',
	'arrow-down-box',
	'arrow-down',
	'arrow-left-box',
	'arrow-left',
	'arrow-right-box',
	'arrow-right',
	'arrow-up-box',
	'arrow-up',
	'arrows-horizontal',
	'arrows-vertical',
	'art-text',
	'article-multiple',
	'article',
	'aspect-ratio',
	'at',
	'attachment',
	'audio-device',
	'avatar',
	'backburger',
	'battery-1',
	'battery-2',
	'battery-charging',
	'battery-full',
	'battery',
	'bed',
	'bitcoin',
	'bluetooth',
	'book-open',
	'book',
	'bookmark',
	'bookmarks',
	'briefcase-account',
	'briefcase-check',
	'briefcase-delete',
	'briefcase-download',
	'briefcase-minus',
	'briefcase-plus',
	'briefcase-search-1',
	'briefcase-search',
	'briefcase-upload',
	'briefcase',
	'bug',
	'building-community',
	'building-skyscraper',
	'building',
	'buildings',
	'bulletlist',
	'bullseye-arrow',
	'bullseye',
	'bus',
	'cake',
	'calculator',
	'calendar-alert',
	'calendar-arrow-left',
	'calendar-arrow-right',
	'calendar-check',
	'calendar-export',
	'calendar-grid',
	'calendar-import',
	'calendar-minus',
	'calendar-month',
	'calendar-multiple-check',
	'calendar-multiple',
	'calendar-plus',
	'calendar-range',
	'calendar-remove',
	'calendar-search',
	'calendar-sort-ascending',
	'calendar-sort-descending',
	'calendar-text',
	'calendar-today',
	'calendar-tomorrow',
	'calendar-week-begin',
	'calendar-week',
	'calendar-weekend',
	'calendar',
	'camera-add',
	'camera-alt',
	'camera-face',
	'camera',
	'car',
	'card-id',
	'card-plus',
	'card-stack',
	'card-text',
	'card',
	'cart',
	'cast',
	'cellular-signal-0',
	'cellular-signal-1',
	'cellular-signal-2',
	'cellular-signal-3',
	'cellular-signal-off',
	'chart-add',
	'chart-bar',
	'chart-delete',
	'chart-minus',
	'chart-multiple',
	'chart',
	'chat',
	'check-double',
	'check',
	'checkbox-on',
	'checkbox',
	'checklist',
	'chess',
	'chevron-down',
	'chevron-left',
	'chevron-right',
	'chevron-up',
	'chevrons-horizontal',
	'chevrons-vertical',
	'circle',
	'clipboard',
	'clock',
	'close-box',
	'close',
	'cloud-done',
	'cloud-download',
	'cloud-moon',
	'cloud-sun',
	'cloud-upload',
	'cloud',
	'cocktail',
	'code',
	'coffee-alt',
	'coffee',
	'coin',
	'collapse',
	'colors-swatch',
	'command',
	'comment',
	'contact-delete',
	'contact-multiple',
	'contact-plus',
	'contact',
	'copy',
	'corner-down-left',
	'corner-down-right',
	'corner-left-down',
	'corner-left-up',
	'corner-right-down',
	'corner-right-up',
	'corner-up-left',
	'corner-up-right',
	'credit-card-delete',
	'credit-card-minus',
	'credit-card-multiple',
	'credit-card-plus',
	'credit-card-settings',
	'credit-card-wireless',
	'credit-card',
	'crop',
	'cut',
	'dashboard',
	'debug-check',
	'debug-off',
	'debug-pause',
	'debug-play',
	'debug-stop',
	'debug',
	'delete',
	'deskphone',
	'device-laptop',
	'device-phone',
	'device-tablet',
	'device-tv-smart',
	'device-tv',
	'device-vibrate',
	'device-watch',
	'devices',
	'dice',
	'dollar',
	'downasaur',
	'download',
	'draft',
	'drag-and-drop',
	'drop-area',
	'drop-full',
	'drop-half',
	'drop',
	'duplicate-alt',
	'duplicate',
	'edit-box',
	'edit',
	'euro',
	'expand',
	'external-link',
	'eye-closed',
	'eye',
	'file-alt',
	'file-delete',
	'file-flash',
	'file-minus',
	'file-multiple',
	'file-off',
	'file-plus',
	'file',
	'fill-half',
	'fill',
	'flag',
	'flatten',
	'flip-to-back',
	'flip-to-front',
	'float-center',
	'float-left',
	'float-right',
	'folder-minus',
	'folder-plus',
	'folder-x',
	'folder',
	'forward',
	'forwardburger',
	'frame-add',
	'frame-check',
	'frame-delete',
	'frame-minus',
	'frame',
	'gamepad',
	'gif',
	'gift',
	'git-branch',
	'git-commit',
	'git-merge',
	'git-pull-request',
	'github-2',
	'github',
	'gps',
	'grid',
	'group',
	'hd',
	'headphone',
	'headset',
	'heart',
	'hidden',
	'home',
	'hourglass',
	'hq',
	'human-handsdown',
	'human-handsup',
	'human-height-alt',
	'human-height',
	'human-run',
	'human',
	'image-arrow-right',
	'image-broken',
	'image-delete',
	'image-flash',
	'image-frame',
	'image-gallery',
	'image-multiple',
	'image-new',
	'image-plus',
	'image',
	'inbox-all',
	'inbox-full',
	'inbox',
	'info-box',
	'invert',
	'iso',
	'kanban',
	'keyboard',
	'label-alt-multiple',
	'label-alt',
	'label-sharp',
	'label',
	'layout-align-bottom',
	'layout-align-left',
	'layout-align-right',
	'layout-align-top',
	'layout-columns',
	'layout-distribute-horizontal',
	'layout-distribute-vertical',
	'layout-footer',
	'layout-header',
	'layout-rows',
	'layout-sidebar-left',
	'layout-sidebar-right',
	'layout',
	'lightbulb-2',
	'lightbulb-on',
	'lightbulb',
	'link',
	'list-box',
	'list',
	'loader',
	'lock-open',
	'lock',
	'login',
	'logout',
	'luggage',
	'mail-arrow-right',
	'mail-check',
	'mail-delete',
	'mail-flash',
	'mail-multiple',
	'mail-off',
	'mail-unread',
	'mail',
	'map',
	'mastodon',
	'membercard',
	'menu',
	'message-arrow-left',
	'message-arrow-right',
	'message-bookmark',
	'message-clock',
	'message-delete',
	'message-flash',
	'message-image',
	'message-minus',
	'message-plus',
	'message-processing',
	'message-reply',
	'message-text',
	'message',
	'minus',
	'missed-call',
	'modem',
	'money',
	'monitor',
	'mood-happy',
	'mood-neutral',
	'mood-sad',
	'moon-star',
	'moon-stars',
	'moon',
	'more-horizontal',
	'more-vertical',
	'mouse',
	'move',
	'movie',
	'music',
	'next',
	'note-delete',
	'note-multiple',
	'note-plus',
	'note',
	'notes-delete',
	'notes-multiple',
	'notes-plus',
	'notes',
	'notification-off',
	'notification',
	'open',
	'paint-bucket',
	'paperclip',
	'pause',
	'percent',
	'picture-in-picture-alt',
	'picture-in-picture',
	'pin',
	'pixelarticons',
	'play',
	'playlist',
	'plus',
	'power',
	'prev',
	'print',
	'radio-handheld',
	'radio-on',
	'radio-signal',
	'radio-tower',
	'reciept-alt',
	'reciept',
	'redo',
	'reload',
	'remove-box-multiple',
	'remove-box',
	'repeat',
	'reply-all',
	'reply',
	'rounded-corner',
	'save',
	'scale',
	'script-text',
	'script',
	'scroll-horizontal',
	'scroll-vertical',
	'sd',
	'search',
	'section-copy',
	'section-minus',
	'section-plus',
	'section-x',
	'section',
	'server',
	'sharp-corner',
	'shield-off',
	'shield',
	'ship',
	'shopping-bag',
	'shuffle',
	'sliders-2',
	'sliders',
	'sort-alphabetic',
	'sort-numeric',
	'sort',
	'speaker',
	'speed-fast',
	'speed-medium',
	'speed-slow',
	'spotlight',
	'store',
	'subscriptions',
	'subtitles',
	'suitcase',
	'sun-alt',
	'sun',
	'switch',
	'sync',
	'tab',
	'table',
	'tea',
	'teach',
	'text-add',
	'text-colums',
	'text-search',
	'text-wrap',
	'timeline',
	'toggle-left',
	'toggle-right',
	'tournament',
	'track-changes',
	'trash-alt',
	'trash',
	'trending-down',
	'trending-up',
	'trending',
	'trophy',
	'truck',
	'undo',
	'ungroup',
	'unlink',
	'upload',
	'user-minus',
	'user-plus',
	'user-x',
	'user',
	'users',
	'video-off',
	'video',
	'view-col',
	'view-list',
	'viewport-narrow',
	'viewport-wide',
	'visible',
	'volume-1',
	'volume-2',
	'volume-3',
	'volume-minus',
	'volume-plus',
	'volume-vibrate',
	'volume-x',
	'volume',
	'wallet',
	'warning-box',
	'wind',
	'zap',
	'zoom-in',
	'zoom-out'
] as const;
