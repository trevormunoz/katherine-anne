import * as Backbone from 'backbone';
import AppRouter from './utils/app-router';

new AppRouter();
Backbone.history.start({pushState: true});
