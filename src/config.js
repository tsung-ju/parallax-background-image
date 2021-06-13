export const USE_3D = isChrome();

function isChrome() {
  const userAgent = navigator.userAgent;
  return (
    userAgent.indexOf("Chrome/") !== -1 && userAgent.indexOf("Edge/") === -1
  );
}
