document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("id");

  if (productId) {
    fetchProductDetails(productId);
  } else {
    document.getElementById("product-details").innerHTML =
      "<p>No product ID provided.</p>";
  }
});

function fetchProductDetails(productId) {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
  })
    .then((response) => response.json())
    .then((product) => {
      displayProductDetails(product);
    })
    .catch((error) => {
      console.error("Error fetching product details:", error);
      document.getElementById("product-details").innerHTML =
        "<p>Error loading product details.</p>";
    });
}

function displayProductDetails(product) {
  const detailsContainer = document.getElementById("product-details");
  detailsContainer.innerHTML = `
    <div class="product-details-container">
      <div class="row">
        <div class="col-md-6">
          <img src="${product.imageUrl}" class="img-fluid product-details-image" alt="${product.name}">
        </div>
        <div class="col-md-6">
          <h1 class="product-details-title">${product.name}</h1>
          <div class="mb-3">
                <span class="badge bg-primary">${product.brand}</span>
              </div>
          <p class="product-details-price">€${product.price}</p>
          <p class="product-details-description">${product.description}</p>
          <div class="product-details-info">
            <h3>Additional Details</h3>
            <p><strong>Stock:</strong> ${Math.floor(Math.random() * 100)} units</p>
            <p><strong>Rating:</strong> ${(Math.random() * 5).toFixed(1)} / 5</p>
            <p><strong>Reviews:</strong> ${Math.floor(Math.random() * 1000)}</p>
            <p><strong>ID:</strong> ${product._id}</p>
          </div>
        </div>
      </div>
    </div>
  `;
}


function saveProduct(productId) {
  const updatedProduct = {
    name: document.getElementById("name").value,
    description: document.getElementById("description").value,
    brand: document.getElementById("brand").value,
    imageUrl: document.getElementById("imageUrl").value,
    price: parseFloat(document.getElementById("price").value),
  };

  fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((response) => response.json())
    .then((updatedProduct) => {
      alert("Product updated successfully");
      window.location.href = "index.html";
    })
    .catch((error) => console.error("Error updating product:", error));
}

function deleteProduct(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzViZWFlNWQyMjA3MTAwMTVkZTJmMzAiLCJpYXQiOjE3MzQwNzcxNTcsImV4cCI6MTczNTI4Njc1N30.fhzNLs913VrTGBQ74pn8HJ7F6fR-pfEqBz76znDQ3eI",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Product deleted successfully");
          window.location.href = "index.html";
        } else {
          throw new Error("Failed to delete product");
        }
      })
      .catch((error) => console.error("Error deleting product:", error));
  }
}
