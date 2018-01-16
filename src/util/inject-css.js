/**
 * Inject a CSS style declaration into the document head.
 *
 * @param {string} css Valid CSS string.
 */
const injectCSS = (css) => {
  const node = document.createElement('style');
  node.innerHTML = css;
  document.body.appendChild(node);
};

export default injectCSS;
