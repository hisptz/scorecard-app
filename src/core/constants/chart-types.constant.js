import area from '../../resources/icons/area.png';
import bar from '../../resources/icons/bar.png';
import column from '../../resources/icons/column.png';
import dotted from '../../resources/icons/dotted.png';
import gauge from '../../resources/icons/gauge.png';
import pie from '../../resources/icons/pie.png';
import radar from '../../resources/icons/radar.png';
import stackedBar from '../../resources/icons/stacked-bar.png';
import stackedColumn from '../../resources/icons/stacked-column.png';
// import line from '.../../resources/icons/line.png';


export const CHART_TYPES = [

      {
        type: 'column',
        description: 'Column chart',
        icon: column
      },
      {
        type: 'line',
        description: 'Line chart',
        icon: dotted
      },
      // {
      //   type: 'dotted',
      //   description: 'Dotted chart',
      //   icon: dotted
      // },
      {
        type: 'bar',
        description: 'Bar chart',
        icon: bar
      },
      {
        type: 'area',
        description: 'Area chart',
        icon: area
      },
      {
        type: 'pie',
        description: 'Pie chart',
        icon: pie
      },
      // {
      //   type: 'stacked_column',
      //   description: 'stacked column chart',
      //   icon: stackedColumn
      // },
      // {
      //   type: 'stacked_bar',
      //   description: 'stacked bar chart',
      //   icon: stackedBar
      // },
      {
        type: 'solidgauge',
        description: 'Gauge chart',
        icon: gauge
      },
      // {
      //   type: 'radar',
      //   description: 'Radar chart',
      //   icon: radar
      // },

]