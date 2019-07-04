import * as ActionConst from './ActionConst';
import Router from './Router';
import Reducer from './Reducer';
import Scene from './Scene';
import NavigationStore from './Store';
import getDefaultNavigationStore from './defaultStore';
import Modal from './Modal';
import Lightbox from './Lightbox';
import Stack from './Stack';
import Drawer from './Drawer';
import Tabs from './Tabs';
import Overlay from './Overlay';
import pathParser from './pathParser';

const exported = {
  Reducer,
  ActionConst,
  Router,
  Scene,
  NavigationStore,
  get Actions() {
    return getDefaultNavigationStore();
  },
  Modal,
  Lightbox,
  Stack,
  Drawer,
  Tabs,
  Overlay,
  pathParser,
};

export default exported;
