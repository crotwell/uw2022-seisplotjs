
export const DEMO_NAV = "demo-nav";

export function createNavItems() {
  let navItems = new Map();
  navItems.set("index.html", "Start");
  navItems.set("2_bigger.html", "Seismograph");
  navItems.set("3_disporg.html", "Organized");
  return navItems;
}

export const navStyle = `
ol {
    list-style-type: none;
    padding-left: 0;
}
`;

export class DemoNavBar extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({mode: 'open'});
    const style = document.createElement('style');
    style.textContent = navStyle;
    shadow.appendChild(style);
    const ol = document.createElement('ol');
    createNavItems().forEach((val, key) => {
      const li = ol.appendChild(document.createElement('li'));
      const a = li.appendChild(document.createElement('a'));
      a.textContent = val;
      a.setAttribute("href", key);
    });
    shadow.appendChild(ol);
  }
}

customElements.define(DEMO_NAV, DemoNavBar, { extends: 'nav' });
