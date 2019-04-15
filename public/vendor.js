$(() => {
    var addButton = $('#vendorSubmit');
    var vendorName = $('#vendorText');
    var vendorList = $('#vendorList');
    function refreshList() {
        vendorList.empty();
        $.get('/vendors', (data) => {
            if (data.success) {
                var dataList = data.data;
                for (vendor of dataList) {
                    var delButton = document.createElement('button');
                    var list = document.createElement('li');
                    var vendorSpan = document.createElement('span');
                    vendorSpan.innerText = vendor.name;
                    delButton.innerText = 'Delete';
                    delButton.onclick = ((event) => {
                        $.ajax({
                            url: '/vendors',
                            type: 'DELETE',
                            data: { "name": event.target.parentElement.childNodes[1].innerText },
                            success: (successData) => {
                                if (successData.success) {
                                    refreshList();
                                }
                            }
                        });
                    })
                    list.appendChild(delButton);
                    list.appendChild(vendorSpan)
                    vendorList[0].appendChild(list);
                }
            } else {
                vendorList[0].innerHTML = `<h3>No database</h3>`;
            }

        })
    }

    refreshList();
    addButton.click(() => {
        $.post('/vendors', {
            name: vendorName.val()
        },
            (data) => {
                if (data.success) {
                    refreshList();
                } else {
                    alert('error while adding vendor. Try Again!')
                }
            })
    })
})
