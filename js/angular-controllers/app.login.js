(function () {
    var scotchApp = angular.module('scotchApp');

    scotchApp.controller('LoginController', ['$scope', '$firebaseArray', '$route', 'userShare', function LoginController($scope, $firebaseArray, $route, userShare) {
        var vm = this;
        window.ac = vm;
        vm.create = true;
        vm.displayName = "My Account";
        vm.user = {};
        vm.bool = true;
        vm.showCart = 0;

        $scope.cart = { Uid: "" };
        $scope.cart.Num = 0;
        $scope.cart.TotalPrice = 0;

        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                // User is signed in.
                vm.user = user;
                if (vm.user.displayName != null)
                    vm.displayName = vm.user.displayName;
                else
                    vm.displayName = "User";

                vm.isLogin = true;
                vm.create = true;
                vm.showCart = 1;
                userShare.set(user.uid);

                $scope.btnCartClick();
                var ref = firebase.database().ref();
                $scope.orders = $firebaseArray(ref.child("Orders"));
            } else {
                // No user is signed in.
                vm.displayName = "My Account";
                vm.isLogin = false;
                vm.showCart = 0;
                $scope.btnCartClick();
                userShare.set(null);
            }
            $scope.$evalAsync();
        });

        vm.resetPassword = function () {
            firebase.auth().sendPasswordResetEmail(emailAddress).then(function () {
                // Email sent.
                Materialize.toast("Check your email to get new password!!!", 3000, 'rounded');
            }, function (error) {
                // An error happened.
                Materialize.toast("Sent failed!!! Please input your current email");
            });
        }

        vm.setFalse = function () {
            if (vm.create == true)
                vm.create = false;
            vm.username = "";
            vm.password = "";
        }

        vm.setTrue = function () {
            if (vm.create == false)
                vm.create = true;
            vm.username = "";
            vm.password = "";
        }

        vm.signUp = function () {
            if (vm.username == "" || vm.password == "") {
                Materialize.toast("SignUp Failed!!! Username or Password mustn't be empty!!!", 3000, 'rounded');
            }
            else {
                firebase.auth().createUserWithEmailAndPassword(vm.username, vm.password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;

                    Materialize.toast("Errors!!! Username was exists!!!", 3000, 'rounded');
                    // ...
                    vm.bool = false;
                }).then(function () {
                    if (vm.bool == false) {
                        vm.bool = true;
                        return;
                    }

                    vm.loginSuccess();
                });
            }
        }

        vm.login = function login() {
            if (vm.username == undefined || vm.password == undefined) {
                Materialize.toast("Login Failed!!! Username or Password mustn't be empty!!!", 3000, 'rounded');
            }
            else {
                firebase.auth().signInWithEmailAndPassword(vm.username, vm.password).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    Materialize.toast("Login Failed!!! Wrong username or password", 3000, 'rounded');
                    vm.bool = false;
                }).then(function () {
                    if (vm.bool == false) {
                        vm.bool = true;
                        return;
                    }

                    vm.loginSuccess();
                });
                //vm.authState();
            }
            //$route.reload();
            //$scope.$evalAsync();
        }

        vm.loginWithFacebook = function loginWithFacebook() {
            var provider = new firebase.auth.FacebookAuthProvider();
            provider.addScope('user_birthday');
            provider.addScope('public_profile');

            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                vm.loginSuccess();
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                Materialize.toast("Login Failed!!! Authentication has fallen", 3000, 'rounded');
            });
        }

        vm.loginWithGoogle = function loginWithGoogle() {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/plus.login');

            firebase.auth().signInWithPopup(provider).then(function (result) {
                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = result.credential.accessToken;
                // The signed-in user info.
                var user = result.user;

                vm.loginSuccess();
                // ...
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
                Materialize.toast("Login Failed!!! Authentication has fallen", 3000, 'rounded');
            });
        }

        vm.logout = function logout() {
            firebase.auth().signOut().then(function () {
                // Sign-out successful.
                Materialize.toast("Logout Successfully!!!", 3000, 'rounded');
                // vm.displayName = "My Account";
                // vm.isLogin = false;
                $scope.$evalAsync();
                vm.bool = true;
            }, function (error) {
                // An error happened.
            });
        }

        $scope.DelSignOut = function () {
            if ($scope.uid) {
                var ref = firebase.database().ref();
                vm.cart2 = $firebaseArray(ref.child("Carts"));

                vm.cart2.$loaded(function () {
                    for (var i = 0; i < vm.cart2.length; i++) {
                        if ($scope.uid == vm.cart2[i].Uid) {
                            vm.cart2.$remove(i);
                        }
                    }
                });
            }
        }

        $scope.btnCartClick = function () {
            $scope.refeshCart();
        }

        $scope.refeshCart = function () {
            $scope.nowuser = firebase.auth().currentUser;
            var ref = firebase.database().ref();
            $scope.cart = $firebaseArray(ref.child("Carts"));
            if ($scope.nowuser == null)
                return;
            $scope.cart.$loaded(function () {
                for (var i = 0; i < $scope.cart.length; i++) {
                    if ($scope.cart[i].Uid == $scope.nowuser.uid) {
                        $scope.cart = $scope.cart[i];
                    }
                }
                $scope.cart.Num = 0;
                $scope.cart.TotalPrice = 0;
                ref = firebase.database().ref();
                $scope.data = $firebaseArray(ref.child("Items").child("Sneakers"));
                $scope.data.$loaded(function () {
                    if ($scope.cart.Items) {
                        for (var i = 0; i < $scope.cart.Items.length; i++) {
                            for (var j = 0; j < $scope.data.length; j++) {
                                if ($scope.cart.Items[i].ID == $scope.data[j].ID) {
                                    $scope.cart.Items[i].Img = $scope.data[j].Img[0].Url;
                                    $scope.cart.Items[i].Name = $scope.data[j].Name;
                                    $scope.cart.Items[i].Price = $scope.data[j].Price;
                                    $scope.cart.TotalPrice += $scope.cart.Items[i].Qtt * $scope.cart.Items[i].Price;
                                    $scope.cart.Num += $scope.cart.Items[i].Qtt;
                                }
                            }
                        }
                    }
                });
            });
        }

        vm.loginSuccess = function () {
            var ref = firebase.database().ref();

            vm.data = $firebaseArray(ref.child("Items").child("Sneakers"));
            Materialize.toast("Login Successfully!!!", 3000, 'rounded');

            vm.cart1 = $firebaseArray(ref.child("Carts"));
            vm.data.$loaded(function () {

                vm.cart1.$loaded(function () {
                    vm.showCart = 1;
                    window.pp = vm.showCart;
                    $scope.isIn = false;
                    $scope.cart = { Uid: "", Items: [] };
                    var tuser = firebase.auth().currentUser;
                    $scope.cart.Uid = tuser.uid;
                    $scope.uid = $scope.cart.Uid;


                    for (var i = 0; i < vm.cart1.length; i++) {
                        if ($scope.cart.Uid == vm.cart1[i].Uid) {
                            $scope.cart = vm.cart1[i];
                            $scope.isIn = true;
                            console.log("in");
                        }
                    }
                    window.pt = $scope.cart;
                    $scope.cart.TotalPrice = 0;
                    $scope.cart.Num = 0

                    if ($scope.isIn == false) {
                        vm.cart1.$add($scope.cart);
                    }
                });
            });

        }

        vm.btnOrderClick = function () {
            vm.showCart = 2;
            $scope.newOrder = { ID: "", Customer: "", Address: "", Tel: "", Date: "", Status: "New", Items: [] };
        };

        $scope.btnRemoveClick = function (index) {
            $scope.cart.Items.$remove(index);
        }

        $scope.makeOrder = function () {
            $scope.nowuser = firebase.auth().currentUser;
            if ($scope.nowuser) {
                $scope.newOrder.Date = new Date();

                for (var i = 0; i < $scope.cart.Items.length; i++) {
                    for (var j = 0; j < $scope.data.length; j++) {
                        if ($scope.cart.Items[i].ID == $scope.data[j].ID) {
                            for (var k = 0; k < $scope.data[j].Size.length; k++) {
                                if ($scope.cart.Items[i].Size == $scope.data[j].Size[k].Size) {
                                    $scope.data[j].Size[k].Qtt -= $scope.cart.Items[i].Qtt;
                                }
                            }
                        }
                    }
                }
                $scope.$evalAsync();

                if ($scope.cart.Items) {
                    $scope.newOrder.Items = $scope.cart.Items;
                }
                $scope.newOrder.TotalPrice = $scope.cart.TotalPrice;
                var i = 1;
                var done = false;
                while (done == false) {
                    done = true;
                    $scope.newOrder.ID = "OD" + i;
                    window.lr = $scope.orders;
                    for (var j = 0; j < $scope.orders.length; j++) {
                        if ($scope.newOrder.ID == $scope.orders[j].ID) {
                            done = false;
                        }

                    }
                    i++;
                }

                $scope.orders.$add($scope.newOrder);

            }
        }

        $scope.isChecked = function () {
            for (var i = 0; i < $scope.cart.Items.length; i++) {
                for (var j = 0; j < $scope.data.length; j++) {
                    if ($scope.cart.Items[i].ID == $scope.data[j].ID) {
                        for (var k = 0; k < $scope.data[j].Size.length; k++) {
                            if ($scope.cart.Items[i].Size == $scope.data[j].Size[k].Size) {
                                if ($scope.data[j].Size[k].Qtt < $scope.cart.Items[i].Qtt)
                                    return false
                            }
                        }
                    }
                }
            }
            return true;
        };

        $scope.btnSubmitClick = function () {
            var ref = firebase.database().ref();
            if ($scope.isChecked() == true) {

                $scope.makeOrder();
                Materialize.toast("Orders Succesfully!! " + $scope.newOrder.ID, 5000, 'rounded');
                //$scope.DelSignOut();
                vm.showCart = 1;
            }
            else {
                Materialize.toast("Orders Failed!! Please try again!!", 5000, 'rounded');
                //$scope.DelSignOut();
                vm.showCart = 1;
            }
        };
    }]);
})();