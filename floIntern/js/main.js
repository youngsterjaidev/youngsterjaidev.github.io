//== Main.ts ==//
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Declaring all the selectors
let _rootElement = document.getElementById("root");
let _searchForm = document.getElementById("searchForm");
let _searchInput = document.getElementById("searchInput");
const main = () => {
    // get all the users list
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
    class Card extends HTMLElement {
        constructor() {
            super();
            this.shadow = this.attachShadow({ mode: "open" });
        }
        openPop() {
            return __awaiter(this, void 0, void 0, function* () {
                let detail = this.shadow.querySelector("#transaction");
                let content = this.shadow.getElementById("content");
                let searchNav = this.shadow.getElementById("searchNav");
                let isOpen = detail.style.display === "block";
                if (isOpen) {
                    detail.style.display = "none";
                }
                else {
                    detail.style.display = "block";
                    let isReady = false;
                    searchNav.disabled = !isReady;
                    content.innerHTML = `
                        <h1 style="text-align: center;">Wait a sec !</h1> 
                    `;
                    try {
                        /* uri is always be a string */
                        let uri = `https://ranchimallflo.duckdns.org/api/v1.0/getFloAddressTransactions?floAddress=${this.floid}`;
                        /* It will be a response */
                        let res = yield fetch(uri);
                        /* get the json data from the response */
                        let data = yield res.json();
                        console.log(data);
                        content.innerHTML = ``;
                        if (data.result === "error") {
                            content.innerHTML = `<div style="text-align: center;">${data.description}</div>`;
                        }
                        if (data.result === 'ok') {
                            Object.keys(data.transactions).map((index) => {
                                let { parsedFloData } = data.transactions[index];
                                const li = document.createElement("li");
                                li.innerHTML = `
                            <li style="margin: 1em 0em;">
                                <div>${parsedFloData.flodata}</div>
                                <div style="
                                    background:#ffb6b6;
                                    color: #000;
                                    padding: 0.2em 0.4em;
                                    border-radius: 5px;
                                ">FThgnJLcuStugLc24FJQggmp2WgaZjrBSn - ${this.floid}</div>
                                <div style="color: green; margin: 0.5em 0em;">RS. ${parsedFloData.tokenAmount}.00</div>
                            </li>
                        `;
                                content.appendChild(li);
                            });
                        }
                    }
                    catch (e) {
                        // ERROR HANDLING
                        console.log("Error Occured while fetching the User Data : ", e);
                    }
                }
            });
        }
        connectedCallback() {
            // get the template
            const template = document.querySelector("template");
            /* node will always be document fragment */
            const node = document.importNode(template.content, true);
            // Attach node to the Shadow DOM of element
            this.shadow.appendChild(node);
            /* Container will be a HTML Element */
            let container = this.shadow.querySelector(".container");
            // setting the info to the shadow DOM of element
            this.shadow.getElementById("floId").innerText = this.flousername;
            this.shadow.getElementById("floUserName").innerText = this.floid;
            // settting click event listener on the element
            container.addEventListener("click", this.openPop.bind(this));
        }
    }
    customElements.define("my-card", Card);
    floUserList.forEach(i => {
        let card = document.createElement("my-card");
        card.floid = i.floId;
        card.flousername = i.floUserName;
        _rootElement.appendChild(card);
    });
    const searchName = (e) => {
        // Prevent from page loading
        let floName = e.target.value;
        // clear the list
        _rootElement.innerHTML = "";
        // show the loading indicator
        _rootElement.innerHTML = "<h1>Loading</h1>";
        const result = floUserList.filter((user) => {
            let newUserName = user.floUserName.slice(0, floName.length);
            return newUserName.toLowerCase() === floName.toLowerCase();
        });
        // clear the Loading
        _rootElement.innerHTML = "";
        if (result.length === 0) {
            floUserList.forEach(i => {
                let card = document.createElement("my-card");
                card.floid = i.floId;
                card.flousername = i.floUserName;
                console.log(card);
                _rootElement.appendChild(card);
            });
        }
        else {
            result.forEach(i => {
                let card = document.createElement("my-card");
                card.floid = i.floId;
                card.flousername = i.floUserName;
                console.log(card);
                _rootElement.appendChild(card);
            });
        }
    };
    // set the input Event Listener
    _searchInput.addEventListener("input", searchName);
};
// call the main function
main();
