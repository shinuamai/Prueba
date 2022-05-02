// MATEMASK
const ethereumButton = document.querySelector('.enableEthereumButton');
const showAccount = document.querySelector('.showAccount');

ethereumButton.addEventListener('click', () => {
  getAccount();
});
function connect() {
    console.log("si sirve", window.ethereum, window.web3)
    getAccount();
}
async function getAccount() {
  const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
  const account = accounts[0];
  showAccount.innerHTML = account;
}
// CONTRACT
function save() {
    let url = 'https://api.opensea.io/api/v1/asset_contract/'+document.getElementById("url").value;
    fetch(url)
        .then(response => response.json())
        .then(info => show(info))
        .catch(error => console.log(error))

    const show = (info) => {
        let body = ''
        body = `<tr>
            <td>${info.name}</td>
            <td>${info.address}</td>
            <td>${info.created_date}</td>
            <td>${info.description}</td>
            <td><img src="${info.collection.banner_image_url}" width="70%"></td>
        </tr>`
        document.getElementById('data').innerHTML = body
    }
}

function contract(id) {
    var option = document.getElementById(id);
    if (option.style.display == "none")
        option.style.display = "block";
    else
        option.style.display = "none";
}

const options = {
    method: "GET"
}; 
