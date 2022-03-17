const importUserForm = () => import('./components/UserForm');

const importModules = () => {
  importUserForm();
};

export default function preloadChunks() {
  if (window.requestIdleCallback) window.requestIdleCallback(importModules);
  else setTimeout(importModules, 10000);
}
