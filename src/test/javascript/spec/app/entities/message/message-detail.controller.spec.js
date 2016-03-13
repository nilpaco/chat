'use strict';

describe('Controller Tests', function() {

    describe('Message Detail Controller', function() {
        var $scope, $rootScope;
        var MockEntity, MockMessage, MockConversation;
        var createController;

        beforeEach(inject(function($injector) {
            $rootScope = $injector.get('$rootScope');
            $scope = $rootScope.$new();
            MockEntity = jasmine.createSpy('MockEntity');
            MockMessage = jasmine.createSpy('MockMessage');
            MockConversation = jasmine.createSpy('MockConversation');
            

            var locals = {
                '$scope': $scope,
                '$rootScope': $rootScope,
                'entity': MockEntity ,
                'Message': MockMessage,
                'Conversation': MockConversation
            };
            createController = function() {
                $injector.get('$controller')("MessageDetailController", locals);
            };
        }));


        describe('Root Scope Listening', function() {
            it('Unregisters root scope listener upon scope destruction', function() {
                var eventType = 'conversationApp:messageUpdate';

                createController();
                expect($rootScope.$$listenerCount[eventType]).toEqual(1);

                $scope.$destroy();
                expect($rootScope.$$listenerCount[eventType]).toBeUndefined();
            });
        });
    });

});
