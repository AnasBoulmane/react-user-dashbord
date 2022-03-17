const importUserForm = () => import('./components/UserForm');
const importConfirmation = () => import('./components/Confirmation');

const importModules = () => {
  importUserForm();
  importConfirmation();
};

export default function preloadChunks() {
  if (window.requestIdleCallback) window.requestIdleCallback(importModules);
  else setTimeout(importModules, 10000);
}
