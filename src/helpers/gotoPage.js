import eventBus from '../eventBus';

export default function gotoPage(pageName, pageParams) {
  eventBus.$emit('goto-page', pageName, pageParams);
}
