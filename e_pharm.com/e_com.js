window.addEventListener('popstate', function (event) {
    window.location.reload();
})
let WishlistCheck = 0;
let star=0;
function buyer_signup() {

    let Fname = document.getElementById('f_name').value;
    let Lname = document.getElementById('l_name').value;
    let Phone = document.getElementById('P_num').value;
    let DOB = document.getElementById('_dob').value;
    let City = document.getElementById('city').value;
    let Address = document.getElementById('address').value;
    let Gender = document.getElementById('gender').value;
    let Username = document.getElementById('u_name').value;
    let Password = document.getElementById('u_pass').value;
    let CNIC = document.getElementById('_cnic').value;


    $.ajax
        ({
            url: 'e_com.php',
            type: "POST",
            data: { 'functionname': 'buyer_signup', 'arguments': [Fname, Lname, Phone, DOB, City, Address, Gender, Username, Password, CNIC] },
            success: function (d) {
                document.getElementById('msg').innerText = d;
            }
        })
}
function seller_signup() {
    let PName = document.getElementById('p_name').value;
    let OName = document.getElementById('owner').value;
    let Phone = document.getElementById('P_num').value;
    let City = document.getElementById('city').value;
    let Address = document.getElementById('address').value;
    let Username = document.getElementById('u_name').value;
    let Password = document.getElementById('u_pass').value;
    let CNIC = document.getElementById('_cnic').value;
    $.ajax
        ({
            url: 'e_com.php',
            type: "POST",

            data: { 'functionname': 'seller_signup', 'arguments': [PName, OName, Phone, City, Address, Username, Password, CNIC] },
            success: function (d) {
                document.getElementById('msg').innerText = d;
            }
        })
}
function GetAllBuyers() {


    fetch('Buyer_list_management.html')
        .then(Response => Response.text())
        .then(text => document.body.innerHTML = text);
    let id = 1;
    let u = 'u';
    $.ajax
        ({

            url: 'e_com.php',
            type: "POST",
            dataType: 'JSON',
            data: { 'functionname': 'GetAllBuyers' },
            success: function (d) {
                let string = '';

                $.each(d, function (key, value) {
                    string += `<tr>
                <td>${value['FName']} ${value['LName']}</td>
                <td  id="u${id}">${value['username']}</td>
                <td>${value['Gender']} </td>
                <td>${value['Date_of_birth']} </td>
                <td>${value['CNIC']}</td>
                <td>${value['PhoneNo']} </td>
                
                <td>${value['City']} </td>
                <td>${value['Address']} </td>
                <td><button id="${id}" class="table_btns" onclick="DropBuyer(this.id)">Drop User</button></td>
                
                </tr>`;
                    id++;
                });


                $('#tableBody').append(string);

            }
        })

}
function GetAllSellers() {
    document.body.innerHTML = '';
    fetch('seller_list_html.html')
        .then(Response => Response.text())
        .then(text => document.body.innerHTML = text);
    let id = 1;
    $.ajax
        ({

            url: 'e_com.php',
            type: "POST",
            dataType: 'JSON',
            data: { 'functionname': 'GetAllSellers' },
            success: function (d) {
                let string = '';

                $.each(d, function (key, value) {

                    string += `<tr>
                <td>${value['FName']} ${value['LName']}</td>
                <td  id="u${id}">${value['user_name']}</td>
                <td>${value['Gender']} </td>
                <td>${value['Date_of_birth']} </td>
                <td>${value['cnic_no']}</td>
                <td>${value['Phone_no']} </td>
                
                <td>${value['City']} </td>
                <td>${value['Address']} </td>
                <td><button id="${id}" class="table_btns" onclick="DropSeller(this.id)">Drop User</button></td>
                
                </tr>`;
                    id++;
                });


                $('#tableBody').append(string);

            }
        })
}
function DropBuyer(id) {
    let u = document.getElementById('u' + id).innerText;
    $.ajax
        ({

            url: 'e_com.php',
            type: "POST",

            data: { 'functionname': 'DropBuyer', 'arguments': [u] },
            success: function (d) {
                alert(d);
            }
        });
}
function DropSeller(id) {
    let u = document.getElementById('u' + id).innerText;
    $.ajax
        ({
            url: 'e_com.php',
            type: "POST",

            data: { 'functionname': 'DropSeller', 'arguments': [u] },
            success: function (d) {
                alert(d);
            }
        });
}
function buyerlogin() {
    let u = document.getElementById('u_name').value;
    let p = document.getElementById('u_pass').value;
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'buyerlogin', 'arguments': [u, p] },
        success: function (d) {

            if (d == "yes") {
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').innerText = 'Incorrect username or password';
            }
            else if(d=="Your account has been banned.")
            {
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').innerText = d;
            }
            else {
                var date = new Date();
                date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
                var expires = date.toGMTString();

                document.cookie = "buyer_username=" + d + ";expires=" + expires + "; path=/";
                let name = '';
                window.location.href = 'dashboard.html';
            }
        }
    });

}
function sellerlogin() {
    let u = document.getElementById('u_name').value;
    let p = document.getElementById('u_pass').value;
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'sellerlogin', 'arguments': [u, p] },
        success: function (d) {


            if (d == "yes") {
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').innerText = 'Incorrect username or password';
            }
            else if(d=="Your account has been banned.")
            {
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').innerText = d;
            }
            else {
                var date = new Date();
                date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
                var expires = date.toGMTString();

                document.cookie = "seller_username=" + d + ";expires=" + expires + "; path=/";

                let name = '';
                fetch('Seller_Dashboard_head.html')
                    .then(Response => Response.text())
                    .then(text => document.head.innerHTML = text);

                fetch('Seller_Dashboard_body.html')
                    .then(response => response.text())
                    .then(text => {
                        document.body.innerHTML = text;
                        document.getElementById('s_name').innerText = 'Hi, ' + d;
                    });
            }
        }
    })
}

function MakeActive(id) {
    const options = document.querySelectorAll('.list-group-item');
    var fName, lName, phoneNo, gender, userName, city, country, address, cnicNo, dob;

    options.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(id).classList.add("active");
    if (id == 'Home') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/seller_login_intermediary.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

    }
    if (id == 'personal-info') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/seller_personal_info.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

    }
    if (id == 'active-orders') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/Active-Orders.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
    }
    if (id == 'completed-orders') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/Seller-Completed-Orders.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
    }
    if (id == 'settings') {
        document.getElementById('sidebar-switching').innerHTML = '';
    }
}
function Make_Active_Buyer_Interface(id) {
    const options = document.querySelectorAll('.list-group-item');
    var fName, lName, phoneNo, gender, userName, city, country, address, cnicNo, dob;

    options.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(id).classList.add("active");
    let string = '';
    if (id == 'Home') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/dashboard.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        string += `
        <div class=" d-flex flex-column p-3 " id="product-display">
        </div>`;
        document.getElementById('sidebar-switching').innerHTML = string;
        document.getElementById('buyer-search-bar').style.display = "flex";
        document.getElementById('filter-div').style.display = "flex";
        window.location.reload();


    }
    else if (id == 'Wishlist') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/Wishlist.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();

    }
    if (id == 'personal-info') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/buyer_personal_info.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();

    }
    if (id == 'Track-Orders') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/Track-Orders.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();

    }
    if (id == 'completed-orders') {
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/Buyer-Completed-Orders.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();

    }
    else {
        document.getElementById('sidebar-switching').innerHTML = '';
        document.getElementById('buyer-search-bar').style.display = "none";
        document.getElementById('filter-div').style.display = "none";
    }
}

function MakeActiveNav(id) {

    const options = document.querySelectorAll('.removable-active-nav');
    options.forEach(item => {
        item.classList.remove('custom-active');
    });
    document.getElementById(id).classList.add("custom-active");
    if (id == 'Add-Product') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/seller_login_intermediary.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();
    }
    else {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/product_table.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);
        window.location.reload();
    }
}
function DropBuyer(id) {
    let u = document.getElementById('u' + id).innerText;
    $.ajax
        ({

            url: 'e_com.php',
            type: "POST",

            data: { 'functionname': 'DropBuyer', 'arguments': [u] },
            success: function (d) {
                alert(d);
            }
        });
}
function DropSeller(id) {
    let u = document.getElementById('u' + id).innerText;
    $.ajax
        ({
            url: 'e_com.php',
            type: "POST",

            data: { 'functionname': 'DropSeller', 'arguments': [u] },
            success: function (d) {
                alert(d);
            }
        });

}

function AddProducttoStore() {
    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let pname = document.getElementById('p_name').value;
    let price = document.getElementById('price').value;


    let inventory = document.getElementById('inventory').value;
    let desc = document.getElementById('desc').value;
    let image = document.getElementById("img").files[0];
    let category = document.getElementById("category").value;
    let form_data = new FormData();
    form_data.append("functionname", "Addproducttostore");
    form_data.append("pname", pname);
    form_data.append("price", price);
    form_data.append("inventory", inventory);
    form_data.append("desc", desc);
    form_data.append("user", u);
    form_data.append("image", image);
    form_data.append("category", category);

    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: form_data,
        contentType: false,
        processData: false,
        success: function (d) {
            document.getElementById('msg').innerText = d;
        }
    });
}

function DeleteSellerLoginCookie() {
    document.cookie = "seller_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'seller_login_intermediary.html';
}
function DeleteBuyerLoginCookie() {
    document.cookie = "buyer_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();
}
function displayusingqueryparameters(someth) {
    document.getElementById('product-search').value = someth;
    displayProductsToBuyer(0);
}

function displayProductsToBuyer(filter) {
    //0 - no filter
    //1 - price increasing order
    //2 - price decreasing order
    //
    product = document.getElementById('product-search').value;
    const params = new URLSearchParams();
    params.append("q", product);
    // push a new state with the search query added to the URL
    history.pushState({}, "", "?" + params.toString());

    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let city = ''
    $.ajax({

        url: 'e_com.php',
        type: "POST",
        dataType: 'JSON',
        data: { 'functionname': 'GetBuyerCity', 'arguments': [u] },
        success: function (d) {
            city = d[0]["City"];
            $.ajax({
                url: 'e_com.php',
                type: "POST",
                data: { 'functionname': 'displayProductsToBuyer', 'arguments': [product, city, filter] },
                dataType: "JSON",
                success: function (d) {

                    let string = '';
                    let count = 1;
                    string += `
                   <div class=" d-flex flex-column p-3 " id="product-display">
                   </div>`;
                    document.getElementById('sidebar-switching').innerHTML = string;
                    let WishListClasses = '';

                    $.each(d, function (key, value) {

                        ExistsInWishlist(value["product_id"]);
                        //if product is in the wishlist heart should appear red
                        if (WishlistCheck) {
                            WishListClasses = "class='fa-solid fa-heart' style='color:#DE3163'"
                        }
                        else {
                            WishListClasses = "class='fa-regular fa-heart'";
                        }

                        if (count == 1) {
                            string += `
                        <div class=" d-flex flex-md-row flex-column p-3" >
        
                        <div class="px-2 py-4 ml-auto border product-hover-1 ms-1" style="align-content:center;height:260px;width:170px" >
                        <div class="d-flex justify-content-center  h-75 w-100 mb-3"  onclick="displayProductDetails('${value["product_id"]}')">
        
                        <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img"  class="p-0 w-100"><br>
                        </div>
                        <div class="border-top py-2">
                        <div class="d-flex justify-content-between mb-2"  onclick="displayProductDetails('${value["product_id"]}')">
                       
                        <p1 style="font-size:13px">${value["pname"]}</p1>
                        <div>
                        <p1 style="font-size:12px;" id="review${value["product_id"]}"></p1>
                        <i class="fa-solid fa-star" style="color:#DBA800";></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between">
                        <p1 style="font-size:13px">Rs. ${value["price"]}</p1><i id="${value["product_id"]}" ${WishListClasses} onclick="AddProductToWishlist(this.id)"></i>
                        </div>
                        </div>
                        </div>
                     `;
                            count++;

                        }
                        else if (count == 2) {
                            string += `
                        <div class="px-2 py-4 ml-auto border  product-hover-1 ms-1" style="align-content:center;height:260px;width:170px" >
                        <div class="d-flex justify-content-center h-75 w-100 mb-3"  onclick="displayProductDetails('${value["product_id"]}')">
                        <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img"  class="p-0 w-100"><br>
                        </div >
                        <div class="border-top py-2">
                        
                        
                        <div class="d-flex justify-content-between mb-2"  onclick="displayProductDetails('${value["product_id"]}')">
                        <p1 style="font-size:13px">${value["pname"]}</p1>
                        <div>
                        <p1 style="font-size:12px;" id="review${value["product_id"]}"></p1>
                        <i class="fa-solid fa-star" style="color:#DBA800";></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between">
                        <p1 style="font-size:13px">Rs. ${value["price"]}</p1><i id="${value["product_id"]}" ${WishListClasses} onclick="AddProductToWishlist(this.id)"></i>
                        </div>
                        </div>
                        </div>
                     `;
                            count++;

                        }
                        else if (count == 3) {
                            string += `
                        <div class="px-2 py-4 ml-auto border product-hover-1 ms-1 " style="align-content:center; height:260px;width:170px">
                        <div class="d-flex justify-content-center h-75 w-100 mb-3"  onclick="displayProductDetails('${value["product_id"]}')">
                        <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img"  class="p-0 w-100 "><br>
                        </div>
                        <div class="border-top py-2">
                        <div class="d-flex justify-content-between mb-2"  onclick="displayProductDetails('${value["product_id"]}')">
                        <p1 style="font-size:13px">${value["pname"]}</p1>
                        <div>
                        <p1 style="font-size:12px;" id="review${value["product_id"]}"></p1>
                        <i class="fa-solid fa-star" style="color:#DBA800";></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between">
                        <p1 style="font-size:13px">Rs. ${value["price"]}</p1><i id="${value["product_id"]}" ${WishListClasses} onclick="AddProductToWishlist(this.id)"></i>
                        </div>
                        </div>
                        </div>
                        
                        `;
                            count++;

                        }
                        else if (count == 4) {
                            string += `
                        <div class="px-2 py-4 ml-auto border product-hover-1 ms-1 " style="align-content:center; height:260px;width2:170px" >
                        <div class="d-flex justify-content-center h-75 w-100 mb-3" onclick="displayProductDetails('${value["product_id"]}')">
                        <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img"  class="p-0 w-100 "><br>
                        </div>
                        <div class="border-top py-2">
                        <div class="d-flex justify-content-between mb-2" onclick="displayProductDetails('${value["product_id"]}')">
                        <p1 style="font-size:13px">${value["pname"]}</p1>
                        <div>
                        <p1 style="font-size:12px;" id="review${value["product_id"]}"></p1>
                        <i class="fa-solid fa-star" style="color:#DBA800";></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between">
                        <p1 class="" style="font-size:13px">Rs. ${value["price"]}</p1><i id="${value["product_id"]}" ${WishListClasses} onclick="AddProductToWishlist(this.id)"></i>
                        </div>
                        </div>
                        </div>
                              
                        `;
                            count++;

                        }
                        else if (count == 5) {
                            string += `
                        <div class="px-2 py-4 ml-auto border product-hover-1 ms-1 " style="align-content:center; height:260px;width:170px" >
                        <div class="d-flex justify-content-center h-75 w-100 mb-3" onclick="displayProductDetails('${value["product_id"]}')">
                        <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img"  class="p-0 w-100 "><br>
                        </div>
                        <div class="border-top py-2">
                        <div class="d-flex justify-content-between mb-2" onclick="displayProductDetails('${value["product_id"]}')">
                        <p1 style="font-size:13px" >${value["pname"]}</p1>
                        <div>
                        <p1 style="font-size:12px;" id="review${value["product_id"]}"></p1>
                        <i class="fa-solid fa-star" style="color:#DBA800";></i>
                        </div>
                        </div>
                        <div class="d-flex justify-content-between">
                        <p1 class="me-2" style="font-size:13px">Rs. ${value["price"]}</p1><i id="${value["product_id"]}" ${WishListClasses} onclick="AddProductToWishlist(this.id)"></i></div>
                        </div>
                        </div>
                        </div>
                        
                        `;
                            count = 1;

                        }
                        a=value["product_id"];
                        $.ajax({
                            url: 'e_com.php',
                            type: 'POST',
                            dataType: 'JSON',
                            data: { 'functionname': 'GetProductReviews', 'arguments': [a] },
                            success: function (d) {
    
                                    if(d[0]["AVG(r.stars)"]!=null)
                                    {
                                     document.getElementById('review'+d[0]["product_id"]).innerText=d[0]["AVG(r.stars)"];
                                    }
                                    else
                                    {
                                        document.getElementById('review'+d[0]["product_id"]).innerText='-';
    
                                    }
                               
    
                            }
                        })
                        
                         

                    });
                    if (count < 5) {
                        string += `
                        
                        </div>
                        `;
                    }
                    $('#product-display').append(string);

                }

            })


        }
    })



}

function displayProductDetails(id) {
    console.log(id);
    $.ajax({
        url: 'e_com.php',
        type: 'POST',
        dataType: 'JSON',
        data: { 'functionname': 'GetProductDetails', 'arguments': [id] },
        success: function (d) {
            string = '';
            $.each(d, function (key, value) {
                string += `
                <p1 class="mt-2 alert alert-success " style="display:none" id="product-description-message"></p1>

            <div class=" m-4 mt-2 d-flex flex-column flex-md-row ">
            <div class="p-0  w-50 h-50 mb-3 mb-md-0">
               <img src="site-images/${value["username"]}${value["product_id"]}.png" alt="img" class="w-100"><br>
            </div>
            <div class="p-0 ms-1 ms-md-4  w-100 h-100 border border-dark ">
                <p class="ms-2 ms-md-5 mt-2 "> ${value["pname"]}</p>
                <p1 class="ms-2 ms-md-5">Price : Rs. ${value["price"]}</p1><br><br>
                <div class="ms-2 ms-md-5">
                <p1 >Description :  ${value["description"]}</p1><br><br>
                </div>
                
                <p1 class="ms-2 ms-md-5">Inventory :  ${value["inventory"]}</p1><br><br>
                <label class="ms-2 ms-md-5" for="quantity">Quantity : </label>
                <input style="width:50px" type="number" name="quantity" id="quantity" value="1"><br><br>
                <p1 class="ms-2 ms-md-5">Pharmacy :  ${value["PharmName"]}</p1><br><br>
                <p1 class="ms-2 ms-md-5">Contact no. :  ${value["Phone_no"]}</p1><br><br>

                <button class="frontpagebuttons p-3" onclick="AddProductToCart('${value["product_id"]}')">  Add to Cart  <span class="fa fa-shopping-cart"></span></button><br><br>
             </div>
            
        </div>
    
                `;
            });
            document.getElementById('sidebar-switching').innerHTML = string;
        }
    })
}

function AddProductToCart(product_id) {
    console.log(product_id);
    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let Quantity = document.getElementById('quantity').value;
    $.ajax({
        url: "e_com.php",
        type: 'POST',

        data: { 'functionname': 'AddProductToCart', 'arguments': [u, product_id, Quantity] },
        success: function (d) {
            console.log(d);
            document.getElementById('product-description-message').style.display = 'block';
            document.getElementById('product-description-message').innerText = d;
        }


    })
}
function displaycart() {

    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let sum = 0;
    $.ajax({
        url: "e_com.php",
        type: 'POST',
        dataType: 'JSON',
        data: { 'functionname': 'DisplayCart', 'arguments': [u] },
        success: function (d) {
            let string = '';
            $.each(d, function (key, value) {
                console.log(value["SUM(c.Quantity)"]);
                let price = (parseFloat(value["price"])) * (parseFloat(value["SUM(c.Quantity)"]));
                string += `
            
            <div class="dropdown-item d-flex flex-row" >
            <img src="site-images/${value["username"]}${value["product_id"]}.png" style="width:30px;height:30px;">
            <p1 class="px-3">${value["pname"]}</p1>
            <div class="ms-auto"> 
            <p1 class="px-3">Rs. ${price}</p1>  
            <p1 class="px-3"> Qt= ${value["SUM(c.Quantity)"]}</p1> 
            
            <i class="fa fa-trash trash-icon-custom " onclick="DeleteFromCart('${value["product_id"]}')" style="color:white,width:20px;"></i>
            </div>
            </div>
            <div class="dropdown-divider "></div>

            `;
                sum = sum + price;
            });
            string += `<a class="dropdown-item " >Total Price : <p1 class="px-3">Rs.${sum}</p1> </p1></a><br><br>
                <button class="frontpagebuttons" onclick="CheckoutPage('${u}')">Proceed to Checkout</button><br><br>
                <p1 class="alert alert-danger" style="display:none" id="cart-message"></p1>
        `;
            document.getElementById("cart").innerHTML = string;
        }



    })
}
function DeleteFromCart(product_id) {

    $.ajax({
        url: 'e_com.php',
        type: 'POST',
        data: { 'functionname': 'DeleteFromCart', 'arguments': [product_id] },
        success: function (d) {

            document.getElementById('cart-message').style.display = 'block';
            document.getElementById('cart-message').innerText = d;
        }


    })


}
function CheckoutPage() {
    window.location.href = 'checkout.html';
}
function AddProductToWishlist(product_id) {
    let username = document.getElementById('s_name').innerText;
    username = username.replace('Hi, ', '');
    if (document.getElementById(product_id).style.color != "rgb(222, 49, 99)") {
        console.log(document.getElementById(product_id).style.color);
        document.getElementById(product_id).classList.remove('fa-regular');
        document.getElementById(product_id).classList.remove('fa-heart');
        document.getElementById(product_id).classList.add('fa-solid');
        document.getElementById(product_id).classList.add('fa-heart');
        document.getElementById(product_id).style.color = "#DE3163";

        $.ajax({

            url: 'e_com.php',
            type: 'POST',
            data: { 'functionname': 'AddProductToWishlist', 'arguments': [product_id, username] },
            success: function (d) {
                alert(d);
            }

        })
    }
    else {
        document.getElementById(product_id).classList.remove('fa-solid');
        document.getElementById(product_id).classList.remove('fa-heart');
        document.getElementById(product_id).classList.add('fa-regular');
        document.getElementById(product_id).classList.add('fa-heart');
        document.getElementById(product_id).style.color = "black";
        $.ajax({

            url: 'e_com.php',
            type: 'POST',
            data: { 'functionname': 'DeleteProductFromWishlist', 'arguments': [product_id, username] },
            success: function (d) {
                alert(d);
            }

        })
    }

}
let opt = 0;
function ExistsInWishlist(product_id) {
    let username = document.getElementById('s_name').innerText;
    username = username.replace('Hi, ', '');

    $.ajax({

        url: 'e_com.php',
        type: 'POST',
        dataType: 'JSON',
        async: false,
        data: { 'functionname': 'ExistsInWishlist', 'arguments': [product_id, username] },
        success: function (d) {

            if (d == '1') {

                YesWishlist();
            }
            else {
                NoWishlist();
            }
        }

    })


}
function YesWishlist() {
    console.log('Im in yeswishlist');
    WishlistCheck = 1;
}
function NoWishlist() {
    WishlistCheck = 0;
}

function update_seller_info() {
    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let PName = document.getElementById('p_name').value;
    let OName = document.getElementById('owner').value;
    let cnic = document.getElementById('_cnic').value;
    let PNum = document.getElementById('P_num').value;
    let Address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    if (cnic.length != 13) {
        document.getElementById('msg').classList.add('alert');
        document.getElementById('msg').classList.add('alert-danger');

        document.getElementById('msg').innerText = 'Please Enter a valid CNIC';
    }
    else {
        $.ajax({

            url: 'e_com.php',
            type: 'POST',

            async: false,
            data: { 'functionname': 'UpdateSellerInfo', 'arguments': [u, PName, OName, cnic, PNum, Address, city] },
            success: function (d) {
                document.getElementById('msg').classList.add('alert');
                if (d != '0') {
                    if (document.getElementById('msg').classList.contains('alert-danger')) {
                        document.getElementById('msg').classList.remove('alert-danger');

                    }

                    document.getElementById('msg').classList.add('alert-success');

                    document.getElementById('msg').innerText = d;
                }
                else {
                    document.getElementById('msg').innerText = 'One or more fields are empty';
                }

            }

        })
    }
}


function UpdateBuyerInfo(username) {
    let u = document.getElementById('s_name').innerText;
    u = u.replace('Hi, ', '');
    let FName = document.getElementById('f_name').value;
    let LName = document.getElementById('l_name').value;
    let cnic = document.getElementById('_cnic').value;
    let dob = document.getElementById('_dob').value;
    let gender= document.getElementById('gender').value;

    let PNum = document.getElementById('P_num').value;
    let Address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    if (cnic.length != 13) {
        document.getElementById('msg').classList.add('alert');
        document.getElementById('msg').classList.add('alert-danger');

        document.getElementById('msg').innerText = 'Please Enter a valid CNIC';
    }
    else {
        $.ajax({

            url: 'e_com.php',
            type: 'POST',

            async: false,
            data: { 'functionname': 'UpdateBuyerInfo', 'arguments': [u, FName, LName, cnic,dob, PNum,gender, Address, city] },
            success: function (d) {
                document.getElementById('msg').classList.add('alert');
                if (d != '0') {
                    if (document.getElementById('msg').classList.contains('alert-danger')) {
                        document.getElementById('msg').classList.remove('alert-danger');

                    }

                    document.getElementById('msg').classList.add('alert-success');

                    document.getElementById('msg').innerText = d;
                }
                else {
                    document.getElementById('msg').innerText = 'One or more fields are empty';
                }

            }

        })
    }
}



function DisplayUpdateProductInfo(product_id) {
    let p = product_id;
    $.ajax({
        url: "e_com.php",
        type: 'POST',
        dataType: 'JSON',
        data: { 'functionname': 'GetProductInfoForSeller', 'arguments': [product_id] },
        success: function (d) {


            let string = '';
            string += `
    <div class="alert alert-success" id="success" style="display:none;"></div>
    <div id="add-product-listing" class="py-3 ms-0">
    <form mehtod="post" class="d-flex flex-md-row flex-column">

        <div class="p-2 mr-auto">
            <label for="Pname">Product Name:</label>
            <input type="text" name="Pname" id="p_name" value="${d[0]['pname']} "><br><br>


            <label for="Price">Price : </label>

            <input type="number" name="Price" id="price"  value="${d[0]['price']}"><br><br>

         
            <label for="Description">Description :</label>
            <input type="text" name="Description" id="desc" value="${d[0]["description"]}"><br><br>
          
          




        </div>

        <div class="p-2">
            
            <label for="Inventory">Items in Stock: </label>
            <input type="text" name="Inventory" id="inventory"  value="${d[0]['inventory']}"><br><br>
   

            <label for="Category ">Category :</label>
            <select id="category" value="${d[0]['category']}">
                <option >Prescription medications</option>
                <option >Over-the-counter (OTC) medications</option>
                <option >Vitamins and supplements</option>
                <option >Personal care products</option>
                <option >Medical equipment</option>
                <option >First aid supplies</option>
                <option >Home health care products</option>
                <option >Baby and child care products</option>
                <option >Pet health products</option>
                <option >Health and wellness products</option>
              </select>

        </div>

    </form>
    <input type="button" value="Update Info" onclick="UpdateProductInfo('${product_id}')" class="product-button p-3"><br><br>
    <p id="msg" class="info"></p>

</div>

   
    `;
            document.getElementById('p-table').innerHTML = string;
        }

    })
}

function UpdateProductInfo(product_id) {
    let product = document.getElementById('p_name').value;
    let price = document.getElementById('price').value;
    let desc = document.getElementById('desc').value;
    let inventory = document.getElementById('inventory').value;
    let category = document.getElementById('category').value;


    $.ajax({
        url: "e_com.php",
        type: 'POST',

        data: { 'functionname': 'UpdateProductInfo', 'arguments': [product_id, product, price, desc, inventory, category] },
        success: function (d) {
            document.getElementById('success').style.display = 'flex';

            document.getElementById('success').innerText = d;

        }
    })
}

function DisplayAddRiderDetails(order_id) {
    let string = '';
    string = ` 
    <form mehtod="post" class=" py-5 ms-5 d-flex flex-md-row flex-column justify-content-center">

    <div class="  border py-0 bg-light" style="border-radius: 20px;width: 450px;">
      <div class="bg-dark text-light w-100"
        style="border-top-right-radius: 20px;border-top-left-radius: 20px;text-align: center;">
        <p1 class=" py-2" style="font-size: 40px;">Add Rider's Info</p1><br><br>
      </div>
      
      <div id="msg" class="alert" style="display:none;"></div>
      <div style="margin-left:14%" class="mt-5">
       
        <i class="fa fa-user"><input type="text" name="BName" id="b_name" class=" py-1 px-2 input-fields" style="font-family: sans-serif;" placeholder="Rider's Name"><br><br><br></i>

      


        <i class="fa fa-motorcycle"><input type="text" name="m_number" id="m_number" class=" py-1 px-2 input-fields" style="font-family: sans-serif;" placeholder="Bike's Number"><br><br><br></i>


        <i class="fa fa-link"><input type="text" name="link" id="u_link" class="py-1 px-2 input-fields" style="font-family: sans-serif;" placeholder="Google Maps live location"><br><br><br></i>


      


        <div style="  float:right;margin-right:  35%;" class="mt-3">
        <input type="button" onclick="AddRiderDetails('${order_id}')" value="Confirm Delivery" class="signupButtons p-3" style="background-color: black;"> <br><br>

        </div>
      </div>

    </div>
 </form>   
    
    
    `
    document.getElementById('p-table').innerHTML = string;
    document.getElementById('p-table').style.marginLeft = '0';

}

function AddRiderDetails(order_id) {
    let biker_name = document.getElementById('b_name').value;
    let motorcycle_number = document.getElementById('m_number').value;
    let uber_link = document.getElementById('u_link').value;
    $.ajax({
        url: "e_com.php",
        type: 'POST',

        data: { 'functionname': 'AddRiderDetails', 'arguments': [order_id, biker_name, motorcycle_number, uber_link] },
        success: function (d) {
            if (d == '0') {
                document.getElementById('msg').style.display = 'flex';
                if (document.getElementById('msg').classList.contains('alert-success')) {
                    document.getElementById('msg').classList.remove('alert-success');
                }
                document.getElementById('msg').classList.add('alert-danger');

                document.getElementById('msg').innerText = 'One or more fields are empty!';
            }
            else {
                document.getElementById('msg').style.display = 'flex';
                if (document.getElementById('msg').classList.contains('alert-danger')) {
                    document.getElementById('msg').classList.remove('alert-danger');
                }
                document.getElementById('msg').classList.add('alert-success');

                document.getElementById('msg').innerText = d;
            }

        }
    })
}

function DisplayRiderInfo(order_id) {
    let string = '';
    string = `
    <div id="receive-message" class="alert alert-warning w-50">Click "Received" only when you have received the parcel.</div>
    <table class="table table-bordered table-responsive-sm  " style="width:550px">
        <thead class="table-dark">
            <tr>
                <th scope="col">Rider's Name</th>
                <th scope="col">Bike's Number</th>
                <th>Uber Tracking link</th>
                <th></th>
            </tr>
        </thead>
        <tbody id="tableBody">

        </tbody>
    </table>`;
    document.getElementById('p-table').innerHTML = string;
    string = '';

    $.ajax({
        url: "e_com.php",
        type: 'POST',
        dataType: 'JSON',
        data: { 'functionname': 'DisplayRiderInfo', 'arguments': [order_id] },
        success: function (d) {
            string = `
           <tr>
              <td>${d[0]["rider_name"]}</td>
              <td>${d[0]["rider_bike_number"]}</td>
              <td><a href="https://${d[0]["uber_link"]}">${d[0]["uber_link"]}</a></td>
              <td><button id="${order_id}" class="product-button p-3" onclick="MarkRecieved('${order_id}')">Received</button></td>
           
           </tr>

        `;
            $('#tableBody').append(string);

        }


    })

}

function MarkRecieved(order_id) {
    $.ajax({
        url: "e_com.php",
        type: 'POST',

        data: { 'functionname': 'MarkRecieved', 'arguments': [order_id] },
        success: function (d) {
            document.getElementById('receive-message').classList.remove('alert-warning');
            document.getElementById('receive-message').classList.add('alert-success');
            document.getElementById('receive-message').innerText = d;
            document.getElementById(order_id).disabled = true;
        }
    })
}
function DisplayAddReview(order_id) {
    let string = `
   <div class="  border py-0 bg-light" style="border-radius: 20px;width: 400px;">
      <div class="bg-dark text-light w-100"
        style="border-top-right-radius: 20px;border-top-left-radius: 20px;text-align: center;">
        <p1 class=" py-2" style="font-size: 40px;">Add Review</p1><br><br>
      </div>
      <div id="submit-review-alert" class="alert w-100" style="display:none;"></div>
      <div class="mt-3 mb-5">

   <i id="star-1" onclick="colorStar(1)" class="fa-regular fa-star fa-2xl mt-5" style="margin-left:21%" ></i>
   <i id="star-2" onclick="colorStar(2)" class="fa-regular fa-star fa-2xl ms-1" ></i>
   <i id="star-3" onclick="colorStar(3)" class="fa-regular fa-star fa-2xl ms-1" "></i>
   <i id="star-4" onclick="colorStar(4)" class="fa-regular fa-star fa-2xl ms-1" "></i>
   <i id="star-5" onclick="colorStar(5)" class="fa-regular fa-star fa-2xl ms-1" ></i>
   </div>

   <i class="fa-solid fa-comments mt-2 ms-5 mb-4"><input type="text" name="comments" id="comments" class="py-1 px-2 input-fields" style="font-family: sans-serif;" placeholder="Add Comments"><br><br></i>
  
   <input type="button" value="Submit Review" class="product-button p-3 mb-5" onclick="AddReview('${order_id}')" style="margin-left:32%";>

   </div>
   `;
    document.getElementById('p-table').innerHTML = string;
}

function colorStar(stars) {
    if (stars == 1) {
        star=1;
        if (document.getElementById('star-2').classList.contains('fa-regular')) {
            document.getElementById('star-1').classList.remove('fa-regular');
        }
        document.getElementById('star-1').classList.add('fa-solid');
        document.getElementById('star-1').style.color = '#DBA800';

        if (document.getElementById('star-2').classList.contains('fa-solid')) {
            document.getElementById('star-2').classList.add('fa-regular');
            document.getElementById('star-2').classList.remove('fa-solid');
            document.getElementById('star-2').style.backgroundColor = 'white';
            document.getElementById('star-2').style.color= 'black';
        }

        if (document.getElementById('star-3').classList.contains('fa-solid')) {
            document.getElementById('star-3').classList.add('fa-regular');
            document.getElementById('star-3').classList.remove('fa-solid');
            document.getElementById('star-3').style.backgroundColor= 'white';
            document.getElementById('star-3').style.color= 'black';
        }

        if (document.getElementById('star-4').classList.contains('fa-solid')) {
            document.getElementById('star-4').classList.add('fa-regular');
            document.getElementById('star-4').classList.remove('fa-solid');
            document.getElementById('star-4').style.backgroundColor = 'white';
            document.getElementById('star-4').style.color= 'black';
        }

        if (document.getElementById('star-5').classList.contains('fa-solid')) {
            document.getElementById('star-5').classList.add('fa-regular');
            document.getElementById('star-5').classList.remove('fa-solid');
            document.getElementById('star-5').style.backgroundColor = 'white';
            document.getElementById('star-5').style.color= 'black';
        }
    }
    if (stars == 2) {
        star=2;
        document.getElementById('star-1').classList.remove('fa-regular');
        document.getElementById('star-1').classList.add('fa-solid');
        document.getElementById('star-1').style.color = '#DBA800';

        document.getElementById('star-2').classList.remove('fa-regular');
        document.getElementById('star-2').classList.add('fa-solid');
        document.getElementById('star-2').style.color = '#DBA800';

        if (document.getElementById('star-3').classList.contains('fa-solid')) {
            document.getElementById('star-3').classList.add('fa-regular');
            document.getElementById('star-3').classList.remove('fa-solid');
            document.getElementById('star-3').style.backgroundColor = 'white';
            document.getElementById('star-3').style.color= 'black';
        }

        if (document.getElementById('star-4').classList.contains('fa-solid')) {
            document.getElementById('star-4').classList.add('fa-regular');
            document.getElementById('star-4').classList.remove('fa-solid');
            document.getElementById('star-4').style.backgroundColor = 'white';
            document.getElementById('star-4').style.color= 'black';
        }

        if (document.getElementById('star-5').classList.contains('fa-solid')) {
            document.getElementById('star-5').classList.add('fa-regular');
            document.getElementById('star-5').classList.remove('fa-solid');
            document.getElementById('star-5').style.backgroundColor = 'white';
            document.getElementById('star-5').style.color= 'black';
        }


    }
    if (stars == 3) {
        star=3;
        document.getElementById('star-1').classList.remove('fa-regular');
        document.getElementById('star-1').classList.add('fa-solid');
        document.getElementById('star-1').style.color = '#DBA800';

        document.getElementById('star-2').classList.remove('fa-regular');
        document.getElementById('star-2').classList.add('fa-solid');
        document.getElementById('star-2').style.color = '#DBA800';

        document.getElementById('star-3').classList.remove('fa-regular');
        document.getElementById('star-3').classList.add('fa-solid');
        document.getElementById('star-3').style.color = '#DBA800';

        if (document.getElementById('star-4').classList.contains('fa-solid')) {
            document.getElementById('star-4').classList.add('fa-regular');
            document.getElementById('star-4').classList.remove('fa-solid');
            document.getElementById('star-4').style.backgroundColor= 'white';
            document.getElementById('star-4').style.color= 'black';
        }

        if (document.getElementById('star-5').classList.contains('fa-solid')) {
            document.getElementById('star-5').classList.add('fa-regular');
            document.getElementById('star-5').classList.remove('fa-solid');
            document.getElementById('star-5').style.backgroundColor = 'white';
            document.getElementById('star-5').style.color= 'black';
        }

    }

    if (stars == 4) {
        star=4;
        document.getElementById('star-1').classList.remove('fa-regular');
        document.getElementById('star-1').classList.add('fa-solid');
        document.getElementById('star-1').style.color = '#DBA800';

        document.getElementById('star-2').classList.remove('fa-regular');
        document.getElementById('star-2').classList.add('fa-solid');
        document.getElementById('star-2').style.color = '#DBA800';

        document.getElementById('star-3').classList.remove('fa-regular');
        document.getElementById('star-3').classList.add('fa-solid');
        document.getElementById('star-3').style.color = '#DBA800';

        document.getElementById('star-4').classList.remove('fa-regular');
        document.getElementById('star-4').classList.add('fa-solid');
        document.getElementById('star-4').style.color = '#DBA800';

        if (document.getElementById('star-5').classList.contains('fa-solid')) {
            document.getElementById('star-5').classList.add('fa-regular');
            document.getElementById('star-5').classList.remove('fa-solid');
            document.getElementById('star-5').style.backgroundColor= 'white';
            document.getElementById('star-5').style.color= 'black';
        }
    }

    if (stars == 5) {
        star=5;
        document.getElementById('star-1').classList.remove('fa-regular');
        document.getElementById('star-1').classList.add('fa-solid');
        document.getElementById('star-1').style.color = '#DBA800';

        document.getElementById('star-2').classList.remove('fa-regular');
        document.getElementById('star-2').classList.add('fa-solid');
        document.getElementById('star-2').style.color = '#DBA800';

        document.getElementById('star-3').classList.remove('fa-regular');
        document.getElementById('star-3').classList.add('fa-solid');
        document.getElementById('star-3').style.color = '#DBA800';

        document.getElementById('star-4').classList.remove('fa-regular');
        document.getElementById('star-4').classList.add('fa-solid');
        document.getElementById('star-4').style.color = '#DBA800';

        document.getElementById('star-5').classList.remove('fa-regular');
        document.getElementById('star-5').classList.add('fa-solid');
        document.getElementById('star-5').style.color = '#DBA800';
    }


}

function AddReview(order_id)
{
    let comment=document.getElementById('comments').value;
    console.log(star);
    $.ajax({
        url: "e_com.php",
        type: 'POST',
        
        data: { 'functionname': 'AddReview', 'arguments': [order_id,star,comment] },
        success: function (d) {
                if(d!="0")
                {
                    document.getElementById('submit-review-alert').style.display='flex';
                    if(document.getElementById('submit-review-alert').classList.contains('alert-danger'))
                    {
                        document.getElementById('submit-review-alert').classList.remove('alert-danger');
                    }
                    document.getElementById('submit-review-alert').classList.add('alert-success');
                    document.getElementById('submit-review-alert').innerText=d;
                }
                else
                {
                    document.getElementById('submit-review-alert').style.display='flex';
                    if(document.getElementById('submit-review-alert').classList.contains('alert-success'))
                    {
                        document.getElementById('submit-review-alert').classList.remove('alert-success');
                    }
                    document.getElementById('submit-review-alert').classList.add('alert-danger');
                    document.getElementById('submit-review-alert').innerText='Please fill out both fields';

                }

        }
    })
}
function admin_signup()
{
    let username=document.getElementById('u_name').value;
    let password=document.getElementById('u_pass').value;
    $.ajax({
    url: "e_com.php",
    type: 'POST',
    
    data: { 'functionname': 'Admin_signup', 'arguments': [username,password] },
    success: function (d) {
        if(d=='Account Registered Successfully')
        {
            document.getElementById('msg').style.display='flex';
               if(document.getElementById('msg').classList.contains('alert-warning'))
               {
                document.getElementById('msg').classList.remove('alert-warning');
               }
               document.getElementById('msg').classList.add('alert-success');
               document.getElementById('msg').innerText=d;

        }
        else
        {
            document.getElementById('msg').style.display='flex';
            if(document.getElementById('msg').classList.contains('alert-success'))
            {
             document.getElementById('msg').classList.remove('alert-success');
            }
            document.getElementById('msg').classList.add('alert-warning');
            document.getElementById('msg').innerText=d;
        }

    }
})

}

function adminlogin()
{
    let u = document.getElementById('u_name').value;
    let p = document.getElementById('u_pass').value;
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'adminlogin', 'arguments': [u, p] },
        success: function (d) {

            if (d == "yes") {
                document.getElementById('msg').style.display = 'block';
                document.getElementById('msg').innerText = 'Incorrect username or password';
            }
            else {

                var date = new Date();
                date.setTime(date.getTime() + (2 * 60 * 60 * 1000));
                var expires = date.toGMTString();

                document.cookie = "admin_username=" + d + ";expires=" + expires + "; path=/";
                let name = '';
                if(d=='admin')
                {
                window.location.href = 'admin_dashboard.html';
                }
                else
                {
                    window.location.href='moderator_dashboard.html';
                }
                
            }
        }
    });
}
function DeleteAdminLoginCookie() {
    document.cookie = "admin_username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = 'admin_signin.html';
}
function SendMessage()
{
    let email=document.getElementById('email').value;
    let message=document.getElementById('message').value;
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'SendMessage', 'arguments': [email, message] },
        success: function (d) {
                 if(d!="0")
                 {
                    document.getElementById('msg').style.display='flex';
                    if(document.getElementById('msg').classList.contains('alert-danger'))
                    {
                        document.getElementById('msg').classList.remove('alert-danger');
                    }
                    document.getElementById('msg').classList.add('alert-success');
                    document.getElementById('msg').innerText=d;
                 }
                 else
                 {
                    document.getElementById('msg').style.display='flex';
                    if(document.getElementById('msg').classList.contains('alert-success'))
                    {
                        document.getElementById('msg').classList.remove('alert-success');
                    }
                    document.getElementById('msg').classList.add('alert-danger');
                    document.getElementById('msg').innerText='Please fill out both fields';
                 }
        }
    })
}


function Make_Active_Moderator(id) {
    const options = document.querySelectorAll('.list-group-item');

    options.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(id).classList.add("active");
    let string = '';
    if (id == 'bad-reviews') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/moderator_dashboard.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

        window.location.reload();


    }
    else if (id == 'customer-queries') {
      
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/customer_queries.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

        window.location.reload();
       
    }
  
}
function Respond(message_id)
{
    let string='';


   
            string=`
            <form mehtod="post" class="d-flex flex-row  ">
        
            <div class="  border py-0 bg-light mt-5" style="border-radius: 20px;width: 450px;">
              <div class="bg-dark text-light w-100"
                style="border-top-right-radius: 20px;border-top-left-radius: 20px;text-align: center;">
                <p1 class=" py-2" style="font-size: 40px;">Customer Support</p1><br><br>
              </div>
              <span class="w-100">
                <p id="msg" class="alert w-100" style="font-size:20px;display:none"></p>
              </span><br><br>
        
              <div style="margin-left:14%">
               
               
        
        
                <i class="fa fa-message" aria-hidden="true"><input type="text" name="message" id="message" class="py-2 px-2 input-fields mb-3" style="font-family: sans-serif;" placeholder='Response'></i><br><br>
        
                <div style="  float:right;margin-right:  45%;">
                  <input type="button" value="Send Response" onclick="SendResponse('${message_id}')" class="signupButtons p-3" style="background-color: black;"><br><br>
        
                </div>
              </div>
        
            </div>
        
          </form>
            
            
            `;
            document.getElementById('p-table').innerHTML='';

            document.getElementById('p-table').innerHTML=string;

}

function SendResponse(message_id)
{
    let message=document.getElementById('message').value;
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'SendResponse', 'arguments': [message_id,message] },
        success: function (d) {
            if(d!="0")
            {
               document.getElementById('msg').style.display='flex';
               if(document.getElementById('msg').classList.contains('alert-danger'))
               {
                   document.getElementById('msg').classList.remove('alert-danger');
               }
               document.getElementById('msg').classList.add('alert-success');
               document.getElementById('msg').innerText=d;
            }
            else
            {
               document.getElementById('msg').style.display='flex';
               if(document.getElementById('msg').classList.contains('alert-success'))
               {
                   document.getElementById('msg').classList.remove('alert-success');
               }
               document.getElementById('msg').classList.add('alert-danger');
               document.getElementById('msg').innerText='Please add  a response first.';
            }
        }
    })
}

function Make_Active_Admin(id) {
    const options = document.querySelectorAll('.list-group-item');

    options.forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById(id).classList.add("active");
    let string = '';
    if (id == 'seller-accounts') {

        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/admin_dashboard.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

        window.location.reload();


    }
    if (id == 'buyer-accounts') {
      
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/all_buyers.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

        window.location.reload();
       
    }
    if (id == 'ban-requests') {
      
        let path = window.location.pathname;

        // Replace the desired part of the path with a new value
        path = path.replace(path, '/e_pharm.com/ban_requests.html');

        // Update the URL with the new path
        window.history.pushState(null, '', path);

        window.location.reload();
       
    }


  
}

function VisitStore(user_name)
{
    let string = '';
    string = `
                            <table class="table table-bordered table-responsive-sm  " style="width:600px">
                                <thead class="table-dark">
                                    <tr>
                                        <th></th>
                                        <th scope="col">Product ID</th>
                                        <th scope="col">Product Name</th>
                                        <th>Reviews</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody id="tableBody">

                                </tbody>
                            </table>`;

    document.getElementById('p-table').innerHTML = string;
    string = '';


     $.ajax({
         url: 'e_com.php',
         type: 'POST',
         dataType:'JSON',
         data: { 'functionname': 'VisitStore', 'arguments': [user_name] },
         success: function (d) {
               
             $.each(d, function (key, value) {
                    string+= `
                    <tr>
                      <td><img style="width:80px" src="site-images/${user_name}${value["product_id"]}.png"></img></td>
                      <td>${value["product_id"]}</td>
                      <td>${value["pname"]}</td>
                      <td id="${value["product_id"]}"></td>
                      <td><input type="button"  value="Delete Item" class="product-button p-3" onclick="DeleteItem('${value["product_id"]}')"></td>
                     </tr>
                    
                    `;
                   
                    $('#tableBody').append(string);

                    a=value["product_id"];
                        $.ajax({
                        url: 'e_com.php',
                        type: 'POST',
                        dataType: 'JSON',
                        data: { 'functionname': 'GetProductReviews', 'arguments': [a] },
                        success: function (d) {

                                if(d[0]["AVG(r.stars)"]!=null)
                                {
                                 document.getElementById(d[0]["product_id"]).innerText=d[0]["AVG(r.stars)"];
                                }
                                else
                                {
                                    document.getElementById(d[0]["product_id"]).innerText='-';

                                }
                           

                        }
                    })
                    string='';


                  
                    
             });
             
            
                    
         }
     })

}

function DeleteItem(product_id)
{
    $.ajax({
        url: 'e_com.php',
        type: 'POST',
        data: { 'functionname': 'DeleteItem', 'arguments': [product_id] },
        success: function (d) {
           alert(d);
        }
    })
}
function DisplaySubmitBanRequest(username)
{
 //do something
 string=`
 <form mehtod="post" class="d-flex flex-row  ">

 <div class="  border py-0 bg-light mt-5" style="border-radius: 20px;width: 450px;">
   <div class="bg-dark text-light w-100"
     style="border-top-right-radius: 20px;border-top-left-radius: 20px;text-align: center;">
     <p1 class=" py-2" style="font-size: 40px;">Ban Request</p1><br><br>
   </div>
   <span class="w-100">
     <p id="msg" class="alert w-100" style="font-size:20px;display:none"></p>
   </span><br><br>

   <div style="margin-left:14%">
    
    


     <i class="fa fa-message" aria-hidden="true"><input type="text" name="message" id="ban-reason" class="py-2 px-2 input-fields mb-3" style="font-family: sans-serif;" placeholder='Add Reason'></i><br><br>

     <div style="  float:right;margin-right:  45%;">
       <input type="button" value="Submit Request" onclick="SubmitBanRequest('${username}')" class="signupButtons p-3" style="background-color: black;"><br><br>

     </div>
   </div>

 </div>

</form>
 
 
 `;
 document.getElementById('p-table').innerHTML='';

 document.getElementById('p-table').innerHTML=string;
}
function SubmitBanRequest(username)
{
    let reason=document.getElementById('ban-reason').value;
    let moderator = document.getElementById('s_name').innerText;
    moderator = moderator.replace('Hi, ', '');

    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'SubmitBanRequest', 'arguments': [username,reason,moderator] },
        success: function (d) {
                 if(d!="0")
                 {
                    document.getElementById('msg').style.display='flex';
                    if(document.getElementById('msg').classList.contains('alert-danger'))
                    {
                        document.getElementById('msg').classList.remove('alert-danger');
                    }
                    document.getElementById('msg').classList.add('alert-success');
                    document.getElementById('msg').innerText=d;
                 }
                 else
                 {
                    document.getElementById('msg').style.display='flex';
                    if(document.getElementById('msg').classList.contains('alert-success'))
                    {
                        document.getElementById('msg').classList.remove('alert-success');
                    }
                    document.getElementById('msg').classList.add('alert-danger');
                    document.getElementById('msg').innerText='Please add a proper reason';
                 }
        }
    })
}
function BanAccount(username)
{
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'BanSeller','arguments': [username] },
        success: function (d) {
            if(document.getElementById('ban'+username).value!='Banned')
            {
            document.getElementById('ban'+username).value='Banned';
            document.getElementById('ban'+username).style.backgroundColor='red';
            }
            else
            {
                document.getElementById('ban'+username).value='Ban Account';
                document.getElementById('ban'+username).style.backgroundColor='seagreen';
            }
        }
    }) 
}
function DismissBanRequest(username)
{
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'DismissBanRequest','arguments': [username] },
        success: function (d) {
            document.getElementById('dismiss'+username).value='Dismissed';
            document.getElementById('dismiss'+username).style.backgroundColor='red';
            document.getElementById('dismiss'+username).disabled=true;
        }
    }) 
}

function BanBuyerAccount(username)
{
    $.ajax({
        url: 'e_com.php',
        type: "POST",
        data: { 'functionname': 'BanBuyer','arguments': [username] },
        success: function (d) {
            if(document.getElementById('ban'+username).value!='Banned')
            {
            document.getElementById('ban'+username).value='Banned';
            document.getElementById('ban'+username).style.backgroundColor='red';
            }
            else
            {
                document.getElementById('ban'+username).value='Ban Account';
                document.getElementById('ban'+username).style.backgroundColor='seagreen';
            }
        }
    }) 
}