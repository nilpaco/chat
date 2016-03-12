'use strict';

angular.module('conversationApp').controller('MessageDialogController',
    ['$scope', '$stateParams', '$uibModalInstance', '$q', 'entity', 'Message', 'Conversation',
        function($scope, $stateParams, $uibModalInstance, $q, entity, Message, Conversation) {

        $scope.message = entity;
        $scope.messages = Message.query({filter: 'message-is-null'});
        $q.all([$scope.message.$promise, $scope.messages.$promise]).then(function() {
            if (!$scope.message.message || !$scope.message.message.id) {
                return $q.reject();
            }
            return Message.get({id : $scope.message.message.id}).$promise;
        }).then(function(message) {
            $scope.messages.push(message);
        });
        $scope.conversations = Conversation.query();
        $scope.load = function(id) {
            Message.get({id : id}, function(result) {
                $scope.message = result;
            });
        };

        var onSaveSuccess = function (result) {
            $scope.$emit('conversationApp:messageUpdate', result);
            $uibModalInstance.close(result);
            $scope.isSaving = false;
        };

        var onSaveError = function (result) {
            $scope.isSaving = false;
        };

        $scope.save = function () {
            $scope.isSaving = true;
            if ($scope.message.id != null) {
                Message.update($scope.message, onSaveSuccess, onSaveError);
            } else {
                Message.save($scope.message, onSaveSuccess, onSaveError);
            }
        };

        $scope.clear = function() {
            $uibModalInstance.dismiss('cancel');
        };
        $scope.datePickerForTime = {};

        $scope.datePickerForTime.status = {
            opened: false
        };

        $scope.datePickerForTimeOpen = function($event) {
            $scope.datePickerForTime.status.opened = true;
        };
}]);
