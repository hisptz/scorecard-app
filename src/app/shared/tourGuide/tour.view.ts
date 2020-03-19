import { IStepOption } from 'ngx-tour-md-menu';
/**
 * Created by kelvin on 11/17/17.
 */
export default <IStepOption[]>[
  {
    anchorId: 'view.home',
    content: 'Click here to Back to scorecard list',
    placement: 'auto',
    title: 'Back to scorecard list'
  },
  {
    anchorId: 'view.edit',
    content: 'Click here to Edit a Scorecard',
    placement: 'bottom',
    title: 'Go to Edit Scorecard'
  },
  {
    anchorId: 'view.ou',
    content: 'Choose organisation units',
    placement: 'bottom',
    title: 'Organisation Unit Selection'
  },
  {
    anchorId: 'view.pe',
    content: 'Select Period to be used',
    placement: 'bottom',
    title: 'Period Selection'
  },
  {
    anchorId: 'view.options',
    content:
      'Customize the look of scorecard. add numbering, ranking, hide/show legend, average column and row.',
    placement: 'bottom',
    title: 'Additional Options'
  },
  {
    anchorId: 'view.download',
    content:
      'Click here to download a file of your scorecard by choosing a format (CSV, Excel, Export Metadata and Export data)',
    placement: 'left',
    title: 'Download Scorecard'
  },
  {
    anchorId: 'view.scorecard',
    content:
      'Click on any title to sort, double click to do additional options, right click on any cell for additional options',
    placement: 'auto',
    title: 'Here is Your Scorecard'
  }
];
