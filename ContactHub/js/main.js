var contactNameInput = document.getElementById("fullName");
var contactNumberInput = document.getElementById("phoneNumber");
var contactEmailInput = document.getElementById("emailAddress");
var contactAddressInput = document.getElementById("Address");
var contactGroupInput = document.getElementById("Group");
var contactNotesInput = document.getElementById("Notes");
var contactImageInput = document.getElementById("change-photo");
var contactFavInput = document.getElementById("fav");
var contactEmargInput = document.getElementById("emarg");

var indexUpdate;

var searchInput = document.getElementById("searcInput");

var allContacts = JSON.parse(localStorage.getItem("allContacts")) || [];

// ---------- Validation ----------
var nameRegex = /^[A-Za-z\u0600-\u06FF\s]{3,30}$/;
var egyptPhoneRegex = /^01[0125][0-9]{8}$/;
var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateContact() {
  var name = contactNameInput.value.trim();
  var number = contactNumberInput.value.trim();
  var email = contactEmailInput.value.trim();

  if (!nameRegex.test(name)) {
    Swal.fire(
      "Invalid Name",
      "Name must be at least 3 letters (no numbers or symbols).",
      "error",
    );
    return false;
  }

  if (!egyptPhoneRegex.test(number)) {
    Swal.fire(
      "Invalid Phone Number",
      "Enter a valid Egyptian number, e.g. 01012345678.",
      "error",
    );
    return false;
  }

  if (email && !emailRegex.test(email)) {
    Swal.fire(
      "Invalid Email",
      "Enter a valid email address, e.g. name@example.com.",
      "error",
    );
    return false;
  }

  return true;
}

// ---------- Initial render ----------
displayContacts(toIndexed(allContacts));

// ---------- Form helpers ----------
function resetForm() {
  indexUpdate = undefined;
  contactNameInput.value = "";
  contactNumberInput.value = "";
  contactEmailInput.value = "";
  contactAddressInput.value = "";
  contactGroupInput.value = "select-group";
  contactNotesInput.value = "";
  contactFavInput.checked = false;
  contactEmargInput.checked = false;
  contactImageInput.value = "";
}

function toIndexed(arr) {
  return arr.map(function (contact, index) {
    return { contact: contact, index: index };
  });
}

// ---------- CRUD ----------
function addContact() {
  var contact = {
    name: contactNameInput.value,
    number: contactNumberInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    fav: contactFavInput.checked,
    emarg: contactEmargInput.checked,
    img: contactImageInput.files[0]?.name
      ? `images/${contactImageInput.files[0].name}`
      : "images/contact-image.jpg",
  };

  allContacts.push(contact);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));

  displayContacts(toIndexed(allContacts));
}

function displayContacts(arr) {
  var htmlMarkup = "";

  for (var i = 0; i < arr.length; i++) {
    var c = arr[i].contact;
    var realIndex = arr[i].index;

    htmlMarkup += `           
          <div class="contact-card col-12 col-sm-6 p-2">
                            <div class="inner p-3 shadow rounded-4">
                                <div>
                                    <div class="d-flex gap-3 align-items-start">
                                        <img src="${c.img}" alt="contact image"
                                            class="rounded-4 col-12">
                                        <div>
                                            <h3 class="fs-5">${c.name}</h3>
                                            <div class="d-flex align-items-center gap-2">
                                                <div class="bg-primary bg-opacity-10 py-1 px-2 fit-content rounded-3">
                                                    <i class="fa-solid fa-phone text-primary small"></i>
                                                </div>
                                                <span class="text-secondary fw-medium">${c.number}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-envelope text-purple small"></i>
                                        </div>
                                        <span class="text-secondary">${c.email}</span>
                                    </div>
                                    <div class="pt-2 d-flex align-items-center gap-2">
                                        <div class="bg-success bg-opacity-10 p-1 px-2 rounded-2 fit-content">
                                            <i class="fa-solid fa-location-dot text-success small"></i>
                                        </div>
                                        <span class="text-secondary">${c.address}</span>
                                    </div>
                                    <div class="py-3">
                                        <div class="bg-main p-1 px-2 rounded-2 fit-content">
                                            <span class="small text-purple">${c.group}</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="border-top border-1 border-secondary border-opacity-10 pt-3">
                                    <div class="d-flex align-items-center justify-content-between">
                                        <div class="d-flex gap-3">
                                            <div class="bg-success bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-phone text-success small"></i>
                                            </div>
                                            <div class="bg-main bg-opacity-10 py-1 px-2 rounded-2 fit-content">
                                                <i class="fa-solid fa-envelope text-purple small"></i>
                                            </div>
                                        </div>
                                        <div class="d-flex gap-3 align-items-center">

                                            <button onclick="toggleFav(${realIndex})" class="border-0 bg-transparent"><i
                                                    class="fa-${c.fav ? "solid" : "regular"} fa-star ${c.fav ? "text-warning" : "text-secondary"}"></i></button>

                                            <button onclick="toggleEmarg(${realIndex})" class="border-0 bg-transparent"><i
                                                    class="fa-${c.emarg ? "solid" : "regular"} fa-heart ${c.emarg ? "text-danger" : "text-secondary"}"></i></button>

                                            <button onclick="updateContact(${realIndex})" data-bs-toggle="modal" data-bs-target="#staticBackdrop" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-pen text-secondary"></i></button>

                                            <button onclick="deleteContact(${realIndex})" class="border-0 bg-transparent"><i
                                                    class="fa-solid fa-trash text-secondary"></i></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
    `;
  }
  document.getElementById("contacts").innerHTML = htmlMarkup;

  renderSidebar(allContacts);
}

function deleteContact(index) {
  allContacts.splice(index, 1);
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  displayContacts(toIndexed(allContacts));
}

function updateContact(index) {
  indexUpdate = index;

  contactNameInput.value = allContacts[index].name;
  contactNumberInput.value = allContacts[index].number;
  contactEmailInput.value = allContacts[index].email;
  contactAddressInput.value = allContacts[index].address;
  contactGroupInput.value = allContacts[index].group;
  contactNotesInput.value = allContacts[index].notes;
  contactFavInput.checked = allContacts[index].fav;
  contactEmargInput.checked = allContacts[index].emarg;
}

function saveUpdate() {
  allContacts[indexUpdate] = {
    name: contactNameInput.value,
    number: contactNumberInput.value,
    email: contactEmailInput.value,
    address: contactAddressInput.value,
    group: contactGroupInput.value,
    notes: contactNotesInput.value,
    fav: contactFavInput.checked,
    emarg: contactEmargInput.checked,
    img: allContacts[indexUpdate].img,
  };

  if (contactImageInput.files.length > 0) {
    allContacts[indexUpdate].img = `images/${contactImageInput.files[0].name}`;
  }

  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  displayContacts(toIndexed(allContacts));
}

function saveContact() {
  if (!validateContact()) return;

  if (indexUpdate !== undefined) {
    saveUpdate();
    indexUpdate = undefined;
  } else {
    addContact();
  }

  var modalEl = document.getElementById("staticBackdrop");
  bootstrap.Modal.getInstance(modalEl).hide();
  resetForm();
}

function toggleFav(index) {
  allContacts[index].fav = !allContacts[index].fav;
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  displayContacts(toIndexed(allContacts));
}

function toggleEmarg(index) {
  allContacts[index].emarg = !allContacts[index].emarg;
  localStorage.setItem("allContacts", JSON.stringify(allContacts));
  displayContacts(toIndexed(allContacts));
}

// ---------- Sidebar (favorites / emergency / counters) ----------
function renderSidebar(arr) {
  var favMarkup = "";
  var emargMarkup = "";

  for (var i = 0; i < arr.length; i++) {
    if (arr[i].fav) {
      favMarkup += `
        <div class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
          <img src="${arr[i].img}" alt="favorite image" class="rounded-2">
          <div class="contact-info me-auto">
            <h6 class="small fw-medium m-0">${arr[i].name}</h6>
            <p class="text-secondary m-0">${arr[i].number}</p>
          </div>
          <div class="call-bg bg-success bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-phone text-success"></i>
          </div>
        </div>
      `;
    }

    if (arr[i].emarg) {
      emargMarkup += `
        <div class="contact p-2 d-flex align-items-center justify-content-between gap-2 rounded-3">
          <img src="${arr[i].img}" alt="emergency image" class="rounded-2">
          <div class="contact-info me-auto">
            <h6 class="small fw-medium m-0">${arr[i].name}</h6>
            <p class="text-secondary m-0">${arr[i].number}</p>
          </div>
          <div class="call-bg bg-danger bg-opacity-25 rounded-2 d-flex align-items-center justify-content-center">
            <i class="fa-solid fa-phone text-danger"></i>
          </div>
        </div>
      `;
    }
  }

  document.getElementById("favorite").innerHTML =
    favMarkup || `<p class="text-secondary small m-0">No favorites yet</p>`;
  document.getElementById("emarj").innerHTML =
    emargMarkup ||
    `<p class="text-secondary small m-0">No emergency contacts yet</p>`;

  document.getElementById("total").textContent = arr.length;
  document.getElementById("favorite-count").textContent = arr.filter(
    (c) => c.fav,
  ).length;
  document.getElementById("Emar-count").textContent = arr.filter(
    (c) => c.emarg,
  ).length;
}

// ---------- Search ----------
function searchContacts() {
  var query = searchInput.value.trim().toLowerCase();

  var filtered = allContacts
    .map(function (contact, index) {
      return { contact: contact, index: index };
    })
    .filter(function (item) {
      var c = item.contact;
      return (
        c.name.toLowerCase().includes(query) ||
        c.number.toLowerCase().includes(query) ||
        c.email.toLowerCase().includes(query)
      );
    });

  displayContacts(filtered);
}
