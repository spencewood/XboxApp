#Xbox Voting App

Deployed version: http://xbox.notqualified.org
Tests: http://xbox.notqualified.org/test

##Features
 * Built with [Spine](http://spinejs.com/) MVC framework
 * Using [Require](http://requirejs.org/) for modules, dependencies and compression
 * Unit and integration testing with [Mocha](http://visionmedia.github.com/mocha/)
 * Utilizes [Twitter Bootstrap](http://twitter.github.com/bootstrap/) for non-ugly feel, consistent UI
 * Uses [Handlebars](http://handlebarsjs.com/) for all dynamic templating
 * Stores "session" data in the browser's Local Storage (for keeping track of daily votes)
 * Routing with deep-links. All "pages" are refreshable.

##Code
All code under /scripts is mine except for anything under /scripts/lib. All testing scripts are under /test.

##Notes
All unit tests pass except some raw web service calls to the API. The tests were written against the spec and should pass, so the calls are not doing what is documented!

Caching initial game data I think is a bad idea. However, keeping it cached over the life of the app and only requesting it when you need it is better. This app only requests the game list when necessary. And yes, it is necessary to request them after adding one.

I didn't go anywhere with web workers because I thought that it would just add unnecessary complexity.

With the speed of this app, there is little need for any kind of progress/loading indicator. My tests to the web service were sub-second. An entire page refresh is under a second as well. Any animation would be too quick.