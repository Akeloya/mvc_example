const emailCheck = function (inputEmail) {
    const pattern = "/^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i";
    if (!inputEmail)
        return false;
    console.log('email')
    console.log(inputEmail.search(pattern));
    return inputEmail.search(pattern) >= 0;
};
const dateCheck = function (inputValue) {
    const pattern = "/(\d\d\.){2}\d{4}$/i";
    if (!inputValue)
        return false;
    console.log('date');
    console.log(inputValue.search(pattern));
    return inputValue.search(pattern) >= 0;
}


window.addEventListener('load', function () {
    getRequests();
    fillAppOnForm();
    $('#showNewForm').on('click', function () {
        $('#newRequestModal').show();
    });
    $('#closeModal').on('click', hideModal);
    $('.close').on('click', hideModal);
    $('#submitModal').on('click', submitData);
    $(function () {
        $("#requestDate").datepicker({ dateFormat: 'dd.mm.yy' });
    });
});
function getRequests() {
    $.get('/api/requests').then(function (requests) {
        let rows = document.querySelector("tbody");
        requests.forEach(function (request) {
            rows.appendChild(requestRow(request));
        });
    });
}

function requestRow(request) {
    const tr = document.createElement('tr');
    tr.setAttribute("data-rowid", request.id);

    td = document.createElement('td');
    td.innerHTML = request.title;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = request.applicationId;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = '<a href="mailto:' + request.email + '">' + request.email + '</a>';
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = new Date(request.reqCompleteDate).toLocaleDateString();
    tr.appendChild(td);

    return tr;
}

function hideModal() {
    $('#newRequestModal').hide();
}

function submitData() {
    let formValid = true;
    if (!emailCheck($('#requestEmail').val())) {
        $('#requestEmail').addClass('is-invalid');
        formValid = false;
    }
    else {
        $('#requestEmail').removeClass('is-invalid');
    }

    if (!dateCheck($('#requestDate').val())) {
        $('#requestDate').addClass('is-invalid');
        formValid = false;
    }
    else {
        $('#requestDate').removeClass('is-invalid');
    }
    if (!formValid)
        return;
    $.post('api/requests', {
        title: $('#requestTitle').val(),
        email: $('#requestEmail').val(),
        applicationId: $('#requestApp').val(),
        reqCompleteDate: $('#requestDate').val(),
        description: $('#requestDesc').val()
    }).then(function (request) {
        let rows = document.querySelector("tbody");
        rows.appendChild(requestRow(request));
        $('.form-control').val('');
    });
    hideModal();
}

function fillAppOnForm() {
    let select = $("#requestApp");
    $.get('api/applications').then(function (apps) {
        apps.forEach(function (app) {
            select.append('<option value="' + app.id + '">' + app.title + '</option>');
        });
    });
}