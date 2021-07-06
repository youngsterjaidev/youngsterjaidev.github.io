//== Main.ts ==//
// Declaring all the selectors
var _rootElement = document.getElementById("root");
var _searchForm = document.getElementById("searchForm");
var _searchInput = document.getElementById("searchInput");
var main = function () {
    // get all the users list
    var floUserList = [
        {
            floUserName: "Aakriti Sinha",
            floId: "FKa43RxHUAdJbgV6KipQ4PvXi6Kgw4HmFn",
            project: "Product Launch and Blockchain Marketing"
        },
        {
            floUserName: "Shambhavi",
            floId: "FK96PZh4NskoJfWoyqcvLpSo7YnTLWMmdD",
            project: "Product Launch and Blockchain Marketing"
        },
        {
            floUserName: "Salomi Sarkar",
            floId: "F7HVKrF68Y6YKE9XXpHhAcxt6MwRLcUD67",
            project: "Product Launch and Blockchain Marketing"
        },
        {
            floUserName: "Megha Rani",
            floId: "FEvLovuDjWo4pXX3Y4SKDh8sq1AxJzqz9Z",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Kriti Shreya",
            floId: "F8zYh6rCuorGmnMtqGFpaKGeBqQaj9WVtG",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Rashi Sanghvi",
            floId: "FHWXdnjRRJErqazye4Y9MRmE42D4Bp6Bj7",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Muskan Shoundik",
            floId: "FSdjJCJdU43a1dyWY6dRES1ekoupEjFPqQ",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Gunjan Kumar Ranjan",
            floId: "FCTGD4M3DvMKupX3j2y5f3cQNDD9i6LUp7",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Rakhijeet Singh",
            floId: "FCqLr9nymnbh7ahta1gGC78z634y4GHJGQ",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Madhu Verma",
            floId: "F765ofUHBhfXhvzrSgnPjvCvJXXCpoW6be",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Shruti Kashyap",
            floId: "FPtrQK6aSCgFeSNpzC68YTznHPfiz7CCvW",
            project: "P2P Content Collaboration"
        },
        {
            floUserName: "Shivam Kumar Pandey",
            floId: "FJK9EDGhKj4Wr2zeCo3zRPXCNU6CXFFQAN",
            project: "JavaScript Development for Blockchain Products"
        },
        {
            floUserName: "Abhijeet Anand",
            floId: "FEHKFxQxycsxw2qQQSn2Y1BCT6Mfb8EMko",
            project: "JavaScript Development for Blockchain Products"
        },
        {
            floUserName: "Ritika Agrawal",
            floId: "FFaB6N1ETZsykXVS2PdM5xhj5BBoqsfsXC",
            project: "JavaScript Development for Blockchain Products"
        },
        {
            floUserName: "Jai Dev",
            floId: "FFoVnVMJv8BTfbk7ij9T5jPHs7VKSz886A",
            project: "JavaScript Development for Blockchain Products"
        }
    ];
    var renderUserLisit = function () {
        // render the users in DOM for first load
        for (var i = 0; i < floUserList.length; i++) {
            // destructure the keys 
            var _a = floUserList[i], floId = _a.floId, floUserName = _a.floUserName, project = _a.project;
            // creating the html ELement
            var el = document.createElement("a");
            el.href = "/intern.html/?" + floId;
            el.innerHTML = "\n            <div class=\"card-heading\">" + floUserName + "</div>\n            <div>" + floId + "</div>\n            <div>" + project + "</div>\n        ";
            // add the styling to the Element
            el.className = "card";
            // add the element to the root
            _rootElement.appendChild(el);
        }
    };
    /**
     * create a card list with the given list
     */
    var generateCard = function (list) {
        for (var i = 0; i < list.length; i++) {
            // destructure all the keys
            var _a = list[i], floUserName = _a.floUserName, floId = _a.floId, project = _a.project;
            var el = document.createElement("a");
            // stye the element
            el.className = "card";
            // fill the values in it
            el.innerHTML = "\n            <div class=\"card-heading\">" + floUserName + "</div>\n            <div>" + floId + "</div>\n            <div>" + project + "</div>\n        ";
            _rootElement.appendChild(el);
        }
    };
    // search function
    var searchName = function (e) {
        // Prevent from page loading
        var floName = e.target.value;
        // clear the list
        _rootElement.innerHTML = "";
        // show the loading indicator
        _rootElement.innerHTML = "<h1>Loading</h1>";
        var result = floUserList.filter(function (user) {
            var newUserName = user.floUserName.slice(0, floName.length);
            return newUserName === floName;
        });
        // clear the Loading
        _rootElement.innerHTML = "";
        if (result.length === 0) {
            // clear all the search result
            renderUserLisit();
        }
        else {
            // fill the info the element
            generateCard(result);
        }
    };
    _searchInput.addEventListener("input", searchName);
    // set the data of the flo user list
    renderUserLisit();
};
// call the main function
main();
