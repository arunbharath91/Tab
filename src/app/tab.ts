const myHeaders = new Headers();
myHeaders.append('Content-Type', 'text/html');

export class Tab {
  private tab: HTMLElement;
  private tabList: any[];
  constructor(tabElement: string) {
    this.tab = document.querySelector(tabElement) as HTMLElement;
    this.tabList = Array.prototype.slice.call(this.tab.querySelectorAll('[data-tab]'));
    this.initTab();
  }

  private initTab() {
    const tabContent = document.createElement('div');
    tabContent.className = 'tabcontent';
    tabContent.innerHTML = `<div class="view-container"></div>`;
    this.tab.append(tabContent);
    this.eventRegistration(tabContent);
    this.tabList[0].click();
  }

  protected eventRegistration(tabContent: HTMLElement) {
    const tabEvents = (e: any) => {
      if (e.target.getAttribute('data-tab')) {
        this.activateTab(e.target);
        const tabID = e.target.getAttribute('data-tab');
        tabContent.setAttribute("source", `${e.target.getAttribute('data-tab')}`);
        if (this.tab.dataset.source) {
          this.httpReq(`${this.tab.dataset.source}/${tabID.replace("#", "")}.html`, {
            mode: 'no-cors',
            method: 'get',
            headers: myHeaders
          }, (document.querySelector('.view-container') as HTMLElement));
        } else {
          this.insertView(tabContent, e.target.getAttribute('data-tab'));
        }

      }
      e.stopPropagation();
    }
    this.tab.addEventListener('click', tabEvents, false);
  }

  protected activateTab(tab: HTMLElement) {
    this.tabList.forEach((item) => {
      if (item !== tab) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  }

  protected insertView(tabContent: HTMLElement, id: string) {
    const templateContent = (document.querySelector(`template[tab-ref="${id.replace("#", "")}"]`) as HTMLElement);
    (tabContent.querySelector(`.view-container`) as HTMLElement).innerHTML = templateContent.innerHTML;
  }

  protected httpReq(url: RequestInfo, methods: RequestInit, bindElem: HTMLElement) {
    bindElem.innerHTML = `<div class="loader"></div>`;
    fetch(url, methods)
      .then((response) => {
        response.text().then((text) => {
          if (bindElem) {
            bindElem.innerHTML = text;
          }
        })
      })
      .catch((err) => {
        console.log(err)
      });
  }

}
