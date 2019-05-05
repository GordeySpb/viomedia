import View from './View';
import Model from './Model';
import Controller from './Controller';

import './styles/main.scss';

const model = new Model();
const view = new View();

const controller = new Controller(model, view);

export default controller;
