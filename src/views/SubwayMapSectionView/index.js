import { message } from '../../constants';
import { SectionViewEventDelegator } from '../../eventDelegators';

export default class SubwayMapSectionView {
  constructor(subwayMapViewModel, managerContainer, sectionManagerButton) {
    this.subwayMapViewModel = subwayMapViewModel;
    this.managerContainer = managerContainer;
    this.eventDelegator = new SectionViewEventDelegator(this, this.subwayMapViewModel);
    this.eventDelegator.bindEvent(sectionManagerButton);
  }

  resetManagerContainer() {
    this.managerContainer.innerHTML = '';
  }

  renderSectionManager() {
    this.renderLineMenuButtons(Object.entries(this.subwayMapViewModel.getLines()));
    this.renderSelectedLineSectionManagerContainer();

    this.eventDelegator.bindEvent(document.getElementById('#section-line-menu-button-container'));
  }

  renderLineMenuButtons(lines) {
    let lineButtons = '';
    lines.forEach(line => {
      lineButtons += `
        <button data-id="${line[0]}" data-purpose="selectLine" class=".section-line-menu-button">
          ${line[0]}
        </button>
      `;
    });

    this.managerContainer.innerHTML = `
    <div id="#section-line-menu-button-container">
      <h3>${message.SECTION_INFORMATION}</h3>
      ${lineButtons}
    </div>
   
    `;
  }

  renderSelectedLineSectionManagerContainer() {
    this.managerContainer.innerHTML += `
    <div id="#section-selected-line-manager-container"></div>
    `;

    this.eventDelegator.bindEvent(
      document.getElementById('#section-selected-line-manager-container'),
    );
  }

  resetSelectedLineSectionManagerContainer() {
    document.getElementById('#section-selected-line-manager-container').innerHTML = '';
  }

  renderSelectedLineSectionManager(line) {
    const sectionSelector = this.renderSectionSelector(
      Object.entries(this.subwayMapViewModel.getStations()),
    );
    const sectionOrderInput = `<input id="#section-order-input" type="number" placeholder=${message.SECTION_INPUT_PLACEHOLDER}></input>`;
    const sectionAddButton = `<button id="#section-add-button" data-lineid="${line.lineId}" data-purpose="addSection">${message.ADD}</button>`;
    document.getElementById('#section-selected-line-manager-container').innerHTML += `
        <h3>${line.lineId} ${message.LINE_MANAGING}</h3>
        <p>${message.ADD_SECTION}</p>
        ${sectionSelector}
        ${sectionOrderInput}
        ${sectionAddButton}
    `;
    this.renderSectionTableContainer();
    this.renderSectionTable(line.lineId, this.subwayMapViewModel.getSections(line.lineId));
  }

  renderSectionSelector(sections) {
    const selectorOptions = sections
      .map(section => {
        let [sectionId] = section;
        return `<option data-id="${sectionId}">${sectionId}</option>`;
      })
      .join('');

    const sectionSelector = `
      <select id= "#section-station-selector">
        ${selectorOptions}
      </select>
    `;

    return sectionSelector;
  }

  renderSectionTableContainer() {
    document.getElementById('#section-selected-line-manager-container').innerHTML += `
      <div id="#section-table-container"></div>
    `;
  }

  resetSectionTable() {
    document.getElementById('#section-table-container').innerHTML = '';
  }

  renderSectionTable(lineId, sections) {
    document.getElementById('#section-table-container').innerHTML += this.combineTheadTbody(
      this.getSectionThead(),
      this.getSectionTbody(lineId, sections),
    );
  }

  combineTheadTbody(sectionThead, sectionTbody) {
    return `
      <table id="#section-name-table">
        ${sectionThead}
        ${sectionTbody}
      </table>
    `;
  }

  getSectionThead() {
    return `
      <tr>
        <th>${message.ORDER}</th>
        <th>${message.NAME}</th>
        <th>${message.OPTION}</th>
      </tr>
    `;
  }

  getSectionTbody(lineId, sections) {
    return sections
      .map((section, index) => {
        return this.getSectionTbodyTr(lineId, section, index);
      })
      .join('');
  }

  getSectionTbodyTr(lineId, section, index) {
    return `
    <tr>
      <td>${index}</td>
      <td>${section.stationId}</td>
      <td>
        <button data-lineid="${lineId}"data-sectionid="${index}" data-purpose="deleteSection" class=".section-delete-button">${message.OPTION_DELETE}</button>
      </td>
    </tr>
  `;
  }
}
