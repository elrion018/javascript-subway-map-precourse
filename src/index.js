import { SubwayMapLineView, SubwayMapStationView } from './views';
import { SubwayMapViewModel } from './viewModels';
import { SubwayMapModel } from './models';

window.addEventListener('DOMContentLoaded', () => {
  const managerContainer = document.getElementById('manager-container');
  const stationManagerButton = document.getElementById(
    '#station-manager-button',
  );
  const lineManagerButton = document.getElementById('#line-manager-button');

  const subwayMapModel = new SubwayMapModel();
  const subwayMapViewModel = new SubwayMapViewModel(subwayMapModel);
  const subwayMapStationView = new SubwayMapStationView(
    subwayMapViewModel,
    managerContainer,
    stationManagerButton,
  );
  const subwayMapLineView = new SubwayMapLineView(
    subwayMapViewModel,
    managerContainer,
    lineManagerButton,
  );
});
