import * as Backbone from 'backbone';
import AppRouter from './routers/app-router.js';

let router = new AppRouter();
Backbone.history.start({pushState: true});
