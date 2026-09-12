/**
 * Inline script injected before paint to apply the stored (or system) theme
 * and avoid a flash of the wrong colour scheme.
 */
export function ThemeScript() {
  const code = `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
