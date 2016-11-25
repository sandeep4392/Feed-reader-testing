/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
  /* This is our first test suite - a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty. Experiment with this before you get started on
     * the rest of this project. What happens when you change
     * allFeeds in app.js to be an empty array and refresh the
     * page?
     */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });
    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    // test to check the url is defined and not empty.
    it('URLs Defined and not empty ', function() {
      for (var i in allFeeds) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url.length).not.toBe(0);
      }
    });
    /* TODO: Write a test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    // Test to check the name is not empty.
    it('Name defined and not empty', function() {
      for (var i in allFeeds) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name.length).not.toBe(0);
      }
    })
  });
  /* TODO: Write a new test suite named "The menu" */
  // test suit named The menu.
  describe('The menu', function() {
    var body = $('body');
    var menuHide = body.hasClass('menu-hidden');
    var menuIcon = $('.menu-icon-link');
    /* TODO: Write a test that ensures the menu element is
     * hidden by default. You'll have to analyze the HTML and
     * the CSS to determine how we're performing the
     * hiding/showing of the menu element.
     */
    // Test to check the menu item is hidden by default.
    it('menu element is hidden by default', function() {
      expect(menuHide).toEqual(true);
    });
    /* TODO: Write a test that ensures the menu changes
     * visibility when the menu icon is clicked. This test
     * should have two expectations: does the menu display when
     * clicked and does it hide when clicked again.
     */
    // Test to define menu visibility changes when menu icon is clicked.
    it('menu changes visibility when menu icon is clicked', function() {
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toEqual(false);
      menuIcon.click();
      expect(body.hasClass('menu-hidden')).toEqual(true);
    });
  });
  /* TODO: Write a new test suite named "Initial Entries" */
  describe('Initial Entries', function() {
    /* TODO: Write a test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     * Remember, loadFeed() is asynchronous so this test will require
     * the use of Jasmine's beforeEach and asynchronous done() function.
     */
    //before each function for async calls.
    beforeEach(function(done) {
      loadFeed(0, function() {
        done();
      });
    });
    //Test to check if atleast one singe entry element is in feedcontainer.
    it('There is at least single entry element within the feed container', function() {
        //find method will Get the descendants of each element in the current set of matched elements, filtered by a selector, jQuery object, or element.
      var entries = $('.feed').find('.entry').length;
      expect(entries).toBeGreaterThan(0);
    });
  });
  /* TODO: Write a new test suite named "New Feed Selection"*/
  describe('New Feed Selection', function() {
    var firstFeed;
    var secondFeed;
    /* TODO: Write a test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     * Remember, loadFeed() is asynchronous.
     */
    //beforeEach to wait for async calls to finish
    beforeEach(function(done) {
      loadFeed(1, function() {
        firstFeed = $('.feed').html();
        loadFeed(2, function() {
          done();
        });
      });
    });
    //afterEach to reload first entry
    afterEach(function() {
      loadFeed(0);
    });
    //Test to detrmine that the entry has changed
    it('changes feed content', function() {
      expect(firstFeed).toBeDefined();
      secondFeed = $('.feed').html();
      expect(secondFeed).toBeDefined();
      expect(firstFeed).not.toEqual(secondFeed);
    });
  });
}());