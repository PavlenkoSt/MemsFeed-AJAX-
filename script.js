const mems = document.querySelector('#mems');
const categories = document.querySelector('#categories');
const addForm = document.querySelector('#add');

let checkboxes;

let start = 0;
let contin = '1';
let scrollRequest = true;

function deleteCategories() {
    if (document.querySelector('.delCatBtn')) {
        const delCatBtn = document.querySelectorAll('.delCatBtn');
        const deleteCategory = document.querySelector('#deleteCategory');
        delCatBtn.forEach(btn => btn.addEventListener('click', function () {
            const id = this.dataset.category;
            deleteCategory.setAttribute('data-cat', id);
        }));
        deleteCategory.addEventListener('click', function () {
            const id = this.dataset.cat;
            fetch('/ajax/categories.php?del=' + id)
                .then(() => {
                    toasty('Категория успешно удалена!');
                    getCategories();
                    adminForm();
                })
                .then(() => {
                    mems.innerHTML = '';
                    start = 0;
                    contin = '1';
                })
        });
    }
}
function addCategories() {
    if (document.querySelector('#addCatForm')) {
        const addCatForm = document.querySelector('#addCatForm');
        addCatForm.addEventListener('submit', function (event) {
            let data = new FormData(this);
            fetch('/ajax/categories.php',
                {
                    method: 'POST',
                    body: data
                })
                .then(() => {
                    toasty('Категория успешно добавлена!');
                    getCategories();
                    adminForm();
                })
            event.preventDefault();
        });
    }

}

function deleteMem() {
    if (document.querySelector('#deleteMem-btn')) {
        const delBtns = document.querySelectorAll('#deleteMem-btn');
        delBtns.forEach(btn => btn.addEventListener('click', function () {
            let id = this.dataset.del;

            fetch('/ajax?del=' + id)
                .then(() => {
                    toasty('Мем успешно удален!');
                    this.parentElement.remove();
                })
        }));
    }
}

function toasty(message) {
    const addToast = document.querySelector('#addToast');
    const options = {
        animation: true,
        delay: 2000
    };
    const toastEl = new bootstrap.Toast(addToast, options);
    const body = document.querySelector('.toast-body');
    body.innerHTML = message;
    toastEl.show();
}

function addNewMemForm() {
    if (isAdmin()) {
        const form = document.querySelector('#addNewMem');
        form.addEventListener('submit', function (event) {
            let data = new FormData(this);
            fetch('/ajax/admin/addMem.php', {
                method: 'POST',
                body: data
            })
                .then(() => {
                    toasty('Мем успешно добавлен!');
                    form.querySelector('[name=url]').value = '';
                    mems.innerHTML = '';
                    start = 0;
                    contin = '1';
                    resetFeed();
                })
            event.preventDefault();
        })
    }
}

function adminForm() {
    if (isAdmin()) {
        fetch('/ajax/admin/addMem.php')
            .then(response => response.text())
            .then(text => {
                addForm.innerHTML = text;
                addNewMemForm();
            })
    } else {
        addForm.innerHTML = '';
    }
}
function restartContent() {
    mems.innerHTML = '';
    start = 0;
    contin = '1';
    adminForm();
    resetFeed();
}
function sessionAdminAdd() {
    sessionStorage.setItem('admin', 'true');
}
function isAdmin() {
    return sessionStorage.getItem('admin');
}
function sessionAdminEnd() {
    sessionStorage.removeItem('admin');
}

function adminLogout() {
    const parent = document.querySelector('#adminPar');

    parent.innerHTML = '<p class="text-light m-0">Вы в системе как админ!</p>  <button class="btn btn-light align-self-center small p-1" id="admin-logout">Выйти</button>';
    parent.classList.add('flex-column');

    const logoutBtn = document.querySelector('#admin-logout');

    logoutBtn.addEventListener('click', function () {
        parent.innerHTML = '<button class="btn btn-light align-self-center small p-1" id="admin-btn">Вход для админа</button>';
        sessionAdminEnd();
        adminEnterBtn();
        restartContent();
        getCategories();
    });
}

function adminValidate(value, parent) {
    let data = new FormData();
    data.set('pass', value);

    fetch('/ajax/admin/', {
        method: 'POST',
        body: data
    })
        .then(response => response.text())
        .then(text => {
            if (text == 'yes') {
                adminLogout();
                sessionAdminAdd();
                restartContent();
                getCategories();
            } else {
                parent.innerHTML = ' <button class="btn btn-light align-self-center small p-1  ml-3" id="admin-btn">Вход для админа</button>';
                adminEnterBtn();
            }
        })
}

function adminEnterBtn() {
    if (isAdmin()) {
        adminLogout();
    } else {
        const adminBtn = document.querySelector('#admin-btn');
        adminBtn.addEventListener('click', function () {

            let parentEl = this.parentElement;
            parentEl.innerHTML = '<div class="form-floating"><input type = "password" class="form-control" id = "adminPass" placeholder = "Пароль"><label for="adminPass">Пароль</label></div>';
            const adminInput = document.querySelector('#adminPass');
            adminInput.focus();

            adminInput.addEventListener('keydown', function (event) {
                if (event.key == 'Enter') {
                    adminValidate(this.value, parentEl)
                }
            })
        });
    }
}

function like() {
    const likeBtns = document.querySelectorAll('.like-btn');
    likeBtns.forEach(el => el.addEventListener('click', function () {
        let id = this.dataset.id;

        fetch('/ajax?likeId=' + id)
            .then(() => this.innerHTML = (+this.textContent + 1) + ' <span><img style="width: 30px" src="ajax/elems/smiling.svg" alt=""></span>');
    }));
}
function resetFeed() {
    let noChecked = [];
    checkboxes.forEach(el => {
        if (!el.checked) {
            let id = el.getAttribute('id');
            noChecked.push(id);
        }
    });
    if (noChecked.length) {
        getMemes(noChecked);
    } else {
        getMemes();
    }
}
function getCategories() {
    let admin = '';
    if (isAdmin()) {
        admin = '?admin=1';
    }
    fetch('/ajax/categories.php' + admin)
        .then(Response => Response.text())
        .then(text => {
            categories.innerHTML = text;
            checkboxes = document.querySelectorAll('.form-check-input');

            checkboxes.forEach(box => box.addEventListener('change', function () {
                restartContent();
            }));
            addCategories();
            deleteCategories();
        });
}

function getMemes(noChecked = '') {
    if (contin == '1') {
        console.log('request');
        let str = '';
        if (noChecked) {
            str = '&noCat=' + JSON.stringify(noChecked);
        }
        let admin = '';
        if (isAdmin()) {
            admin = '&admin=1';
        }
        fetch('/ajax?start=' + start + str + admin)
            .then(Response => Response.text())
            .then(text => {
                if (text != '0') {
                    contin = '1';
                    mems.innerHTML += text;
                    start += 3;
                    scrollRequest = true;
                    like();
                    deleteMem();
                } else {
                    contin = '0';
                }
            });
    }
}

window.addEventListener('scroll', function () {
    if (scrollRequest) {
        let scrollBot = window.innerHeight + window.scrollY;
        if (scrollBot > document.body.clientHeight - 200) {
            scrollRequest = false;
            resetFeed();
        }
    }
});

getMemes();
getCategories();
adminEnterBtn();
adminForm();


