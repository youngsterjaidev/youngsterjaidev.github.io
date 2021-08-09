((ready) => {
    if (ready) {
        console.log("JS On Fire");
        
        const receiverList = [];

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
                    return `
                    <style>
                        .username {
                            color: red;
                        }

                        .userid {
                            color: green;
                        }
                    </style>
                    <div class="card">
                        <h3 class="username">${this.username || "Not Set"}</h3>
                        <h3 class="userid">${this.userid || "Not set"}</h3>
                    </div>
                `;
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
            console.log("==============", receiverList.length)
            if(receiverList.length !== 0) {
                let el = document.createElement("div")
                for(let i of receiverList) {
                    let card = document.createElement("a")
                    card.classList.add("card")
                    card.href=`#${i.floId}`
                    card.innerHTML = `
                        <h3>${i.floId}</h3>
                        <h4>${i.message}</h4>
                    `
                    el.appendChild(card)
                }
                return el.innerHTML
            } else {
                return `<div>Loading</div>`
            }
        }

        function renderDetail() {
            return `
                <my-card username="red" userid="${window.location.hash}"></my-card>
            `
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
            "#detail": renderDetail()
        };


        // run the function when change the has change
        const handleRender = (route) => {
            // ...
            let val = Object.keys(routes)[0];
            if (val === route) {
                _rootDiv.innerHTML = renderList()
                console.log(receiverList.length)
            } else {
                _rootDiv.innerHTML = renderDetail()
            }
        };

        window.addEventListener("hashchange", (e) => {
            path.current = window.location.hash || "#";

            handleRender(path.current);
        });

        _rootDiv.innerHTML = renderList()

        /**
         * Creating a list in which store all the
         * flo addresses of the receiver
         */

        floBlockchainAPI
            .readAllTxs("FThgnJLcuStugLc24FJQggmp2WgaZjrBSn", "", "")
            .then((r) => {
                console.log(r);
                r.forEach((user) => {
                    console.log(user)
                    receiverList.push({
                        floId: user.vout[0].scriptPubKey.addresses[0],
                        message: user.floData
                    });
                });
                _rootDiv.innerHTML = renderList()
            }, console.error);
    }
})(true);
