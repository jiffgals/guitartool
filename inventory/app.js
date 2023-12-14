const menu = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.navbar__menu')

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active')
    menuLinks.classList.toggle('active');
});

function addProduct() {
    var name = document.getElementById('productName').value;
    var quantity = prompt("Please enter Quantity", "");
    var price = prompt("Please enter the price", "");
    if (price === null || price === "") {
      return;
    }
    var table = document.getElementById('inventoryTable');
    var row = table.insertRow(-1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = name;
    cell2.innerHTML = '<span class="quantity">' + quantity + '</span>';
    cell3.innerHTML = price;
    cell4.innerHTML = '<button class="remove" onclick="removeProduct(this)">Remove</button>';
    document.getElementById('productName').value = '';
    document.getElementById('productQuantity').value = '';
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    inventory.push({ name: name, quantity: quantity, price: price });
    localStorage.setItem('inventory', JSON.stringify(inventory));
    loadInventory();
  }

  document.addEventListener('DOMContentLoaded', function() {
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    var table = document.getElementById('inventoryTable');
    table.innerHTML = '<tr><th>Product Name</th><th>Quantity</th><th>Price<th>Actions</th></tr>';
    inventory.forEach(function(item) {
      addProductToTable(item.name, item.quantity, item.price);
    });
    loadInventory();
  });
  
  function removeProduct(btn) {
    var row = btn.parentNode.parentNode;
    var name = row.cells[0].innerHTML;
    var price = row.cells[2].innerHTML;
    var inventory = JSON.parse(localStorage.getItem('inventory'));
    var index = inventory.findIndex(function(item) {
      return item.name === name, item.price === price;
    });
    inventory.splice(index, 1);
    localStorage.setItem('inventory', JSON.stringify(inventory));
    row.parentNode.removeChild(row);
  }
  
  function changeQuantity(button, amount) {
    var row = button.parentNode.parentNode;
    var quantity = row.querySelector('.quantity');
    quantity.textContent = Number(quantity.textContent) + amount;
    var name = row.cells[0].innerHTML;
    var price = row.cell[2].innerHTML;
    var inventory = JSON.parse(localStorage.getItem('inventory'));
    var index = inventory.findIndex(function(item) {
      return item.name === name, item.price === price;
    });
    inventory[index].quantity = Number(inventory[index].quantity) + amount;
    localStorage.setItem('inventory', JSON.stringify(inventory));
  }
  
  function loadInventory() {
    var inventory = JSON.parse(localStorage.getItem('inventory')) || [];
    var table = document.getElementById('inventoryTable');
    table.innerHTML = '<tr><th>Product Name</th><th>Quantity</th><th>Price</th><th>Actions</th></tr>';
    inventory.forEach(function(item) {
      addProductToTable(item.name, item.quantity, item.price);
    });
    document.querySelectorAll('.quantity').forEach(function(input) {
      input.addEventListener('change', function() {
        var name = this.parentNode.parentNode.cells[0].innerHTML;
        var price = this.parentNode.parentNode.cells[2].innerHTML;
        var inventory = JSON.parse(localStorage.getItem('inventory'));
        var index = inventory.findIndex(function(item) {
          return item.name === name, item.price === price;
        });
        inventory[index].quantity = this.value;
        localStorage.setItem('inventory', JSON.stringify(inventory));
      });
    });
  }
  
  function addProductToTable(name, quantity, price) {
      var table = document.getElementById('inventoryTable');
      var row = table.insertRow(-1);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML = name;
      cell2.innerHTML = '<input type="number" class="quantity" value="' + quantity + '">';
      cell3.innerHTML = price;
      cell4.innerHTML = '<button class="remove" onclick="removeProduct(this)">Remove</button>';
    }
  
  function searchTable() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("inventoryTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
              if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }
