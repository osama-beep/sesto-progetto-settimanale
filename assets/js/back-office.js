document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");
  const mode = urlParams.get("mode");

  const formTitle = document.getElementById("form-title");
  const deleteBtn = document.getElementById("delete-btn");
  const productForm = document.getElementById("product-form");

  if (productId && mode === "edit") {
    formTitle.textContent = "Edit Product Details";
    deleteBtn.style.display = "block";
    fetchProductDetails(productId);
  } else {
    deleteBtn.style.display = "none";
  }

  productForm.addEventListener("submit", function (e) {
    e.preventDefault();
    if (productId && mode === "edit") {
      updateProduct(productId);
    } else {
      createProduct();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  });
});

function fetchProductDetails(id) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
  })
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("name").value = product.name;
      document.getElementById("description").value = product.description;
      document.getElementById("brand").value = product.brand;
      document.getElementById("imageUrl").value = product.imageUrl;
      document.getElementById("price").value = product.price;
    })
    .catch((error) => console.error("Error:", error));
}

function updateProduct(id) {
  const product = getProductFromForm();
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((updatedProduct) => {
      console.log("Product updated:", updatedProduct);
      alert("Product updated successfully!");
    })
    .catch((error) => console.error("Error:", error));
}

function createProduct() {
  const product = getProductFromForm();
  fetch("https://striveschool-api.herokuapp.com/api/product/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
    body: JSON.stringify(product),
  })
    .then((response) => response.json())
    .then((newProduct) => {
      console.log("Product created:", newProduct);
      alert("Product created successfully!");
      document.getElementById("product-form").reset();
    })
    .catch((error) => console.error("Error:", error));
}

function deleteProduct(id) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${id}`, {
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
  })
    .then((response) => {
      if (response.ok) {
        console.log("Product deleted");
        alert("Product deleted successfully!");
        window.location.href = "index.html";
      } else {
        throw new Error("Failed to delete product");
      }
    })
    .catch((error) => console.error("Error:", error));
}

function getProductFromForm() {
  return {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };
}
