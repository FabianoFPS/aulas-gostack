import EtherealMailPorvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

export default {
  ethereal: EtherealMailPorvider,
  ses: SESMailProvider,
};
