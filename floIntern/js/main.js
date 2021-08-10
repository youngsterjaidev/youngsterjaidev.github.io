((ready) => {
    if (ready) {
        console.log("JS On Fire");

        // intern Data "const internList = []"
        //
        // Data from distributer "const distributerData = []"
        //
        // filter the transaction of interns from the distributer

        const receiverList = [];

        const internList = [
            {
                floUserName: "Aakriti Sinha",
                floId: "FKa43RxHUAdJbgV6KipQ4PvXi6Kgw4HmFn",
                project: "Product Launch and Blockchain Marketing",
            },
            {
                floUserName: "Shambhavi",
                floId: "FK96PZh4NskoJfWoyqcvLpSo7YnTLWMmdD",
                project: "Product Launch and Blockchain Marketing",
            },
            {
                floUserName: "Salomi Sarkar",
                floId: "F7HVKrF68Y6YKE9XXpHhAcxt6MwRLcUD67",
                project: "Product Launch and Blockchain Marketing",
            },
            {
                floUserName: "Megha Rani",
                floId: "FEvLovuDjWo4pXX3Y4SKDh8sq1AxJzqz9Z",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Kriti Shreya",
                floId: "F8zYh6rCuorGmnMtqGFpaKGeBqQaj9WVtG",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Rashi Sanghvi",
                floId: "FHWXdnjRRJErqazye4Y9MRmE42D4Bp6Bj7",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Muskan Shoundik",
                floId: "FSdjJCJdU43a1dyWY6dRES1ekoupEjFPqQ",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Gunjan Kumar Ranjan",
                floId: "FCTGD4M3DvMKupX3j2y5f3cQNDD9i6LUp7",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Rakhijeet Singh",
                floId: "FCqLr9nymnbh7ahta1gGC78z634y4GHJGQ",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Madhu Verma",
                floId: "F765ofUHBhfXhvzrSgnPjvCvJXXCpoW6be",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Shruti Kashyap",
                floId: "FPtrQK6aSCgFeSNpzC68YTznHPfiz7CCvW",
                project: "P2P Content Collaboration",
            },
            {
                floUserName: "Shivam Kumar Pandey",
                floId: "FJK9EDGhKj4Wr2zeCo3zRPXCNU6CXFFQAN",
                project: "JavaScript Development for Blockchain Products",
            },
            {
                floUserName: "Abhijeet Anand",
                floId: "FEHKFxQxycsxw2qQQSn2Y1BCT6Mfb8EMko",
                project: "JavaScript Development for Blockchain Products",
            },
            {
                floUserName: "Ritika Agrawal",
                floId: "FFaB6N1ETZsykXVS2PdM5xhj5BBoqsfsXC",
                project: "JavaScript Development for Blockchain Products",
            },
            {
                floUserName: "Jai Dev",
                floId: "FFoVnVMJv8BTfbk7ij9T5jPHs7VKSz886A",
                project: "JavaScript Development for Blockchain Products",
            },
        ];

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
                }

                render() {
                    if (finalList.length) {
                        let el = document.createElement("div")

                        console.log(this.userid.slice(1))

                        const myResult = finalList.filter(l => {
                            return this.userid.slice(1) === l.floId
                        })

                        console.log(myResult)

                        myResult.forEach(r => {
                            let username = document.createElement("h3")
                            username.innerText = r.name
                            let txData = document.createElement("div")
                            r.transactions.forEach(t => {
                                let li = document.createElement("div")
                                li.innerText = t.transaction.floData
                                txData.appendChild(li)
                            })
                            el.appendChild(username)
                            el.appendChild(txData)
                        })

                        console.log(el)

                        return el.innerHTML
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
                        <h3>${i.floId}</h3>
                        <h4>${i.name}</h4>
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
                <my-card username="red" userid="${window.location.hash}"></my-card>
            `;
        }

        const indexPage = `
            <div class="card">
                <h3>Flo User Name</h3>
                <h3>Flo Id</h3>
                <h3>Project</h3>
            </div>
        `;
        const detailPage = `
            <h1>Detail Page</h1>
            <my-card username="John" userId="378478234fhdjfh"></my-card>
        `;

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

                console.log(finalList);

                _rootDiv.innerHTML = renderList();
            }, console.error);
    }
})(true);
