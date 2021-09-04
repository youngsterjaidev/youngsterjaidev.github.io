const main = (ready) => {
    if (ready) {
        console.log("JS On Fire");
        let _input = document.querySelector("#input");
        let _logo = document.getElementById("logo");
        let searchToggle = document.getElementById("searchToggle");
        let searchOverlay = document.querySelector(".search-overlay");
        let searchWrapper = document.querySelector(".search-wrapper");
        let internRating = {};
        function getDate(time) {
            let stringTime = time + "000";
            let newTime = new Date(+stringTime).toDateString();
            return newTime;
        }
        searchToggle.addEventListener("click", e => {
            searchWrapper.classList.add('open');
            _input.focus();
        });
        searchOverlay.addEventListener("click", e => {
            searchWrapper.classList.remove('open');
        });
        _input.addEventListener("input", (e) => {
            let val = e.target.value;
            window.location.hash = "";
            console.log(val);
            if (finalList.length !== 0) {
                const list = finalList.filter((element) => {
                    let newUserName = element.name.slice(0, val.length);
                    return newUserName.toLowerCase() === val.toLowerCase();
                });
                console.log(list);
                if (list.length) {
                    // ...
                    let el = document.createElement("div");
                    for (let i of list) {
                        let card = document.createElement("a");
                        card.classList.add("card");
                        card.href = `#${i.floId}`;
                        card.innerHTML = `
                        <div class="profile"></div>
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                        <h5>Total Amount Paid: ₹${i.totalMoneyEarned}</h5>
                        <h5>Total No. of transaction: ${i.transactions.length}</h5>
                        <div class="last-tx">
                            <div>Last transaction </div>
                            <div class="last-tx-content">
                                <div>${getDate(i.transactions[0].transaction.time)}</div>
                                <div>${i.transactions[0].transaction.floData}</div>
                            </div>
                        </div>
                        <div>${internRating[i.floId]}</div>
                    `;
                        el.appendChild(card);
                    }
                    _rootDiv.innerHTML = el.innerHTML;
                }
                else {
                    let el = document.createElement("div");
                    for (let i of finalList) {
                        let card = document.createElement("a");
                        card.classList.add("card");
                        card.href = `#${i.floId}`;
                        card.innerHTML = `
                        <div class="profile"></div>
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                        <h5>Total Amount Paid: ₹${i.totalMoneyEarned}</h5>
                        <h5>Total No. of transaction: ${i.transactions.length}</h5>
                        <div class="last-tx">
                            <div>Last transaction </div>
                            <div class="last-tx-content">
                                <div>${getDate(i.transactions[0].transaction.time)}</div>
                                <div>${i.transactions[0].transaction.floData}</div>
                            </div>
                        </div>
                        <div>${internRating[i.floId]}</div>
                    `;
                        el.appendChild(card);
                    }
                    _rootDiv.innerHTML = el.innerHTML;
                }
            }
            else {
                return `
                        <h1 style="
                            text-align: center;
                            width: 100%;
                            display: grid;
                            place-items: center;
                            height: 50vh;
                        ">Loading...</h1>
                    `;
            }
        });
        // intern Data "const internList = []"
        //
        // Data from distributer "const distributerData = []"
        //
        // filter the transaction of interns from the distributer
        const receiverList = [];
        const internList = [];
        const finalList = [];
        customElements.define("my-card", class MyCard extends HTMLElement {
            displayUsername;
            displayUserId;
            // look all the value we have to look on change
            static get observedAttributes() {
                return ["username", "userid"];
            }
            constructor() {
                super();
                // attach the shadow DOM
                this.attachShadow({ mode: "open" });
            }
            get username() {
                return this.getAttribute("username");
            }
            get userid() {
                return this.getAttribute("userid");
            }
            set username(val) {
                this.setAttribute("username", val);
            }
            set userid(val) {
                this.setAttribute("userid", val);
            }
            async fetchTokenInfo() {
                console.log(this.userid);
                try {
                    let r = await fetch(`https://ranchimallflo.duckdns.org/api/v1.0/getFloAddressDetails?floAddress=${this.userid.slice(1)}`);
                    console.log(r);
                }
                catch (e) {
                    console.log("Error Occured ", e);
                }
            }
            attributeChangedCallback(name, oldValue, newValue) {
                if (oldValue !== newValue && this.displayUsername) {
                    console.log("----------", this.userid);
                    this.displayUsername.innerText = this.username;
                    this.displayUserId.innerText = this.userid;
                }
            }
            // run when the element attached to the DOM
            connectedCallback() {
                const template = document.createElement("template");
                template.innerHTML = this.render();
                const node = document.importNode(template.content, true);
                this.shadowRoot.append(node);
                // select the element from the shadow DOM and set the value
                this.displayUsername = this.shadowRoot.querySelector(".username");
                this.displayUserId = this.shadowRoot.querySelector(".userid");
                this.fetchTokenInfo();
            }
            // render the element to the DOM
            render() {
                if (finalList.length) {
                    let el = document.createElement("div");
                    console.log(this.userid.slice(1));
                    const myResult = finalList.filter((l) => {
                        return this.userid.slice(1) === l.floId;
                    });
                    console.log(myResult);
                    myResult.forEach((r) => {
                        let username = document.createElement("h2");
                        let floId = document.createElement("h3");
                        let projectName = document.createElement("h4");
                        let profile = document.createElement("div");
                        let totalMoneyEarned = document.createElement("div");
                        let totalNumberOfTransaction = document.createElement("div");
                        profile.classList.add("profile");
                        username.innerText = r.name;
                        floId.innerText = this.userid.slice(1);
                        projectName.innerText = `Project - ${r.projectName || "Intern Inactive"}`;
                        totalNumberOfTransaction.innerText = `Total Number of transactions - ${r.transactions.length}`;
                        username.style.textAlign = "left";
                        let txData = document.createElement("ul");
                        let totalAmount = 0;
                        if (r.transactions.length) {
                            r.transactions.forEach((t) => {
                                let li = document.createElement("li");
                                li.style.margin = "1em 0em";
                                let amount = t.transaction.floData.match(/([0-9]+)/);
                                let num = Number(amount[0]);
                                console.log(num);
                                totalAmount += num;
                                let senderAddress = t.transaction.vin[0].addr;
                                let time = getDate(t.transaction.time);
                                li.innerHTML = `
                                    <div class="card">
                                        <div>₹${amount[0]}/-</div>
                                        <div>${time}</div>
                                        <h3>Transaction Detail</h3>
                                        <div>Message - ${t.transaction.floData}</div>
                                        <div>Sent from - RanchiMall Distribution Address "${senderAddress}"</div>
                                        <a target="_blank" href="${t.transaction.blockChainLink}">${t.transaction.blockChainLink}</a>
                                    </div>
                                `;
                                txData.appendChild(li);
                            });
                        }
                        else {
                            let li = document.createElement("div");
                            li.innerText = "No Transaction Found";
                            txData.appendChild(li);
                        }
                        console.log(totalAmount);
                        totalMoneyEarned.classList.add("totalAmount");
                        totalMoneyEarned.innerHTML = `
                                <div>₹${totalAmount}</div>
                                <div style="font-size: xx-small; text-align: right;">Total Amount Paid</div>
                            `;
                        let styling = document.createElement("style");
                        styling.innerHTML = `
                                * { box-sizing: border-box; }

                                ul {
                                    padding: 0em;
                                    list-style-type: none;
                                }

                                h4 {
                                    margin-bottom: 2.5em;
                                }

                                h5 {
                                    margin: 1em 0em;
                                }

                                .profile {
                                    width: 50px;
                                    height: 50px;
                                    background: #64b5f6;
                                    border-radius: 50%;
                                    margin-bottom: 1em;
                                }

                                .totalAmount {
                                    position: absolute;
                                    top: 1em;
                                    right: 1em;
                                    font-size: 1.5em;
                                }

                                .card {
                                    padding: 1.5rem;
                                    display: flex;
                                    flex-direction: column;
                                    position: relative;
                                    width: 100%;
                                    min-width: 20rem;
                                    border-radius: 0.5rem;
                                    flex: 1 0;
                                    background-color: rgba(var(--text-color), 0.06);
                                }

                                .card > div:nth-of-type(1) {
                                    margin: 0.5em 0em;
                                    font-size: 3.5em;
                                }

                                .card > div:nth-of-type(2) {
                                    position: absolute;
                                    right: 1em;
                                    top: 1em;
                                    width: max-content;
                                    background: rgba(var(--background-color), 1);
                                    padding: 0.4em;
                                    border-radius: 0.5rem;
                                }
                            `;
                        el.appendChild(styling);
                        el.appendChild(profile);
                        el.appendChild(username);
                        el.appendChild(floId);
                        el.appendChild(projectName);
                        el.appendChild(totalMoneyEarned);
                        el.appendChild(totalNumberOfTransaction);
                        el.appendChild(txData);
                    });
                    console.log(el);
                    return el.innerHTML;
                }
            }
        });
        let path = {
            current: window.location.hash || "#",
            printPath: () => {
                console.log("The current Path", this.current);
            },
        };
        const _rootDiv = document.getElementById("uInfo");
        // render all the list of the use on to the DOM
        function renderList() {
            console.log("==============", receiverList.length);
            if (finalList.length !== 0) {
                let el = document.createElement("div");
                for (let i of finalList) {
                    console.log(i.transactions[i.transactions.length - 1]);
                    let card = document.createElement("a");
                    card.classList.add("card");
                    card.href = `#${i.floId}`;
                    card.innerHTML = `
                        <div class="profile"></div>
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                        <h5>Total Amount Paid: ₹${i.totalMoneyEarned}</h5>
                        <h5>Total No. of transaction: ${i.transactions.length}</h5>
                        <div class="last-tx">
                            <div>Last transaction </div>
                            <div class="last-tx-content">
                                <div>${getDate(i.transactions[0].transaction.time)}</div>
                                <div>${i.transactions[0].transaction.floData}</div>
                            </div>
                        </div>
                        <div>${internRating[i.floId]}</div>
                    `;
                    el.appendChild(card);
                }
                return el.innerHTML;
            }
            else {
                return `
                        <h1 style="
                            text-align: center;
                            width: 100%;
                            display: grid;
                            place-items: center;
                            height: 50vh;
                        ">Loading...</h1>
                    `;
            }
        }
        // render the details page
        function renderDetail() {
            return `
                <my-card username="red" style="
                    flex: 1;
                    padding: 1em;
                    position: relative;
                    " userid="${window.location.hash}"></my-card>
            `;
        }
        let routes = {
            "#": renderList(),
            "#detail": renderDetail(),
        };
        /**
         * Run when there is change of hash on the window
         * - get the first value from the routes object
         * - check the value is matching to the comming route value
         * - if so, render the home page otherwise detail page
         */
        const handleRender = (route) => {
            // ...
            let val = Object.keys(routes)[0];
            if (val === route) {
                _rootDiv.innerHTML = renderList();
                console.log(receiverList.length);
            }
            else {
                _rootDiv.innerHTML = renderDetail();
            }
        };
        // check the change in hash
        window.addEventListener("hashchange", (e) => {
            // get the current path
            path.current = window.location.hash || "#";
            /**
             * @param always be the path of the window
             */
            handleRender(path.current);
        });
        // render the home page default
        _rootDiv.innerHTML = renderList();
        // Go the home page
        _logo.addEventListener("click", () => {
            window.location.hash = "";
            _rootDiv.innerHTML = renderList();
        });
        /**
         * Creating a list in which store all the
         * flo addresses of the receiver
         */
        /**
         * get the intern data from the RanchiMall
         * - request the server for data
         * - loop over the response
         * - push the each data to the "finalList arrary"
         * - call the fetchInternData()
         */
        async function getInternData() {
            try {
                let r = await floCloudAPI.requestObjectData("RIBC", {
                    application: "RIBC",
                    receiverID: "FMeiptdJNtYQEtzyYAVNP8fjsDJ1i4EPfE",
                    senderIDs: [
                        "F7TxecSPV8oFZE6Y2giVuP8hfsqfAD6erj",
                        "FCja6sLv58e3RMy41T5AmWyvXEWesqBCkX",
                        "FPFeL5PXzW9bGosUjQYCxTHSMHidnygvvd",
                        "FS4jMAcSimRMrhoRhk5cjuJERS2otiwq4A",
                        "FU2fkubqGD5ynbr7qhvaPe9DPqrNdGB6mw",
                        "FUkY9k9mVVxPzYA8uUGxUuLVH6CB83Nb9r",
                    ],
                });
                console.log("Inter: ", r);
                if (r) {
                    console.log("intern Data from the server ", r);
                    let i = floGlobals.appObjects.RIBC.internList;
                    for (let key in i) {
                        internList.push({
                            floId: key,
                            floUserName: i[key],
                        });
                        console.table(i);
                    }
                    // fetch all the data and pack together
                    fetchInternData();
                }
            }
            catch (e) {
                // ERROR HANDLING
                console.log("Error Occur while fetching the Intern Data", e);
                _rootDiv.innerHTML = `
                    <div style="flex: 1; padding: 1em;">
                        <h1>Something Went Wrong [keep Refreshing the page ...]</h1>
                        <p style="color: red;">${e}</p>
                    </div>
                `;
            }
        }
        function bundleAllData() {
            // get the internList from the server
            let internList = floGlobals.appObjects.RIBC.internList;
            internRating = floGlobals.appObjects.RIBC.internRating;
            // get the intern Assigned project from the server
            // get the value of internAssigned project
            let internsAssigned = floGlobals.appObjects.RIBC.internsAssigned;
            const internsAssignedArr = Object.entries(internsAssigned);
            // get the project details from the server
            let projectDetails = floGlobals.appObjects.RIBC.projectDetails;
            // set the tragetList
            let tragetList = [];
            // loop over the intern data
            for (let internId in internList) {
                // loop over the intern assigned project so we get the
                // associated projects
                for (let [k, v] of internsAssignedArr) {
                    // find the value have correct key
                    let value = v.find((el) => {
                        return el === internId;
                    });
                    // if we find a value find its project Details also
                    if (value) {
                        // loop over the project details
                        for (let i in projectDetails) {
                            // find out the key by the slicing it
                            let key = k.slice(0, 14);
                            // get the value
                            let newVal = projectDetails[key];
                            // send it ot targetList
                            tragetList.push({
                                internId: internId,
                                project: k,
                                projectName: newVal.projectName,
                            });
                        }
                    }
                }
            }
            // loop over to the finalList to attach the projectName
            for (let key in tragetList) {
                // get the internId from the tragetList
                let val = tragetList[key].internId;
                // get the index out of that
                let index = finalList.findIndex((el) => el.floId === val);
                console.log("++++++++++++++", index, val);
                // if it exists
                if (index > -1) {
                    finalList[index].projectName = tragetList[key].projectName;
                }
            }
            for (let index of finalList) {
                let totalAmount = 0;
                /*finalList[index].transactions.forEach((intern) => {
                    let amount = intern.transaction.floData.match(/([0-9]+)/);
                    let num = Number(amount[0]);
                    totalAmount += num;
                });
                finalList[index].totalMoneyEarned = totalAmount;*/
            }
            /**
             * Loop over the final List to get the totalAmount
             */
            finalList.forEach((list) => {
                let totalAmount = 0;
                list.transactions.forEach((intern) => {
                    let amount = intern.transaction.floData.match(/([0-9]+)/);
                    let num = Number(amount[0]);
                    totalAmount += num;
                    // add the blockChainLink key
                    intern.transaction.blockChainLink = `https://livenet.flocha.in/block/${intern.transaction.blockhash}`;
                });
                list.totalMoneyEarned = totalAmount;
            });
            console.log("red", finalList);
        }
        // get the internData after the 3sec I don't know why
        setTimeout(() => {
            getInternData();
        }, 3000);
        /**
         * Fetch initial transactions
         * - request the distributer transactions from  the server
         * - push all these transactions to the "receiverList array"
         * - then loop over to the interList array in which we collect interns data
         * - filter out the transactions of the intern from the distributer transactions
         * - push all the data to the new called finalList array
         * - render the home page to the DOM
         */
        function fetchInternData() {
            floBlockchainAPI
                .readAllTxs("FThgnJLcuStugLc24FJQggmp2WgaZjrBSn", "", "")
                .then((r) => {
                console.log(r);
                // loop over the response transactions
                r.forEach((user) => {
                    console.log(user);
                    // sending all the transaction to the new array
                    receiverList.push({
                        floId: user.vout[0].scriptPubKey.addresses[0],
                        transaction: user,
                    });
                });
                // loop over the intern data
                for (let d of internList) {
                    // filter the intern transactions
                    const result = receiverList.filter((i) => {
                        return i.floId === d.floId;
                    });
                    // check if the transaction are available
                    if (result.length) {
                        // add all the transaction to the new Array
                        finalList.push({
                            name: d.floUserName,
                            floId: d.floId,
                            transactions: [...result],
                        });
                    }
                }
                bundleAllData();
                console.table(finalList);
                // re-render the DOM
                _rootDiv.innerHTML = renderList();
            }, console.error);
        }
    }
};
