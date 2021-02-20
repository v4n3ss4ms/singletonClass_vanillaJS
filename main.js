import appsData from './data_class.js';
import { gridView } from "./viewCreation.js";

const ELEMENT_ID = 'gridModeSolutionUI';
const DOM_ELEMENT = document.getElementById(ELEMENT_ID);
const GRID_OR_LIST_JS_CLASS = 'gridOrListCheck';
const GRID_OR_LIST_CHECK = document.getElementsByClassName(GRID_OR_LIST_JS_CLASS)[0];
const LOAD_ERROR = `Ups... data couldn't be loaded`;
const LIST_CSS_CLASS = 'content--list';

const HOST_NAME_TEST = '1d717554-bf17.sydnie.name';
const APP_NAME_TEST = 'Practical Metal Computer - Auer LLC, Inc';

const NEW_APP_TEST = {
  apdex: 143,
  contributors: ['Henar Sita', 'Vane Ssota'],
  host: ['128406fc-0d3f.tiana.biz', '1d717554-bf17.sydnie.name', '95b346a0-17f4.abbigail.name', 'b0b655c5-928a.nadia.biz'],
  name: 'Altos Hornos de Bizkaia - Sociedad Alk',
  version: 45,
};


/**
 * Set show grid or list checkbox availability
 * @param {Boolean} isAvailable
 */
const setCheckBoxAvailability = (isAvailable) => {
  GRID_OR_LIST_CHECK.disabled = !isAvailable;
};

/**
 * Utility function for toggling between grid and list view
 */
const toggleGridListView = () => {
  DOM_ELEMENT.classList.toggle(LIST_CSS_CLASS);
};

GRID_OR_LIST_CHECK.addEventListener("click", () => toggleGridListView());

fetch("host-app-data.json")
  .then((res) => res.json())
  .then((data) => {
    const appsDataClass = appsData(data);
    
    // remove example
    // appsDataClass.removeAppFromHosts(HOST_NAME_TEST, APP_NAME_TEST);
    // remove example with error
    // appsDataClass.removeAppFromHosts('this_host_doesnt_exist', APP_NAME_TEST);

    // add example
    // appsDataClass.addAppToHosts(NEW_APP_TEST);
    // add example with error
    // appsDataClass.addAppToHosts('this app is not valid');

    setCheckBoxAvailability(true);
    gridView(appsDataClass.getTopAppsByApdex(), DOM_ELEMENT);
  })
  .catch(() => {
    DOM_ELEMENT.innerHTML = LOAD_ERROR;
    setCheckBoxAvailability(false);
  });
