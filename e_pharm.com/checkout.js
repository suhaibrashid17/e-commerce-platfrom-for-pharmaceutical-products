let username = document.cookie.replace(/(?:(?:^|.*;\s*)buyer_username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
$.ajax({
        
    url: 'e_com.php',
    type: "POST",
    dataType: 'JSON',
    data: { 'functionname': 'GetBuyerCity', 'arguments': [username] },
    success: function (d) {
        document.getElementById('city').value=d[0]["City"];
    }
})
$.ajax({
    url: 'e_com.php',
    type: "POST",
    dataType: 'JSON',
    data: { 'functionname': 'GetProductsForCheckout', 'arguments': [username] },
    success: function (d) {
        let string = '';

        $.each(d, function (key, value) {
            let price = (parseFloat(value["price"])) * (parseFloat(value["SUM(c.Quantity)"]));
            string = string + `
            <div   class="d-flex flex-row float-left" >
             <input class="ms-3" type='checkbox' id='${value['product_id']}'>
             
             <img src="site-images/${value["username"]}${value["product_id"]}.png" style="width:7vw;height:7vw;">
             <p1 class="px-3" style="50vw">${value["pname"]}</p1>
             <div class="ms-auto"> 
             <p1 class="px-3">Rs. ${price}</p1>  
             <p1 class="px-3 me-3"> Qt= ${value["SUM(c.Quantity)"]}</p1> 
            </div>
             </div> <br>

             `

        })
        $('#checkout').append(string);
    }


})
function BackFunction() {
    document.getElementById('prev-button-for-disapperance').style.display = 'none';
    document.getElementById('next-button-for-disapperance').style.display = 'block';
    document.getElementById('payment-alert').style.display = 'none';
    document.getElementById('cart-alert').style.display = 'none';
    document.getElementById('address-alert').style.display = 'none';
    document.getElementById('reciept-table').style.display = 'none';
    document.getElementById('COD-Place-Order').style.display='none';
    document.getElementById('Card-Place-Order').style.display='none';


}
function ForwardFunction() {

    let displayRecieptCheck = true;

    const checkboxContainer = document.getElementById("checkout");

    const checkboxes = checkboxContainer.querySelectorAll("input[type='checkbox']");

    const checkedCheckboxes = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.id);
        }
    });

    document.getElementById('prev-button-for-disapperance').style.display = 'block';
    document.getElementById('next-button-for-disapperance').style.display = 'none';
    console.log(document.getElementById('cod').checked);
    //payment check
    if ((document.getElementById('cod').checked) || (document.getElementById('card').checked)) {  /*dk why the fuck is ! not working*/ }
    else {
        document.getElementById('payment-alert').style.display = 'flex';
        document.getElementById('payment-alert').innerText = 'Please Select a Payment Method';
        displayRecieptCheck = false;
    }
    //shipping address check
    console.log(document.getElementById('shipping-address').value);
    if ((document.getElementById('same-as-permanent-address').checked) || ((document.getElementById('shipping-address').value != '') &&(document.getElementById('city').value != ''))) {  /*dk why the fuck is ! not working*/ }
    else {
        document.getElementById('address-alert').style.display = 'flex';
        document.getElementById('address-alert').innerText = 'Please add a Shipping Address';
        displayRecieptCheck = false;
    }
    //cart check
    if (checkedCheckboxes.length == 0) {
        document.getElementById('cart-alert').style.display = 'flex';
        document.getElementById('cart-alert').innerText = 'Please select atleast one item from the cart';
        displayRecieptCheck = false;
    }
    if (displayRecieptCheck) {
        let total=0;
        $.ajax({
            url: 'e_com.php',
            type: "POST",
            dataType: 'JSON',
            data: { 'functionname': 'GetReciept', 'arguments': [checkedCheckboxes, username] },
            success: function (d) {
                let string = '';
                console.log(d);
                $.each(d, function (key, value) {
                    total = total+parseFloat(value["Sum(c.Quantity)*p.price"]);
                    string = string + `
                    <tr>
             
                     <td><img src="site-images/${value["username"]}${value["product_id"]}.png" style="width:7vw;height:7vw;">
                     <p1 class="px-3" style="50vw">${value["pname"]}</p1></td>
                     <td>${value["SUM(c.Quantity)"]}</td>
                     <td>${value["Sum(c.Quantity)*p.price"]} </td>
                     
                   </tr>
            

             `

                })
                
                string+= `<tr><td></td><td></td><td>Total = Rs. ${total}</td> </tr> `;

                document.getElementById('reciept').innerHTML=string;
                document.getElementById('reciept-table').style.display="block";
              
                
            }
        })
        if(document.getElementById('cod').checked)
        {
            document.getElementById('COD-Place-Order').style.display='flex';
        }
        else if(document.getElementById('card').checked)
        {
            document.getElementById('Card-Place-Order').style.display='flex';
        }
    }
}
function CODChecked() {

    let checkbox = document.querySelector('#cod');
    if (checkbox.checked) {
        document.getElementById('card').disabled = true;
    }
    else {
        document.getElementById('card').disabled = false;
    }
}
function PaymentChecked() {

    let checkbox = document.querySelector('#same-as-permanent-address');
    if (checkbox.checked) {
        document.getElementById('city').disabled = true;
        document.getElementById('shipping-address').disabled = true;
    }
    else {
        document.getElementById('city').disabled = false;
        document.getElementById('shipping-address').disabled = false;    }
}
function CardChecked() {


    let checkbox = document.querySelector('#card');
    if (checkbox.checked) {
        document.getElementById('cod').disabled = true;
    }
    else {
        document.getElementById('cod').disabled = false;
    }
}
function PlaceOrderUsingCod()
{
    const checkboxContainer = document.getElementById("checkout");
    const checkboxes = checkboxContainer.querySelectorAll("input[type='checkbox']");
    const checkedCheckboxes = [];  
    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            checkedCheckboxes.push(checkbox.id);
        }
    });
    let city=document.getElementById('city').value;
    if(document.getElementById('same-as-permanent-address').checked)
    {
       
       
       
      
        $.ajax({
            url: 'e_com.php',
            type: "POST",
            dataType: 'JSON',
            data: { 'functionname': 'GetBuyerAddress', 'arguments': [username] },
            success: function (d) {
                let Address=d[0]["Address"];
                
                $.ajax({
                    url: 'e_com.php',
                    type: "POST",
                   
                    data: { 'functionname': 'PlaceOrder', 'arguments': [username,Address,city,checkedCheckboxes,'COD'] },
                    success: function (d) {
                             document.getElementById('carouselExampleIndicators').style.display='none';
                             document.getElementById('order-placed').style.display='flex';
                    }
                })
            }
        })
    }
    else
    {
        let Address=document.getElementById('shipping-address').value;
        console.log(Address);
        $.ajax({
            url: 'e_com.php',
            type: "POST",
           
            data: { 'functionname': 'PlaceOrder', 'arguments': [username,Address,city,checkedCheckboxes,'COD'] },
            success: function (d) {
                     document.getElementById('carouselExampleIndicators').style.display='none';
                     document.getElementById('order-placed').style.display='flex';
            }
        })
    }
    

     
}
function isVisaCreditCardNumber(cardNumber) {
    return /^4\d{12}(?:\d{3})?$/.test(cardNumber);
  }
  function isMastercardCreditCardNumber(cardNumber) {
    return /^5[1-5]\d{14}$/.test(cardNumber);
  }
    
function PlaceOrderUsingCard()
{
    let card_number=document.getElementById('Card-Number').value;
    let cvv=document.getElementById('CVV').value;
    if((isVisaCreditCardNumber(card_number)||isMastercardCreditCardNumber(card_number))&&cvv.length==3)
    {

        const checkboxContainer = document.getElementById("checkout");
        const checkboxes = checkboxContainer.querySelectorAll("input[type='checkbox']");
        const checkedCheckboxes = [];  
       
        checkboxes.forEach(function (checkbox) {
            if (checkbox.checked) {
                checkedCheckboxes.push(checkbox.id);
            }
        });
        let city=document.getElementById('city').value;

    if(document.getElementById('same-as-permanent-address').checked)
    {
       
      
        $.ajax({
            url: 'e_com.php',
            type: "POST",
            dataType: 'JSON',
            data: { 'functionname': 'GetBuyerAddress', 'arguments': [username] },
            success: function (d) {
                let Address=d[0]["Address"];
                
                $.ajax({
                    url: 'e_com.php',
                    type: "POST",
                   
                    data: { 'functionname': 'PlaceOrder', 'arguments': [username,Address,city,checkedCheckboxes,'Card'] },
                    success: function (d) {
                             document.getElementById('carouselExampleIndicators').style.display='none';
                             document.getElementById('order-placed').style.display='flex';
                    }
                })
            }
        })
    }
    else
    {
        let Address=document.getElementById('shipping-address').value;
        $.ajax({
            url: 'e_com.php',
            type: "POST",
           
            data: { 'functionname': 'PlaceOrder', 'arguments': [username,Address,city,checkedCheckboxes,'Card'] },
            success: function (d) {
                     document.getElementById('carouselExampleIndicators').style.display='none';
                     document.getElementById('order-placed').style.display='flex';
            }
        })
    }
}
else
{
    if(!(isVisaCreditCardNumber(card_number)||isMastercardCreditCardNumber(card_number)))
    {
    document.getElementById('credit-card-alert').style.display='flex';
    document.getElementById('credit-card-alert').innerText='Please add a valid card number';
    }
    if(cvv.length!=3)
    {
        document.getElementById('credit-card-alert').style.display='flex';
        document.getElementById('credit-card-alert').innerText='Please enter a valid cvv';
    }

}
}
document.getElementById('prev-button-for-disapperance').style.display = 'none';