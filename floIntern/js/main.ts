type Path = {
    current: string;
    printPath: () => void;
};

const main = (ready: boolean): void => {
    if (ready) {

        document.body.addEventListener("keydown", e => {
            if (e.key === "/") {
                e.preventDefault()
                searchWrapper.classList.add("open");
                let el = document.getElementById("input")
                el.focusIn()
            }
        })

        let _input: HTMLInputElement = document.querySelector("#input");
        let _backBtn: HTMLElement = document.querySelector("#logo");
        let home: HTMLElement = document.getElementById("home");
        let searchToggle: HTMLElement = document.getElementById("searchToggle");
        let searchOverlay: HTMLElement = document.querySelector(
            ".search-overlay"
        );
        let searchWrapper: HTMLElement = document.querySelector(
            ".search-wrapper"
        );
        let _getTemplate: HTMLElement = document.getElementById("myTemplate")
        let _cardTemplate: HTMLElement = document.getElementById("cardTemplate")

        let internRating = {};

        function getDate(time: number): string {
            let stringTime = time + "000";
            let newTime = new Date(+stringTime).toDateString();
            return newTime;
        }

        searchToggle.addEventListener("click", () => {
            searchWrapper.classList.add("open");
            _input.focus();
        });

        searchOverlay.addEventListener("click", () => {
            searchWrapper.classList.remove("open");
        });

        /**
         * On changing the search input
         * - Update the DOM and fill the result
         * - if there is nothing set all the element to the DOM
         */
        _input.addEventListener("input", (e: HashChangeEvent) => {
            let val = e.target.value;
            window.location.hash = "";


            if (finalList.length !== 0) {
                const list = finalList.filter((element): boolean => {
                    let newUserName: string = element.name.slice(0, val.length);
                    return newUserName.toLowerCase() === val.toLowerCase();
                });

                if (list.length) {
                    _rootDiv.innerHTML = renderList(list)
                } else {
                    _rootDiv.innerHTML = renderList(finalList)
                }
            } else {
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

        const receiverList: any[] = [];

        const internList: any[] = [];

        let finalList: any[] = [];

        customElements.define(
            "my-card",
            class MyCard extends HTMLElement {
                displayUsername: HTMLElement;
                displayUserId: HTMLElement;

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

                attributeChangedCallback(name, oldValue, newValue) {
                    if (oldValue !== newValue && this.displayUsername) {
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
                    this.displayUsername = this.shadowRoot.querySelector(
                        ".username"
                    );
                    this.displayUserId = this.shadowRoot.querySelector(
                        ".userid"
                    );

                    this.shadowRoot
                        .querySelector("span")
                        .addEventListener("click", (e) => {
                            // back to the home page
                            window.location.hash = "";
                            _rootDiv.innerHTML = renderList();
                        });
                }

                // render the element to the DOM
                render(): string {
                    if (finalList.length) {
                        let el: HTMLDivElement = document.createElement("div");

                        let backBtn = document.createElement("div");
                        let username = document.createElement("h2");
                        let floId = document.createElement("h3");
                        let projectName = document.createElement("h4");
                        let profile = document.createElement("div");
                        let totalMoneyEarned = document.createElement("div");
                        let totalNumberOfTransaction = document.createElement(
                            "div"
                        );

                        const myResult = finalList.filter((l) => {
                            return this.userid.slice(1) === l.floId;
                        });

                        myResult.forEach((r) => {
                            let txData = document.createElement("ul");
                            let red = document.createElement("span");
                            let totalAmount: number = 0;

                            profile.classList.add("profile");
                            username.innerText = r.name;
                            floId.innerText = this.userid.slice(1);
                            projectName.innerText = `Project - ${r.projectName || "Intern Inactive"
                                }`;
                            totalNumberOfTransaction.innerText = `Total Number of transactions - ${r.transactions.length}`;
                            username.style.textAlign = "left";
                            red.innerHTML = "&#8249;";
                            backBtn.classList.add("back-btn");
                            backBtn.append(red);

                            if (r.transactions.length) {
                                r.transactions.forEach((t) => {
                                    let amount = t.transaction.floData.match(
                                        /([0-9]+)/
                                    );
                                    let num = Number(amount[0]);
                                    let senderAddress =
                                        t.transaction.vin[0].addr;
                                    let time = getDate(t.transaction.time);
                                    let li = document.createElement("li");
                                    li.style.margin = "1em 0em";
                                    totalAmount += num;
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
                            } else {
                                let li = document.createElement("div");
                                li.innerText = "No Transaction Found";
                                txData.appendChild(li);
                            }

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

                                a {
                                    padding: 1em 0em;
                                    color: #64b5f6;
                                }

                                .profile {
                                    width: 50px;
                                    height: 50px;
                                    background: #64b5f6;
                                    border-radius: 50%;
                                    margin-bottom: 1em;
                                }

                                .back-btn {
                                    background: rgba(var(--background-color), 1);
                                    position: sticky;
                                    top: 0;
                                    z-index: 2;
                                }

                                span {
                                    font-size: 4em;
                                    display: flex;
                                    align-items: center;
                                    cursor: pointer;
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
                            //el.appendChild(backBtn);
                            el.appendChild(styling);
                            //el.appendChild(profile);
                            el.appendChild(username);
                            el.appendChild(floId);
                            el.appendChild(projectName);
                            el.appendChild(totalMoneyEarned);
                            el.appendChild(totalNumberOfTransaction);
                            el.appendChild(txData);
                        });

                        return el.innerHTML;
                    }
                }
            }
        );

        let path = {
            current: window.location.hash || "#",
            printPath: () => {
                console.log("The current Path", this.current);
            },
        };

        const _rootDiv: HTMLElement = document.getElementById("uInfo");

        // render all the list of the use on to the DOM
        /*function renderList() {

            if (finalList.length !== 0) {
                let el: HTMLDivElement = document.createElement("div");
                let heading: HTMLHeadElement = document.createElement("h2");
                heading.innerText = "RanchiMall Internship Blockchain Contract";
                heading.style.textAlign = "center";
                heading.style.width = "100%";
                heading.style.padding = "2em 0.5em";

                el.appendChild(heading);

                for (let i of finalList) {
                    let card: HTMLAnchorElement = document.createElement("div");
                    let link = document.createElement("a");

                    link.innerText =
                        i.transactions[0].transaction.blockChainLink;
                    link.href = i.transactions[0].transaction.blockChainLink;
                    link.target = "_blank";
                    link.style.marginTop = "0em";

                    card.classList.add("card");
                    card.href = `#${i.floId}`;
                    let amount = i.transactions[0].transaction.floData.match(
                        /([0-9]+)/
                    );
                    card.innerHTML = `
                        <a href="#${i.floId}" style="position: relative;">
                        <div class="profile"></div>
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                        <h5>Total amount paid: ₹${i.totalMoneyEarned}</h5>
                        <h5>Total no. of transaction: ${i.transactions.length
                        }</h5>
                        <div class="last-tx">
                            <div>Last transaction </div>
                            <div class="last-tx-content">
                                <div>${getDate(
                            i.transactions[0].transaction.time
                        )}</div>
                                <div style="font-size: 2em; padding: 0.5em 0em;">₹${amount[0]
                        }</div>
                            </div>
                        </div>
                        <div>${internRating[i.floId]}</div>
                        </a>
                        <div style="margin: 0.5em 0em;">View last payment blockchain</div>
                        <a target="_blank" href="${i.transactions[0].transaction.blockChainLink
                        }">${i.transactions[0].transaction.blockChainLink}</a>
                    `;
                    el.appendChild(card);
                }
                return el.innerHTML;
            } else {
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
        }*/

        function renderList(data) {
            // check if the finallist have any length
            if(data.length !== 0) {
                // get the template from the DOM
                // get the deep copy the template
                let node = _getTemplate.content.cloneNode(true);

                for (let i of data) {
                    let amount = i.transactions[0].transaction.floData.match(/([0-9]+)/);
                    //
                    let cardNode = _cardTemplate.content.cloneNode(true);
                    cardNode.querySelector(".link").href = `#${i.floId}`
                    cardNode.querySelector(".heading-name").textContent = i.name
                    cardNode.querySelector(".heading-floId").textContent = i.floId
                    cardNode.querySelector(".total-money-earned").textContent = `Total amount paid: ₹${i.totalMoneyEarned}`
                    cardNode.querySelector(".number-of-transaction").textContent = `Total number of transactions: ${i.transactions.length}`
                    cardNode.querySelector(".last-tx-content").textContent = getDate(i.transactions[0].transaction.time)
                    cardNode.querySelector(".last-tx-amount").textContent = `₹${amount[0]}/-`
                    cardNode.querySelector(".intern-rating").textContent = internRating[i.floId]
                    cardNode.querySelector(".blockchain-link").href = i.transactions[0].transaction.blockChainLink
                    node.querySelector(".card-wrapper").appendChild(cardNode)
                }

                let el = document.createElement("div")
                el.appendChild(node)
                console.log(el.innerHTML)
                return el.innerHTML 
            } else {
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
            "#": renderList(finalList),
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
                _rootDiv.innerHTML = renderList(finalList);
            } else {
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
        _rootDiv.innerHTML = renderList(finalList);

        // Go the home page
        _backBtn.addEventListener("click", () => {
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
        async function getInternData(): Promise<void> {
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

                if (r) {
                    console.log("intern Data from the server ", r);
                    let i = floGlobals.appObjects.RIBC.internList;

                    for (let key in i) {
                        internList.push({
                            floId: key,
                            floUserName: i[key],
                        });

                    }

                    // fetch all the data and pack together
                    fetchInternData();
                }
            } catch (e) {
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


                // if it exists
                if (index > -1) {
                    finalList[index].projectName = tragetList[key].projectName;
                }
            }

            for (let index of finalList) {
                let totalAmount: number = 0;
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
                let totalAmount: number = 0;
                list.transactions.forEach((intern) => {
                    let amount = intern.transaction.floData.match(/([0-9]+)/);
                    let num = Number(amount[0]);

                    totalAmount += num;
                    // add the blockChainLink key
                    //intern.transaction.blockChainLink = `https://livenet.flocha.in/block/${intern.transaction.blockhash}`;
                    intern.transaction.blockChainLink = `https://livenet.flocha.in/tx/${intern.transaction.txid}`;
                });

                const transactionsDetails = list.transactions.sort(
                    (first, second) => {
                        return second.transaction.time - first.transaction.time;
                    }
                );

                list.totalMoneyEarned = totalAmount;
                list.transactions = transactionsDetails;
            });


            const myArr = finalList.sort((first, second) => {
                return (
                    second.transactions[0].transaction.time -
                    first.transactions[0].transaction.time
                );
            });

            finalList = myArr;
        }

        // get the internData after the 3sec I don't know why
        setTimeout(() => {
            getInternData();
        }, 1000);

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
                    // loop over the response transactions
                    r.forEach((user) => {
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

                    // re-render the DOM
                    _rootDiv.innerHTML = renderList(finalList);
                }, console.error);
        }
    }
};
