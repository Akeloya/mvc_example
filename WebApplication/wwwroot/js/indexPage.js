const emailCheck = function (inputEmail) {
    const pattern = /^[a-z0-9_-]+@[a-z0-9-]+\.[a-z]{2,6}$/i;
    if (!inputEmail)
        return false;
    return inputEmail.search(pattern) >= 0;
};
const dateCheck = function (inputValue) {
    const pattern = /(\d{2}\.){2}\d{4}/i;
    if (!inputValue)
        return false;
    return inputValue.search(pattern) >= 0;
}

var requestsData;
var apps;
var totalPages = 1;
var currentPage = 1;

window.addEventListener('load', function () {
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

function fillAppOnForm() {
    let select = $("#requestApp");
    $.get('api/applications').then(function (apps) {
        appsData = apps;
        apps.forEach(function (app) {
            select.append('<option value="' + app.id + '">' + app.title + '</option>');
        });
        getRequests();
    });
}

function getRequests() {
    $.get('/api/requests').then(function (requests) {
        requestsData = requests;
        totalPages = Math.round(requests.length / 10);
        if (requests.length / 10 > totalPages)
            totalPages += 1;
        fillPagination();
        changePage(currentPage);
    });
}

function requestRow(request) {
    const tr = document.createElement('tr');
    tr.setAttribute("data-rowid", request.id);

    td = document.createElement('td');
    td.innerHTML = request.title;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = appsData.filter(function (data) {
        return data.id == request.applicationId;
    })[0].title;
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = '<a href="mailto:' + request.email + '">' + request.email + '</a>';
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = new Date(request.reqCompleteDate).toLocaleDateString();
    tr.appendChild(td);

    td = document.createElement('td');
    td.innerHTML = request.description;
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
    if (formValid)
        formValid = $("input[required]").val().length > 0;
    if (!formValid)
        return;
    $.post('api/requests', {
        title: $('#requestTitle').val(),
        email: $('#requestEmail').val(),
        applicationId: $('#requestApp').val(),
        reqCompleteDate: $('#requestDate').val(),
        description: $('#requestDesc').val()
    }).then(function (request) {
        requestsData.push(request);
        changePage(currentPage);
        $('.form-control').val('');
    });
    hideModal();
}

function fillPagination() {
    let pagination = $('.pagination');
    let prevButton = $('<li class="page-item"><a class="page-link" href="#">Сюда</a></li>');
    prevButton.on('click', goPrev);
    pagination.append(prevButton);
    for (var i = 1; i <= totalPages; i++) {
        let somePageButton = $('<li class="page-item" pageNum="' + i + '"><a class="page-link" href="#">' + i + '</a></li>');
        somePageButton.on('click', gotoPage);
        pagination.append(somePageButton);
    }
    let nextButton = $('<li class="page-item"><a class="page-link" href="#">Туда</a></li>');
    nextButton.on('click', goNext);
    pagination.append(nextButton);
}

function goPrev() {
    if (currentPage > 1)
        currentPage -= 1;
    changePage(currentPage);
}

function goNext() {
    if (currentPage <= totalPages)
        currentPage += 1;
    changePage(currentPage);
}

function gotoPage(pageNav) {
    currentPage = Number(pageNav.currentTarget.getAttribute("pagenum"));
    changePage(currentPage);
}

function changePage(page) {
    let table = document.querySelector('tbody');
    table.innerHTML = '';
    requestsData.forEach(function (row, index) {
        if (index > (page - 1) * 10 && index < page * 10)
            table.appendChild(requestRow(row));
    });
}