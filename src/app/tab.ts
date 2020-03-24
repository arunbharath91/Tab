const myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/html');

export class Tab {
private tab: HTMLElement;
constructor(tabElement: string) {
this.tab = document.querySelector(tabElement) as HTMLElement;
this.initTab();
}

initTab() {
  const tabContent = this.tab.getAttribute('tab-target') as string;
  const tabs = this.tab.querySelectorAll('[data-tab]');
  const tabsAsArray = Array.prototype.slice.call(tabs);
  tabsAsArray.forEach((tab) => {
    tab.addEventListener('click', (e: any) => {
      e.target.classList.add('active');
      const remainingTarget  = tabsAsArray.filter((item) => item != e.target);
      remainingTarget.forEach((target)=> target.classList.remove('active'));
      const tabID = tab.getAttribute('data-tab') as string;
      this.httpReq(`${this.tab.dataset.path}/${tabID.replace("#", "")}.html`, {
              mode: 'no-cors',
              method: 'get',
              headers: myHeaders
          }, tabContent);
    })
  });
  (tabsAsArray[0] as HTMLElement).click();

}


protected httpReq(url: RequestInfo, methods: RequestInit, bindElem?: string) {
    fetch(url, methods)
        .then((response) => {
            response.text().then((text) => {
                if (bindElem) {
                  (document.querySelector(`#${bindElem}`) as HTMLElement).innerHTML = text;
                }
            })
        })
        .catch((err) => {
            console.log(err)
        });
}

}
