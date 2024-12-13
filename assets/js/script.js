document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("products-container")) {
    getAllProducts();
  }

  const addProductForm = document.getElementById("add-product-form");
  if (addProductForm) {
    addProductForm.addEventListener("submit", handleAddProduct);
  }
});

function handleAddProduct(event) {
  event.preventDefault();
  const newProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
    body: JSON.stringify(newProduct),
  })
    .then((response) => response.json())
    .then((createdProduct) => {
      console.log("Product created:", createdProduct);
      alert("Product added successfully!");
      document.getElementById("add-product-form").reset();
    })
    .catch((error) => {
      console.error("Error creating product:", error);
      alert("Error adding product. Please try again.");
    });
}

function getAllProducts() {
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
  })
    .then((response) => response.json())
    .then((products) => {
      displayProducts(products);
    })
    .catch((error) => {
      console.error("Errore nel recupero dei prodotti:", error);
    });
}

function displayProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.className = "col-md-4 mb-4";
    productElement.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${product.imageUrl}" class="card-img-top product-image" alt="${product.name}">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text product-description">${product.description}</p>
          <p class="card-text"><strong>Brand:</strong> ${product.brand}</p>
          <p class="card-text"><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <div class="mt-auto">
            <button class="btn btn-primary btn-sm me-2 view-details" data-product-id="${product._id}">View Details</button>
            <a href="back-office.html?id=${product._id}&mode=edit" class="btn btn-secondary btn-sm">Edit</a>
          </div>
        </div>
      </div>
    `;
    container.appendChild(productElement);
  });



  document.querySelectorAll(".view-details").forEach((button) => {
    button.addEventListener("click", (e) => {
      const productId = e.target.getAttribute("data-product-id");
      const product = products.find((p) => p._id === productId);
      showProductModal(product);
    });
  });
}

function showProductModal(product) {
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "productModal";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-labelledby", "productModalLabel");
  modal.setAttribute("aria-hidden", "true");

  modal.innerHTML = `
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="productModalLabel">${product.name}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-md-6">
              <img src="${product.imageUrl}" class="img-fluid product-modal-image" alt="${product.name}">
            </div>
            <div class="col-md-6">
              <p class="product-modal-description"><strong>Description:</strong> ${product.description}</p>
              <p><strong>Brand:</strong> ${product.brand}</p>
              <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
              <p><strong>ID:</strong> ${product._id}</p>
              <p><strong>Created At:</strong> ${new Date(product.createdAt).toLocaleString()}</p>
              <p><strong>Updated At:</strong> ${new Date(product.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <a href="product-details.html?id=${product._id}" class="btn btn-primary">See More</a>
        </div>
      </div>
    </div>
  `;


  document.body.appendChild(modal);

  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();

  modal.addEventListener("hidden.bs.modal", function () {
    modal.remove();
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "col";
  card.innerHTML = `
        <div class="card h-100">
            <img src="${product.imageUrl}" class="card-img-top" alt="${
    product.name
  }">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.brand}</p>
                <p class="card-text">$${product.price.toFixed(2)}</p>
                <button class="btn btn-primary btn-sm me-2" onclick="showProductModal('${
                  product._id
                }')">View Details</button>
                <a href="back-office.html?id=${
                  product._id
                }&mode=edit" class="btn btn-secondary btn-sm">Edit</a>
            </div>
        </div>
    `;
  return card;
}
