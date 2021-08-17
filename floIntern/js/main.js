((ready) => {
    if (ready) {
        console.log("JS On Fire");

        let _input = document.querySelector("#input");

        _input.addEventListener("input", (e) => {
            let val = e.target.value;

            console.log(val);

            if (finalList.length !== 0) {
                const list = finalList.filter((element) => {
                    let newUserName = element.name.slice(0, val.length);
                    return newUserName.toLowerCase() === val.toLowerCase();
                });

                console.log(list);

                if (list.length) {
                    //
                    let el = document.createElement("div");
                    for (let i of list) {
                        let card = document.createElement("a");
                        card.classList.add("card");
                        card.href = `#${i.floId}`;
                        card.innerHTML = `
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                    `;
                        el.appendChild(card);
                    }
                    _rootDiv.innerHTML = el.innerHTML;
                } else {
                    let el = document.createElement("div");
                    for (let i of finalList) {
                        let card = document.createElement("a");
                        card.classList.add("card");
                        card.href = `#${i.floId}`;
                        card.innerHTML = `
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                    `;
                        el.appendChild(card);
                    }
                    _rootDiv.innerHTML = el.innerHTML;
                }
            } else {
                return `<div>Loading</div>`;
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

        customElements.define(
            "my-card",
            class MyCard extends HTMLElement {
                static get observedAttributes() {
                    return ["username", "userid"];
                }

                constructor() {
                    super();
                    // attach the shadow DO
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
                    console.log(this.userid)
                    try {
                    let r = await fetch(`https://ranchimallflo.duckdns.org/api/v1.0/getFloAddressDetails?floAddress=${this.userid.slice(1)}`)

                    console.log(r)
                    } catch(e) {
                        console.log("Error Occured ", e)
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
                    this.displayUsername = this.shadowRoot.querySelector(
                        ".username"
                    );
                    this.displayUserId = this.shadowRoot.querySelector(
                        ".userid"
                    );

                    this.fetchTokenInfo()
                }

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
                            username.innerText = r.name;
                            username.style.textAlign = "center";
                            let txData = document.createElement("ul");
                            if(r.transactions.length) {
                            r.transactions.forEach((t) => {
                                let li = document.createElement("li");
                                li.style.margin = "1em 0em";
                                li.innerText = t.transaction.floData;
                                txData.appendChild(li);
                            });
                            } else {
                                let li = document.createElement("div");
                                li.innerText = "No Transaction Found"
                                txData.appendChild(li);
                            }
                            el.appendChild(username);
                            el.appendChild(txData);
                        });

                        console.log(el);

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

        const _rootDiv = document.getElementById("uInfo");

        function renderList() {
            console.log("==============", receiverList.length);
            if (finalList.length !== 0) {
                let el = document.createElement("div");
                for (let i of finalList) {
                    let card = document.createElement("a");
                    card.classList.add("card");
                    card.href = `#${i.floId}`;
                    card.innerHTML = `
                        <h3>${i.name}</h3>
                        <h5>${i.floId}</h5>
                    `;
                    el.appendChild(card);
                }
                return el.innerHTML;
            } else {
                return `<div>Loading</div>`;
            }
        }

        function renderDetail() {
            return `
                <my-card username="red" style="flex: 1;" userid="${window.location.hash}"></my-card>
            `;
        }

        let routes = {
            "#": renderList(),
            "#detail": renderDetail(),
        };

        // run the function when change the has change
        const handleRender = (route) => {
            // ...
            let val = Object.keys(routes)[0];
            if (val === route) {
                _rootDiv.innerHTML = renderList();
                console.log(receiverList.length);
            } else {
                _rootDiv.innerHTML = renderDetail();
            }
        };

        window.addEventListener("hashchange", (e) => {
            path.current = window.location.hash || "#";

            handleRender(path.current);
        });

        _rootDiv.innerHTML = renderList();

        /**
         * Creating a list in which store all the
         * flo addresses of the receiver
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

                console.log("Inter: ", r)

                if (r) {
                    console.log("intern Data from the server ", r);
                    let i = floGlobals.appObjects.RIBC.internList 
                    for (let key in i) {

                        internList.push({
                            floId: key,
                            floUserName: i[key],
                        });

                        console.table(i)
                    }

                    fetchInternData();
                }
            } catch (e) {
                console.log("Error Occur while fetching the Intern Data", e);
                _rootDiv.innerHTML = `
                    <div style="flex: 1; padding: 1em;">
                        <h1>[keep Refreshing the page ...]</h1>
                        <p style="color: red;">${e}</p>
                    </div>
                `
            }
        }

        setTimeout(() => {
            getInternData();
        }, 3000);

        function fetchInternData() {
            floBlockchainAPI
                .readAllTxs("FThgnJLcuStugLc24FJQggmp2WgaZjrBSn", "", "")
                .then((r) => {
                    console.log(r);
                    r.forEach((user) => {
                        console.log(user);
                        receiverList.push({
                            floId: user.vout[0].scriptPubKey.addresses[0],
                            transaction: user,
                        });
                    });

                    for (let d of internList) {
                        const result = receiverList.filter((i) => {
                            return i.floId === d.floId;
                        });

                        finalList.push({
                            name: d.floUserName,
                            floId: d.floId,
                            transactions: [...result],
                        });
                    }

                    console.table(finalList);

                    _rootDiv.innerHTML = renderList();
                }, console.error);
        }
    }
})(true);
