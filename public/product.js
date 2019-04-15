$(() => {
    refreshList();
    $('#addButton').click(() => {
        const vendorIdValue = $('#listOfVendor').val();
        $.post('/products', {
            name: $('#productName').val(),
            cost: $('#productCost').val(),
            vendorId: $('#listOfVendor').val()
        }, (data) => {
            if (data.success) {
                refreshList();
            } else {
                alert('error while adding vendor. Try Again!')
            }
        })
    }
    )
})



function refreshList() {
    $('#productList').empty();
    $('#productTablebody').empty();
    $.get('/products', (data) => {
        if (data.success) {
            var dataList = data.data;
            var addTable = ' ';
            var index = 1;
            for (product of dataList) {
                addTable += `<tr>
                    <td>${index++}</td>
                    <td>${product.name}</td>
                    <td>${product.vendor.name}</td>
                    <td>${product.cost}</td>
                    <td><button onclick=delClicked(${ product.id})>Del</button></td>
                    </tr>
                `;
            }
            $('#productTablebody').append(addTable);
        } else {
            $('#productList').append(` No Database is present`)
        }
    })
}

$.get('/vendors', (data) => {
    var selectList = document.createElement('select');
    selectList.setAttribute("id", "listOfVendor")
    selectList.append(new Option('Select a vendor', '0'))
    if (data.success) {
        for (vendor of data.data) {
            selectList.append(new Option(vendor.name, vendor.id))
        }
        $('#selectList').append(selectList)
    }
})


function delClicked(id) {
    // console.log(id)
    $.ajax({
        url: '/products',
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