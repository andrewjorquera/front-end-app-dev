describe('MenuService', function () {

  var MenuService;
  var $httpBackend;
  var ApiPath;

  beforeEach(function() {
    module('common');

    inject(function($injector) {
      MenuService = $injector.get('MenuService');
      $httpBackend = $injector.get('$httpBackend');
      ApiPath = $injector.get('ApiPath');
    });
  });

  it('should return menu item if it exists', function () {
    var category = 'A';
    var number = '1';
    var expectedResponse = { 
      description: "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
      large_portion_name: "quart",
      name: "Won Ton Soup with Chicken",
      price_large: 5,
      price_small: 2.55,
      short_name: "A1",
      small_portion_name: "pint"
    };
    $httpBackend.whenGET(ApiPath + '/menu_items/A/menu_items/0.json').respond(expectedResponse);

    MenuService.getMenuItem(category, number).then(function (response) {
      expect(response).toEqual(expectedResponse);
    });

    $httpBackend.flush();
  });

  it('should reject if the menu item does not exist', function () {
    var category = 'Z';
    var number = '99';

    $httpBackend.whenGET(ApiPath + '/menu_items/Z/menu_items/98.json').respond(null);

    MenuService.getMenuItem(category, number).then(function (response) {
      expect(response).toBeNull();
    });

    $httpBackend.flush();
  });
});