/*
Author: Nilkanth Bajaniya
*/

//generic code to perform add, edit, update, remove operation on the data stored in the local storage.
"use strick"
var Utility = {
    //to add item or array in the local-storage to the specific key
    add: function (key, values) {

        try {
            var data = localStorage.getItem(key);

            if (data != null) {

                data = JSON.parse(data);

                if (values.length != undefined) {

                    var lastId = data[data.length - 1]["Id"];

                    for (var i = 0; i < values.length; i++) {

                        values[i]["Id"] = lastId + (i + 1);
                        data.push(values[i]);
                    }
                } else {

                    var lastId = data["Id"];
                    values["Id"] = lastId + 1;
                    data.push(values);
                }

                localStorage.setItem(key, JSON.stringify(data));
            } else {

                var arr = new Array();

                if (values.length != undefined) {

                    for (var i = 0; i < values.length; i++) {

                        values[i]["Id"] = (i + 1);
                        arr.push(values[i]);
                    }
                } else {
                    values["Id"] = 1;
                    arr.push(values);
                }

                localStorage.setItem(key, JSON.stringify(arr));
            }
        } catch (e) {
            console.log(`Error occured \n ${e}`);
            RefreshPage();
        }

    },
    //update the one of the value of specific key
    update: function (key, Id, propertyName, newPropertyValue) {

        try {

            var data = localStorage.getItem(key);

            if (data != null) {

                data = JSON.parse(data);

                for (var i = 0; i < data.length; i++) {

                    if (data[i]["Id"].toString() === Id.toString()) {

                        data[i][propertyName] = newPropertyValue;
                    }
                }

                localStorage.setItem(key, JSON.stringify(data));
            } else return;
        } catch (e) {

            console.log(`Error occured \n ${e}`);
            RefreshPage();
        }

    },
    //to remove the object from specific key
    remove: function (key, value) {

        var data = localStorage.getItem(key);

        if (data != null) {

            data = JSON.parse(data);

            for (var i = 0; i < data.length; i++) {

                if (data[i]["Id"].toString() === value["Id"].toString()) {

                    data.splice(i, 1);
                    this.removeKey("tasks");
                    localStorage.setItem(key, JSON.stringify(data));
                    return true;
                }
            }

            return false;
        } else {

            return false;
        }
    },
    //to find the object have same  property value
    search: function (key, propertyName, propertyValue) {

        var data = localStorage.getItem(key);
        var returnData = [];

        if (data != null) {

            data = JSON.parse(data);

            for (var i = 0; i < data.length; i++) {

                if (data[i][propertyName].toString() === propertyValue.toString()) {

                    returnData.push(data[i]);
                }
            }

            if (returnData.length > 0)
                return returnData;
            else return;
        } else return;
    },
    //fetch data of the specific key
    getKeyData: function (key) {

        var data = localStorage.getItem(key);

        if (data != null) {

            return JSON.parse(data);
        } else {

            return data;
        }
    },
    //remove specific key from the local-storage
    removeKey: function (key) {
        localStorage.removeItem(key);
    }
};

//validating the user login
function validateUser() {

    if (Utility.getKeyData("login") == null) {

        location.href = "login.html";
    }
}

//to logout user from the application
function logout() {
    localStorage.removeItem("login");
    location.reload(true);
}


function RefreshPage() {
    location.reload(true);
}

