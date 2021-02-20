const APPS_NUMBER = 5; // According with the grid-mode.jpg each apps list by host has 5 elements.
const APP_JS_CLASS = "appNameInfo";

/**
 * Full host templating
 * @param {Object} element
 */
const hostComponentCreation = (host, rows) => {
  const COMPONENT = `
    <article class="results">
        <table class="results-table">
            <caption>
            ${host}
            </caption>
            ${rows}
        </table>
    </article>
    `;
  return COMPONENT;
};

/**
 * Row templating
 * @param {Object} element
 */
const rowCreation = (element) => {
  const row = `
    <tr>
        <td class="results-table__score">${element.apdex}</td>
        <td class="results-table__app ${APP_JS_CLASS}" attr-release="${element.version}">${element.name}</td>
    </tr>
    `;
  return row;
};

/**
 * Utility function to create the apps list.
 * @param {Array} list
 */
const addRows = (list) => {
  const rows = list.map(rowCreation).reduce((acum, curr) => {
    return acum + curr;
  }, "");

  return rows;
};

/**
 * Component creation
 * @param {Object} data
 */
const componentCreation = (data) => {
  let hostsList = "";

  Object.keys(data).forEach((host) => {
    const appList = data[host].slice(0, APPS_NUMBER);
    const rows = addRows(appList);
    hostsList += hostComponentCreation(host, rows);
  });

  return hostsList;
};

/**
 * Utility function to add an event listener to every app.
 * @param {HTMLElement} element
 */
const addAppListener = (element) => {
  const appsListItems = element.querySelectorAll(`.${APP_JS_CLASS}`);
  appsListItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      const release = event.target.getAttribute("attr-release");
      window.alert(`Release version: ${release}`); // I guess you want me to show a window.alert() in next sentence: "When clicking over an app, an alert dialog including the release number has to be shown."
    });
  });
};

/**
 * Grid view creation
 * @param {Object} data
 * @param {HTMLElement} element
 */
const gridView = (data, element) => {
  const component = componentCreation(data);
  element.innerHTML = component;
  addAppListener(element);
};

export { gridView };
