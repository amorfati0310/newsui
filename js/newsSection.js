const NEWS_DATA_KEY = "NEWS";
export default class newsSection {
  constructor({ fetchUrl, mainSelector, navigationSelector, btnSelector }) {
    this.fetchUrl = fetchUrl;
    this.currentIdx = 0;
    this.maxIdx = null;
    this.newsData = null;
    this.mainAreaEl = document.querySelector(mainSelector);
    this.newsNavigationEl = document.querySelector(navigationSelector);
    this.buttonContainerEl = document.querySelector(btnSelector);
    this.bindEvents();
  }
  bindEvents() {
    this.buttonContainerEl.addEventListener("click", ({ target }) => this.handleClickBtn(target));
    this.newsNavigationEl.addEventListener("click", ({ target }) => this.handleClickNavigation(target));
  }
  handleClickBtn(btn) {
    const pageButton = btn.closest(".left") || btn.closest(".right");
    if (!pageButton) return;
    if (pageButton.className === "left") this.renderNewNews(this.setPrevIdx());
    else this.renderNewNews(this.setNextIdx());
  }
  handleClickNavigation(btn) {
    const navBtn = btn.closest("li");
    const nextIdx = +navBtn.id;
    this.renderNewNews(nextIdx);
  }
  setPageIdx(idx) {
    this.currentIdx = idx;
  }
  setMaxIdx(idx) {
    this.maxIdx = idx;
  }
  getPageData() {
    return JSON.parse(localStorage.getItem(NEWS_DATA_KEY))[this.currentIdx];
  }
  renderMainNews(newsData) {
    this.mainAreaEl.innerHTML = this.fnNewsListTemplate(newsData);
  }
  renderNewNews(idx) {
    this.setPageIdx(idx);
    const newsData = this.getPageData();
    this.renderMainNews(newsData);
  }
  setNextIdx() {
    let nextIdx = this.currentIdx + 1;
    if (nextIdx > this.maxIdx) nextIdx = 0;
    return nextIdx;
  }
  setPrevIdx() {
    let prevIdx = this.currentIdx - 1;
    if (prevIdx < 0) prevIdx = this.maxIdx;
    return prevIdx;
  }
  init(fnNewsListTemplate, fnNewsCompanyList) {
    this.fnNewsCompanyList = fnNewsCompanyList;
    this.fnNewsListTemplate = fnNewsListTemplate;
    this.getData(this.fetchUrl);
  }
  saveData(newsList) {
    localStorage.setItem(NEWS_DATA_KEY, JSON.stringify(newsList));
  }
  makeNewsContents(newsList) {
    this.saveData(newsList);
    this.setMaxIdx(newsList.length - 1);
    const companyList = newsList.map(({ company }) => company);
    this.mainAreaEl.innerHTML = this.fnNewsListTemplate(newsList[0]);
    this.newsNavigationEl.innerHTML = this.fnNewsCompanyList(companyList);
  }
  getData(url) {
    fetch(url)
      .then(res => res.json())
      .then(jsonData => this.makeNewsContents(jsonData));
  }
}
