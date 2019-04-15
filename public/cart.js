$(() => {

    refreshList();
    var wel = document.getElementById('welc')
    if (sessionStorage.getItem('name') != undefined){
        wel.innerText = 'Welcome ' + sessionStorage.getItem('name');
        $('#logout').prop('hidden',false)
    }
    $('#logout').click(()=>{
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
        location.href = '/';
    })



})

function deleteItem(event,id){
    console.log(id);
    $.ajax({
        url: '/carts',
        type: 'DELETE',
        data: { "id": id },
        success: (successData) => {
            console.log(successData)
            if (successData.success) {
                refreshList();
            }
        }
    });
}

function refreshList(){
    $('#cartTable').empty();
    $('#tCost').empty();
    $.get('/carts/'+sessionStorage.getItem('id'),(data)=>{
        if(data.data.length!=0){
            console.log(data)
            var htmlContent;
            var TotalCost = 0;
            for(product of data.data){
                htmlContent += `
                <tr>
                    <td>${product.product.name}</td>
                    <td>${product.product.vendor.name}</td>
                    <td>${product.quantity}</td>
                    <td>${product.cost}</td>
                    <td><button class="btn btn-danger" onclick='deleteItem(event,${product.product.id})'>
                        Del
                    </button></td>
                </tr>
                `;
                TotalCost += product.cost;
            }
            $('#cartTable').append(htmlContent);
            costHtml = `<h5 class="float-right">Total: <em>${TotalCost}</em></h5>`
            $('#tCost').append(costHtml);
        }else {
            $('#cartDiv').append(`No database .Please go back and buy something`);
        }
    })
}
