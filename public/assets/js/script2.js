function save() {
    let url = 'https://api.opensea.io/api/v1/asset/' + document.getElementById("url").value + '/' + document.getElementById("number").value + '/';
    fetch(url)
        .then(response => response.json())
        .then(info => show(info))// show(info)
        .catch(error => console.log(error))

    const show = (info) => {
        let ide
        ide = info.id
        document.getElementById('ide').innerHTML = ide
        let token
        var cont = 0
        for (let i = 0; i < info.collection.payment_tokens.length; i++) {
            cont++
        }
        token = cont
        document.getElementById('data').innerHTML = token
        let body
        body = `<tr><td>Name</td><td>${info.name}</td></tr>
        <tr><td>Address</td><td>${info.asset_contract.address}</td></tr>
        <tr><td>Date</td><td>${info.asset_contract.created_date}</td></tr>
        <tr><td>Description</td><td>${info.asset_contract.description}</td></tr>
        <tr><td>Image</td><td><img src="${info.collection.banner_image_url}" width="20%"></td></tr>`
        document.getElementById('body').innerHTML = body
        let status
        status = `<tr><td>One day sales</td><td>${info.collection.stats.one_day_sales}</td></tr>
        <tr><td>Seven day sales</td><td>${info.collection.stats.seven_day_sales}</td></tr>
        <tr><td>Thrity day sales</td><td>${info.collection.stats.thirty_day_sales}</td></tr>
        <tr><td>Total sales</td><td>${info.collection.stats.total_sales}</td></tr> `
        document.getElementById('status').innerHTML = status

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
