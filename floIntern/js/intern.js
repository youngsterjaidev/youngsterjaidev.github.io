//== Intern ==//
const intern = () => {
    console.log("intern");
    let data;
    let userData;
    let presentScroll = 0;
    let _rootElement = document.getElementById("root");
    let _profileElement = document.getElementById("profile");
    let _nav = document.querySelector("nav");
    window.onscroll = ((e) => {
        if (window.scrollY > presentScroll) {
            presentScroll = window.scrollY;
            console.log(presentScroll, window.pageYOffset);
            if (document.body.scrollHeight === presentScroll) {
                presentScroll = 0;
                console.log("last", presentScroll);
            }
        }
        return;
    });
    // get the params
    let floId = window.location.search.slice(1);
    // Add User info
    const renderUserInfo = () => {
        _profileElement.innerHTML = "";
        // get the user Info from the server
        // set the data into a local variable
        userData = {
            floUserName: "Aakriti Sinha",
            floId: "FKa43RxHUAdJbgV6KipQ4PvXi6Kgw4HmFn",
            project: "Product Launch and Blockchain Marketing"
        };
        let { floId, floUserName, project } = userData;
        // creating the element 
        let el = document.createElement("div");
        // fill the HTML in the Element 
        el.innerHTML = `
            <div>
                <div>${floUserName}</div> 
                <div>${floId}</div> 
            </div> 
        `;
        // style the element
        // attach to profile section in the DOM
        _profileElement.append(el);
    };
    // render the parsedFloData 
    const renderParsedFloData = (parsedFloData) => {
        let { flodata, tokenAmount, tokenIdentification, type, transferType } = parsedFloData;
        // create a element
        let el = document.createElement("div");
        el.innerHTML = `
            <div class="card">
                <div class="card-col one">
                    <div>${flodata}</div> 
                    <div>${transferType}</div> 
                    <div>${tokenIdentification}</div> 
                    <div>${type}</div> 
                </div>
                <div class="card-col two">Rs. ${tokenAmount}.00</div> 
            </div>
        `;
        _rootElement.appendChild(el);
    };
    // get all the data of the floId
    const fetchUserInfo = async () => {
        try {
            let uri = `https://ranchimallflo.duckdns.org/api/v1.0/getFloAddressTransactions?floAddress=FKa43RxHUAdJbgV6KipQ4PvXi6Kgw4HmFn`;
            let res = await fetch(uri);
            data = await res.json();
            console.log(data);
            _rootElement.innerHTML = "";
            if (data.result === 'ok') {
                Object.keys(data.transactions).map((index) => {
                    let { parsedFloData, transactionDetails } = data.transactions[index];
                    // renderUserInfo()
                    renderParsedFloData(parsedFloData);
                });
            }
        }
        catch (e) {
            // ERROR HANDLING
            console.log("Error Occured while fetching the User Data : ", e);
        }
    };
    fetchUserInfo();
};
intern();
