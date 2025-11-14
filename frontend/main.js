const API_URL = "/products"; 

// Load danh sách khi mở trang
document.addEventListener("DOMContentLoaded", loadProducts);

// ========================================================
// LOAD PRODUCTS
// ========================================================
async function loadProducts() {
    const res = await fetch(API_URL);
    const products = await res.json();

    const tableBody = document.getElementById("product-table-body");
    tableBody.innerHTML = "";

    products.forEach(p => {
        tableBody.innerHTML += `
            <tr>
                <td>${p.id}</td>
                <td>${p.name}</td>
                <td>${p.price}</td>
                <td>${p.description}</td>
                <td>
                    <button class="edit-btn" onclick="editProduct(${p.id}, '${p.name}', ${p.price}, '${p.description}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct(${p.id})">Delete</button>
                </td>
            </tr>
        `;
    });
}

// ========================================================
// ADD / UPDATE PRODUCT
// ========================================================
async function saveProduct() {
    const id = document.getElementById("product-id").value;
    const name = document.getElementById("name").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;

    const product = { name, price, description };

    if (id) {
        // UPDATE
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    } else {
        // CREATE
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });
    }

    resetForm();
    loadProducts();
}

// ========================================================
// DELETE PRODUCT
// ========================================================
async function deleteProduct(id) {
    if (!confirm("Are you sure delete?")) return;

    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadProducts();
}

// ========================================================
// EDIT PRODUCT (LOAD LÊN FORM)
// ========================================================
function editProduct(id, name, price, description) {
    document.getElementById("product-id").value = id;
    document.getElementById("name").value = name;
    document.getElementById("price").value = price;
    document.getElementById("description").value = description;

    document.getElementById("form-title").innerText = "Update Product";
    document.getElementById("cancel-btn").classList.remove("hide");
}

// ========================================================
// RESET FORM
// ========================================================
function resetForm() {
    document.getElementById("product-id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";

    document.getElementById("form-title").innerText = "Add Product";
    document.getElementById("cancel-btn").classList.add("hide");
}
