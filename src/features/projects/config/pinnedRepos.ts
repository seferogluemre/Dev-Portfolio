// Manuel pinned repository konfigürasyonu
// Bu ID'ler GitHub hesabınızdan pinned olarak gösterilecek projelerdir
// Daha sonra GraphQL API ile otomatik hale getirilebilir

export const PINNED_REPO_IDS = [
  901871104, // Advanced-Pagination-Rick-Morty (10 ⭐)
  887853993, // alisveris-listesi (9 ⭐)
  939251898, // angular-ecommerce (3 ⭐)
  810590107, // apartment-automation-system (7 ⭐)
  896628817, // Android-MUI-Design (8 ⭐)
  895977850, // Android-UI-Design (8 ⭐)
];

// Pinned repository'lerin özel sıralaması
// GitHub'daki sıralama ile aynı olacak şekilde
export const PINNED_REPO_ORDER = [
  'Advanced-Pagination-Rick-Morty',
  'alisveris-listesi', 
  'angular-ecommerce',
  'apartment-automation-system',
  'Android-MUI-Design',
  'Android-UI-Design'
];

// Pinned projeler için özel açıklamalar (opsiyonel)
export const PINNED_REPO_DESCRIPTIONS = {
  'Advanced-Pagination-Rick-Morty': 'Rick and Morty karakterleri için gelişmiş sayfalama ve filtreleme sistemi. TypeScript ve modern React hook\'ları kullanılarak geliştirildi.',
  'alisveris-listesi': 'TypeScript ve React ile geliştirilmiş modern alışveriş listesi uygulaması. Local storage entegrasyonu ve responsive tasarım.',
  'angular-ecommerce': 'Angular framework\'ü ile geliştirilmiş kapsamlı e-ticaret platformu. Component-based mimari ve TypeScript desteği.',
  'apartment-automation-system': 'C# ve SQL Server kullanılarak geliştirilen apartman otomasyon sistemi. Windows Forms uygulaması.',
  'Android-MUI-Design': 'Android için Material UI tasarım prensiplerini uygulayan Java uygulaması. Modern UI/UX deneyimi.',
  'Android-UI-Design': 'Android mobil uygulama tasarımı örnekleri. Java ile geliştirilmiş çeşitli UI componentleri.'
};

// Pinned projeler için özel etiketler
export const PINNED_REPO_TAGS = {
  'Advanced-Pagination-Rick-Morty': ['⭐ Featured', '🔥 Popular'],
  'alisveris-listesi': ['⭐ Featured', '📱 Mobile-First'],
  'angular-ecommerce': ['🛒 E-Commerce', '🅰️ Angular'],
  'apartment-automation-system': ['🏢 Enterprise', '🔧 Desktop App'],
  'Android-MUI-Design': ['📱 Mobile', '🎨 UI/UX'],
  'Android-UI-Design': ['📱 Mobile', '🎨 Design']
};
