"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Defining a types
(() => {
    console.log("//== Js on Fire ==//");
    /**
     * @example
     * {
     *      floid: "John",
     *      floUserName: "4y53457384657438",
     *      project: "Anything"
     * }
     */
    const floUserList = [
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
    let _rootDiv = document.getElementById("root");
    let _backBtn = document.getElementById("back");
    let _input = document.getElementById("input");
    customElements.define("rn-card", class RnCard extends HTMLElement {
        constructor() {
            super();
            this.floid = "";
            this.flousername = "";
            this.project = "";
        }
        // check which attribute has to change
        static get observedAttributes() {
            return ['floid', 'flousername', 'project'];
        }
        // run when there is change in attributes
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                this[name] = newValue;
            }
        }
        // run when the element attached to the DOM
        connectedCallback() {
            this.innerHTML = `
                <div class="card">
                    <div></div>
                    <div>
                    <div>${this.floid}</div> 
                    <div>${this.flousername}</div> 
                    <div>${this.project}</div> 
                    </div>
                </div> 
            `;
            this.addEventListener("click", (e) => {
                window.history.pushState({
                    floid: this.floid,
                    message: "Detail Page active"
                }, "detail", window.location.origin + "/detail");
                console.log(window.location.pathname);
                _rootDiv.innerHTML = routes["/detail"];
            });
        }
    });
    customElements.define("rn-detail", class RnDetail extends HTMLElement {
        constructor() {
            super(...arguments);
            /**
             * @param id the floId of the User
             */
            this._getTransactionDetail = (id) => __awaiter(this, void 0, void 0, function* () {
                try {
                    let uri = `https://ranchimallflo.duckdns.org/api/v1.0/getFloAddressTransactions?floAddress=${id}`;
                    let res = yield fetch(uri);
                    let data = yield res.json();
                    this.render(data);
                }
                catch (e) {
                    // ERROR HANDLING
                    console.log("Error Occured while fetching the User Data : ", e);
                }
            });
        }
        // get the value of the attribute
        get data() {
            return this.hasAttribute("data");
        }
        // set the value of the attribute
        set data(val) {
            this.setAttribute("data", val);
        }
        // check which attribute has to change
        static get observedAttributes() {
            return ['data'];
        }
        // run when there is change in attributes
        attributeChangedCallback(name, oldValue, newValue) {
            if (oldValue !== newValue) {
                console.log(name, oldValue, newValue);
                this[name] = newValue;
                this.render();
            }
        }
        // run when the element attached to the DOM
        connectedCallback() {
            /**
             * Passing the floId get from the state
             */
            this._getTransactionDetail(window.history.state.floid);
            // update the render function
            this.render();
        }
        /**
         * @param data will be data of transaction details
         */
        render(data) {
            // checking if the data is present of not
            if (data) {
                // empty the element
                this.innerHTML = ``;
                // createing a new div element
                let el = document.createElement("div");
                // check the status of the result
                if (data.result === 'ok') {
                    Object.keys(data.transactions).map((index) => {
                        // get the data form the transactions
                        let { parsedFloData, transactionDetails } = data.transactions[index];
                        // set the transaction data to data attribute
                        this.setAttribute("data", parsedFloData);
                        // destructure the floData and token amount
                        // from the transaction Data
                        const { flodata, tokenAmount } = parsedFloData;
                        // create a new div element
                        let li = document.createElement("div");
                        // addding the some style by adding class
                        li.classList.add("list");
                        // fill the element
                        li.innerHTML = `
                        <div>Message: ${flodata}</div> 
                        <div><div>RS.${tokenAmount}.00/-</div></div> `;
                        // add it to the div element we created previously
                        el.appendChild(li);
                    });
                }
                // add the heading the element
                this.innerHTML = `
                    <h2 style="text-align: center;">Transaction Details</h2> 
                `;
                // add the all the complete node to element
                this.appendChild(el);
            }
            else {
                // adding the Loading status
                this.innerHTML = `
                <div style="margin-top: 8em;">
                    <h1>Loading<h1>
                </div>
            `;
            }
        }
    });
    /**
     * create a indexPage variable that can be used in router
     */
    const indexPage = document.createElement("div");
    // Iterate the user from FloUserList
    floUserList.forEach((user) => {
        // create a custom element
        let el = document.createElement("rn-card");
        // setting the attribute data to the element
        el.setAttribute("floid", user.floId);
        el.setAttribute("flousername", user.floUserName);
        el.setAttribute("project", user.project);
        // add it to the indexPage variable
        indexPage.appendChild(el);
    });
    /**
     * create a detailPage variable that can be used in router
     */
    let detailPage = `<rn-detail data="Loading"></rn-detail>`;
    /**
     * creating a router variable
     * - have key that have the path
     * - have value that is content on the Page
     * @example
     * {
     *      "/": Index,
     *      "/about": About
     * }
     */
    const routes = {
        "/": indexPage.innerHTML,
        "/detail": detailPage
    };
    /**
     * Run when there is change input value
     * - Get the input value from the event
     * - Empty the root element
     * - Add Loading Indicator
     * - Filter the floUserList and it will return
     *   new array
     * - render the data to the DOM
     */
    const _changeInput = (e) => {
        // Prevent from page loading
        let floName = e.target.value;
        // clear the list
        _rootDiv.innerHTML = "";
        // show the loading indicator
        _rootDiv.innerHTML = "<h1>Loading</h1>";
        const result = floUserList.filter((user) => {
            let newUserName = user.floUserName.slice(0, floName.length);
            return newUserName.toLowerCase() === floName.toLowerCase();
        });
        _rootDiv.innerHTML = "";
        if (result.length > 0) {
            result.forEach((user) => {
                let el = document.createElement("rn-card");
                el.setAttribute("floid", user.floId);
                el.setAttribute("flousername", user.floUserName);
                el.setAttribute("project", user.project);
                let div = document.createElement("div");
                div.appendChild(el);
                _rootDiv.appendChild(div);
            });
        }
        else {
            // ...
            let div = document.createElement("div");
            floUserList.forEach((user) => {
                let el = document.createElement("rn-card");
                el.setAttribute("floid", user.floId);
                el.setAttribute("flousername", user.floUserName);
                el.setAttribute("project", user.project);
                div.appendChild(el);
            });
            _rootDiv.innerHTML = div.innerHTML;
        }
    };
    // adding the input event to Input element
    _input.addEventListener("input", _changeInput);
    // backBtn listen for the click event
    _backBtn.addEventListener("click", e => {
        // return back the home page by pushing the history
        // with "/" route
        window.history.pushState({}, "/", window.location.origin + "/");
        // add the indexPage element to the page
        _rootDiv.innerHTML = routes["/"];
    });
    // settting the default element 
    _rootDiv.innerHTML = routes["/"];
})();
