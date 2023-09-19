/**
 * Render the under construction element when needed.
 * @param releaseDate The datetime after which the page automatically reloads if the current datetime is before the `releaseDate`. If the current datetime is after the `releaseDate` then the under construction element is not shown.
 * @param force When `true` the under construnction element will show on `webflow.io` domains.
 */
export const checkUnderConstruction = (releaseDate: Date, force?: boolean) => {
  const now = new Date();
  if (now >= releaseDate) return;

  const { host } = window.location;
  if (!host.includes('webflow.io') || force) {
    showUnderConstruction(releaseDate);
  }
};

/**
 * Shows the under construction element and remove all elements in the `body` that don't have the `under-construction="keep"` attribute set.
 */
function showUnderConstruction(releaseDate: Date) {
  gsap.set('body', { height: '100%', overflow: 'hidden' });
  gsap.set('.under-construction', { display: 'flex' });

  const elementsToRemove = document.querySelectorAll('body > :not([under-construction="keep"])');
  elementsToRemove.forEach((el) => el.remove());

  renderClock();
  reloadOnReleaseDateExpired(releaseDate, 1000);
}

/**
 * Renders the clock displayed in the under construction element.
 *
 * The clock element should have the `clock`attribute set.
 */
function renderClock() {
  const clockElement = document.querySelector('[clock]');
  if (!clockElement) return;

  const refreshClock = () => {
    const date = new Date();
    clockElement.innerHTML = `${date.toLocaleString('nl-be')}`;
    requestAnimationFrame(refreshClock);
  };

  requestAnimationFrame(refreshClock);
}

/**
 * Reloads the page automatically after the given release date has passed.
 * @param releaseDate The datetime after which the page automatically reloads.
 * @param refreshRate The rate for checking the `releaseDate` in milliseconds.
 */
function reloadOnReleaseDateExpired(releaseDate: Date, refreshRate: number) {
  let previousTimeStamp: number;

  const checkReloadNeeded = (timestamp: number) => {
    if (previousTimeStamp == null) {
      previousTimeStamp = timestamp;
    }
    const elapsed = timestamp - previousTimeStamp;

    if (elapsed >= refreshRate) {
      const now = new Date();
      previousTimeStamp = timestamp;

      if (now >= releaseDate) {
        window.location.reload();
      }
    }

    requestAnimationFrame(checkReloadNeeded);
  };

  requestAnimationFrame(checkReloadNeeded);
}
