$(() => {
    updateHead();
})
function updateHead() {
    var headHtml;
    $('#head').empty();
    if (sessionStorage.getItem("name") == undefined) {
        headHtml = `
                <button id="loginButton" class="btn btn-success float-right" onclick=login()>Login</button>
                <input type="text" id="userInput" class="float-right">
                `;
    } else {
        headHtml = `
                <h2>Welcome ${sessionStorage.getItem('name')}</h2>
                <button id="logoutButton" class="btn btn-danger float-right" onclick=logout()>Logout</button>
                <a href="/cart.html" id="" class="btn btn-info float-left">checkout</a>`
        refreshProductList();
    }
    $('#head').append(headHtml);
}



function refreshProductList() {
    $('#productTable').empty();
    $.get('/products', (data) => {
        // console.log(data);
        var htmlToAdd = '';
        var serialNo = 1;
        for (product of data.data) {
            htmlToAdd += `
            <tr>
                <td>${serialNo++}</td>
                <td>${product.vendor.name}</td>
                <td>${product.cost}</td>
                <td>${product.id}</td>
                <td>${product.name}</td>
               <td><input type="number" min="0" id="num"></td>
                <!-- <td id="tot"></td> -->
                <td><i class="fa fa-plus-circle" onclick="addToCart(event)"></i></td>
            </tr>`;
        }
        $('#productTable').append(htmlToAdd);
        $("#num123").on("change paste keyup", function () {
            var h = $(this)
            console.log(h[0].parentElement.parentElement.childNodes);
            var costOfOne = h[0].parentElement.parentElement.childNodes[5].innerText;
            var totol = h[0].parentElement.parentElement.childNodes[11];
            var price = parseInt(costOfOne) * parseInt(h.val());
            console.log(costOfOne)
            console.log(price)
            totol.innerText = price;
        });
    })
}
login = () => {
    if ($('#userInput').val() == null || $('#userInput').val() == '') {
        alert('Name is required!');
    } else {
        $.post('/users', {
            name: $('#userInput').val()
        }, (data) => {
            sessionStorage.setItem('name', $('#userInput').val())
            sessionStorage.setItem('id', data.userId)
            updateHead();
        })
    }
}
logout = () => {
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('id')
    updateHead();
    $('#productTable').empty();
}

function addToCart(event) {
    // console.log(event.target.parentElement.parentElement.childNodes)
    var perCost = event.target.parentElement.parentElement.childNodes[5].innerText;
    var prodId = event.target.parentElement.parentElement.childNodes[7].innerText;
    var quant = event.target.parentElement.parentElement.childNodes[11].childNodes[0].value;
    var quantity = quant;
    var usrId = sessionStorage.getItem('id');
    var totalcost = quant * perCost;
    // console.log(totalcost)
    $.post('/carts', {
        quantity: quantity,
        cost: totalcost,
        userId: usrId,
        productId: prodId
    },
        (data) => {
            if (data.success) {
                alert('Product added');
            } else {
                alert(`Can't add`)
            }
        })
}