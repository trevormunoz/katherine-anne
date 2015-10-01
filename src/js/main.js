import * as Backbone from 'backbone';
import AppRouter from './routers/app-router.js';

var router = new AppRouter();
Backbone.history.start({pushState: true, root:'/collection/'});
