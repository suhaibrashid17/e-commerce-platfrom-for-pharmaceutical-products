<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Include library files 
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
$hostName = "localhost";
$userName = "root";
$password = "";
$databaseName = "e_comm_pharma";
$conn = mysqli_connect($hostName, $userName, $password, $databaseName);
// Check connection
if (!$conn) {
  die("Connection failed: " . mysqli_connect_error());
}


if ($_POST["functionname"] == 'buyer_signup') {
  $fname = $_POST["arguments"][0];
  $lname = $_POST["arguments"][1];
  $phone = $_POST["arguments"][2];
  $dob = $_POST["arguments"][3];

  $city = $_POST["arguments"][4];
  $address = $_POST["arguments"][5];
  $gender = $_POST["arguments"][6];
  $username = $_POST["arguments"][7];
  $Password = $_POST["arguments"][8];
  $cnic = $_POST["arguments"][9];
  if (!empty($fname) && !empty($lname) && !empty($phone) && !empty($dob) && !empty($city) && !empty($address) && !empty($gender) && !empty($username) && !empty($Password)) {
    try {
      $sql = "INSERT INTO registered_buyers VALUES('$fname','$lname','$phone','$cnic','$username','$gender','$dob','$city','$address','$Password',0)";
      mysqli_query($conn, $sql);
      echo "Account Registered Successfully";

    } catch (Exception $e) {
      if ($e->getCode() == 1062) {
        echo "A user with this username already exists";
      }
    }

  } else {
    echo "One or more fields are empty!";
  }
}


if ($_POST["functionname"] == 'seller_signup') {
  $pname = $_POST["arguments"][0];
  $oname = $_POST["arguments"][1];
  $phone = $_POST["arguments"][2];

  $city = $_POST["arguments"][3];
  $address = $_POST["arguments"][4];
  $username = $_POST["arguments"][5];
  $Password = $_POST["arguments"][6];
  $cnic = $_POST["arguments"][7];
  if (!empty($pname) && !empty($oname) && !empty($phone) && !empty($city) && !empty($address) && !empty($username) && !empty($Password) && !empty($cnic)) {
    try {
      $sql = "INSERT INTO registered_sellers VALUES('$pname','$phone','$username','$city','$address','$cnic','$Password','$oname',0)";
      mysqli_query($conn, $sql);
      echo "Account Registered Successfully";
    } catch (Exception $e) {
      if ($e->getCode() == 1062) {
        echo "A user with this username already exists";
      }
    }

  } else {
    echo "One or more fields are empty!";
  }
}


if ($_POST["functionname"] == 'GetAllBuyers') {
  $sql = "SELECT  * FROM registered_buyers";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }

  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'GetAllSellers') {
  $sql = "SELECT  * FROM registered_sellers";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }

  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'DropBuyer') {
  $u = $_POST["arguments"][0];
  $sql = "DELETE FROM registered_buyers WHERE username='$u'";
  mysqli_query($conn, $sql);
  echo "Buyer dropped. Refresh to see updated list of buyers";
}


if ($_POST["functionname"] == 'DropSeller') {
  $user = $_POST["arguments"][0];
  $sql = "DELETE FROM registered_sellers WHERE user_name='$user'";
  mysqli_query($conn, $sql);
  echo "Seller dropped. Refresh to see updated list of sellers";
}


if ($_POST["functionname"] == 'buyerlogin') {
  $user = $_POST["arguments"][0];
  $pass = $_POST["arguments"][1];
  $sql = "SELECT * FROM registered_buyers WHERE username='$user' and password_='$pass'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    if ($arr[0]["status"] == 0) {
      $temp = $arr[0]["username"];
      echo $temp;
    } else {
      echo "Your account has been banned.";
    }
  } else {
    echo "yes";
  }
}


if ($_POST["functionname"] == 'sellerlogin') {
  $user = $_POST["arguments"][0];
  $pass = $_POST["arguments"][1];
  $sql = "SELECT user_name,account_status FROM registered_sellers WHERE user_name='$user' and password_='$pass'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    if ($arr[0]["account_status"] == 0 || $arr[0]["account_status"] == 1) {
      $temp = $arr[0]["user_name"];
      echo $temp;
    } else {
      echo "Your account has been banned.";
    }
  } else {
    echo "yes";
  }
}


if ($_POST["functionname"] == 'get_seller_p_info') {
  $user = $_POST["arguments"][0];
  $sql = "SELECT * From registered_sellers where user_name='$user'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}


if ($_POST["functionname"] == 'get_buyer_p_info') {
  $user = $_POST["arguments"][0];
  $sql = "SELECT * From registered_buyers where username='$user'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}


if ($_POST["functionname"] == 'Addproducttostore') {
  $pname = $_POST["pname"];
  $price = $_POST["price"];

  $inventory = $_POST["inventory"];
  $desc = $_POST["desc"];
  $user = $_POST["user"];
  $category = $_POST["category"];

  $temp = uniqid();

  if (!empty($_FILES["image"]["name"]) && !empty($pname) && !empty($price) && !empty($inventory) && !empty($desc) && !empty($user) && !empty($category)) {
    $target_dir = "site-images/";
    $target_file = $target_dir . basename($user . "{$temp}" . ".png");
    $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if ($check !== false) {
      $uploadOk = 1;
    } else {
      echo "File is not an image.";
      $uploadOk = 0;
    }

    if ($_FILES["image"]["size"] > 500000) {
      echo "Sorry, your file is too large.";
      $uploadOk = 0;
    }

    // Allow certain file formats
    if ($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg") {
      echo "Sorry, only JPG, JPEG& PNG files are allowed.";
      $uploadOk = 0;
    }

    if ($uploadOk == 0) {
      echo "Sorry, your file was not uploaded.";
    } else {
      move_uploaded_file($_FILES["image"]["tmp_name"], $target_file);

      $sql = "INSERT INTO products VALUES ('$pname', '$price', '$inventory', '$desc', '$user','$temp','$category')";
      mysqli_query($conn, $sql);
      echo "Product Added";
    }
  } else {
    echo "one or more fields are empty";
  }
}


if ($_POST["functionname"] == 'GetProductsForSeller') {
  $user = $_POST["arguments"][0];
  $sql = "SELECT pname,price,product_id FROM products WHERE username='$user'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }
    echo json_encode($arr);
  }
}


if ($_POST["functionname"] == 'displayProductsToBuyer') {
  $product = $_POST["arguments"][0];
  $city = $_POST["arguments"][1];
  $filter = $_POST["arguments"][2];
  if ($filter == 0) {
    $sql = "SELECT p.pname,p.username,p.price,p.product_id FROM products p JOIN registered_sellers s ON p.username=s.user_name  WHERE (p.pname LIKE '%$product%' OR s.PharmName LIKE '%$product%') and s.City='$city'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $arr = array();
      while ($value = mysqli_fetch_assoc($result)) {
        array_push($arr, $value);
      }
    }
  }
  if ($filter == 1) {
    $sql = "SELECT p.pname,p.username,p.price,p.product_id FROM products p JOIN registered_sellers s ON p.username=s.user_name  WHERE (p.pname LIKE '%$product%' OR s.PharmName LIKE '%$product%') and s.City='$city' ORDER BY p.price ASC";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $arr = array();
      while ($value = mysqli_fetch_assoc($result)) {
        array_push($arr, $value);
      }
    }
  }
  if ($filter == 2) {
    $sql = "SELECT p.pname,p.username,p.price,p.product_id FROM products p JOIN registered_sellers s ON p.username=s.user_name  WHERE (p.pname LIKE '%$product%' OR s.PharmName LIKE '%$product%') and s.City='$city' ORDER BY p.price DESC";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $arr = array();
      while ($value = mysqli_fetch_assoc($result)) {
        array_push($arr, $value);
      }
    }
  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'GetProductDetails') {
  $product = $_POST["arguments"][0];
  $sql = "SELECT p.product_id,p.pname,p.price,p.inventory,p.description,s.PharmName,s.Phone_no,p.username FROM products p JOIN registered_sellers s ON p.username=s.user_name  WHERE product_id='$product'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'AddProductToCart') {
  $uname = $_POST["arguments"][0];
  $productId = $_POST["arguments"][1];
  $quantity = $_POST["arguments"][2];
  $sql = "SELECT inventory FROM products where product_id='$productId'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $val = mysqli_fetch_assoc($result);
    $temp = $val["inventory"];
  }
  if ($quantity <= $temp) {
    $sql = "INSERT INTO cart VALUES('$productId','$uname','$quantity')";
    mysqli_query($conn, $sql);
    $sql = "UPDATE products SET inventory=inventory-'$quantity' WHERE product_id='$productId'";
    mysqli_query($conn, $sql);
    echo "Product added to Cart successfully.";
  } else {
    echo "The quantity entered is greater than the items in inventory.";
  }
}


if ($_POST["functionname"] == 'DisplayCart') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT p.username,p.product_id,p.pname,p.price,SUM(c.Quantity) FROM products p JOIN cart c ON p.product_id=c.Product_id WHERE c.Buyer_uname='$username' GROUP BY p.product_id";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }
    echo json_encode($arr);
  }

}


if ($_POST["functionname"] == 'DeleteFromCart') {
  $product_id = $_POST['arguments'][0];
  $sql = "SELECT SUM(Quantity) FROM cart where Product_id='$product_id' GROUP BY Product_id";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $val = mysqli_fetch_assoc($result);
    $temp = $val["SUM(Quantity)"];
  }
  $sql = "UPDATE products SET inventory=inventory+'$temp' WHERE product_id='$product_id' ";
  mysqli_query($conn, $sql);
  $sql = "DELETE FROM cart where Product_id='$product_id'";
  mysqli_query($conn, $sql);

  echo "Item Deleted. Refresh to see changes.";
}


if ($_POST["functionname"] == 'GetProductsForCheckout') {
  $userName = $_POST["arguments"][0];
  $sql = "SELECT p.username,p.product_id,p.pname,p.price,SUM(c.Quantity) FROM products p, cart c where c.Product_id=p.product_id and c.Buyer_uname='$userName' GROUP BY c.Product_id;";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }
    echo json_encode($arr);
  }


}


if ($_POST["functionname"] == 'AddProductToWishlist') {
  $product_id = $_POST["arguments"][0];
  $username = $_POST["arguments"][1];
  $sql = "INSERT INTO wishlist VALUES('$product_id','$username')";
  mysqli_query($conn, $sql);
  echo "Added to wishlist";

}


if ($_POST["functionname"] == 'DeleteProductFromWishlist') {
  $product_id = $_POST["arguments"][0];
  $username = $_POST["arguments"][1];
  $sql = "DELETE FROM wishlist WHERE product_id='$product_id' and buyer_username='$username'";
  mysqli_query($conn, $sql);
  echo "Removed from wishlist";

}

if ($_POST["functionname"] == 'ExistsInWishlist') {
  $product_id = $_POST["arguments"][0];
  $username = $_POST["arguments"][1];
  $sql = "SELECT * FROM wishlist WHERE product_id='$product_id' and buyer_username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    echo "1";
  } else {

    echo "0";
  }
}

if ($_POST["functionname"] == 'GetProductsForWishlist') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT p.username,p.pname,p.product_id,p.price,p.category FROM products p JOIN wishlist  w ON p.product_id=w.product_id WHERE w.buyer_username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }
    echo json_encode($arr);
  }


}


if ($_POST["functionname"] == 'GetReciept') {
  $arr = array();
  $username = $_POST["arguments"][1];
  for ($i = 0; $i < count($_POST["arguments"][0]); $i++) {
    $product = $_POST["arguments"][0][$i];
    $sql = "SELECT p.pname,SUM(c.Quantity),Sum(c.Quantity)*p.price,p.product_id,p.username FROM products p JOIN cart c on p.product_id=c.Product_id WHERE p.product_id='$product' and c.Buyer_uname='$username' GROUP BY c.Product_id;";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {

      while ($val = mysqli_fetch_assoc($result)) {
        array_push($arr, $val);
      }

    }
  }
  echo json_encode($arr);

}


if ($_POST["functionname"] == 'GetBuyerCity') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT City from registered_buyers WHERE username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }

  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'GetBuyerAddress') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT b.Address from registered_buyers b WHERE b.username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($val = mysqli_fetch_assoc($result)) {
      array_push($arr, $val);
    }

  }
  echo json_encode($arr);
}


if ($_POST["functionname"] == 'PlaceOrder') {
  $buyer_username = $_POST["arguments"][0];
  $buyer_address = $_POST["arguments"][1];
  $buyer_city = $_POST["arguments"][2];
  $payment = $_POST["arguments"][4];
  for ($i = 0; $i < count($_POST["arguments"][3]); $i++) {
    $product = $_POST["arguments"][3][$i];
    $sql = "SELECT SUM(Quantity) FROM cart  where Product_id='$product' GROUP BY Product_id";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {
      $arr = mysqli_fetch_assoc($result);
      $sum = $arr['SUM(Quantity)'];
      $sql = "INSERT INTO orders(productId,buyer_username) VALUES('$product','$buyer_username')";
      mysqli_query($conn, $sql);
      $order_id = mysqli_insert_id($conn);
      $sql = "INSERT INTO order_details VALUES('$order_id','$sum','$payment','$buyer_address','$buyer_city','pending',0)";
      mysqli_query($conn, $sql);
      $sql = "DELETE FROM cart WHERE Product_id='$product'";
      mysqli_query($conn, $sql);

    }
  }
  echo "Your Order Has Been Placed";
}

if ($_POST["functionname"] == 'UpdateSellerInfo') {
  $username = $_POST["arguments"][0];
  $PName = $_POST["arguments"][1];
  $OName = $_POST["arguments"][2];
  $cnic = $_POST["arguments"][3];
  $phone = $_POST["arguments"][4];
  $address = $_POST["arguments"][5];
  $city = $_POST["arguments"][6];
  if (!empty($PName) && !empty($OName) && !empty($cnic) && !empty($phone) && !empty($address) && !empty($city)) {
    $sql = "UPDATE registered_sellers SET PharmName='$PName',owner_name='$OName',cnic_no='$cnic',Phone_no='$phone',Address='$address',City='$city' WHERE user_name='$username'";
    mysqli_query($conn, $sql);
    echo "Infomation Updated Successfully";
  } else {
    echo '0';
  }
}


if ($_POST["functionname"] == 'GetProductInfoForSeller') {
  $product = $_POST["arguments"][0];
  $sql = "SELECT pname,price,inventory,description,category FROM products WHERE product_id='$product'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }




}

if ($_POST["functionname"] == 'UpdateProductInfo') {
  $product_id = $_POST["arguments"][0];
  $product_name = $_POST["arguments"][1];
  $price = $_POST["arguments"][2];
  $desc = $_POST["arguments"][3];
  $inventory = $_POST["arguments"][4];
  $category = $_POST["arguments"][5];
  $sql = "UPDATE products SET pname='$product_name',price='$price',description='$desc',inventory='$inventory',category='$category' WHERE product_id='$product_id'";

  mysqli_query($conn, $sql);
  echo "Information Updated Successfully!";
}

if ($_POST["functionname"] == 'get_current_orders') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT o.orderId,p.pname,p.price,ord.quantity,ord.Status FROM orders o JOIN order_details ord ON o.orderId=ord.orderId JOIN products p ON o.productId=p.product_id WHERE o.buyer_username='$username' and (Status='pending' OR Status='On your Way')";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }

}

if ($_POST["functionname"] == 'get_active_orders') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT p.pname,ord.quantity,ord.delivery_Address,ord.payment_method,o.buyer_username,o.orderId FROM orders o JOIN order_details ord ON o.orderId= ord.orderId JOIN products p ON o.productId=p.product_id JOIN registered_sellers s ON p.username=s.user_name WHERE s.user_name='$username' and ord.status='pending'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'AddRiderDetails') {
  $order_id = $_POST["arguments"][0];
  $biker_name = $_POST["arguments"][1];
  $motorcycle_number = $_POST["arguments"][2];
  $uber_link = $_POST["arguments"][3];
  if (!empty($biker_name) && !empty($motorcycle_number) && !empty($uber_link)) {
    $sql = "INSERT INTO riderdetails VALUES('$order_id','$biker_name','$motorcycle_number','$uber_link')";
    mysqli_query($conn, $sql);
    $sql = "UPDATE order_details SET Status='On Your Way' WHERE orderId='$order_id'";
    mysqli_query($conn, $sql);
    echo "Customer Notified Successully!";

  } else {
    echo '0';
  }

}

if ($_POST["functionname"] == 'DisplayRiderInfo') {
  $order_id = $_POST["arguments"][0];
  $sql = "SELECT rider_name,rider_bike_number,uber_link FROM riderdetails WHERE orderId='$order_id'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'MarkRecieved') {
  $order_id = $_POST["arguments"][0];
  $sql = "UPDATE order_details SET Status='recieved' WHERE orderId='$order_id' ";
  mysqli_query($conn, $sql);
  echo "Marked Received Successfully!";
}

if ($_POST["functionname"] == 'get_completed_orders') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT ord.review_status,o.orderId,p.pname,p.price,ord.quantity,ord.Status FROM orders o JOIN order_details ord ON o.orderId=ord.orderId JOIN products p ON o.productId=p.product_id WHERE o.buyer_username='$username' and (Status='recieved') ORDER BY review_status ASC";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }

}

if ($_POST["functionname"] == 'AddReview') {
  $order_id = $_POST["arguments"][0];
  $star = $_POST["arguments"][1];
  $comment = $_POST["arguments"][2];
  if ($star != 0 && !empty($comment)) {
    $sql = "SELECT productId FROM orders WHERE orderId='$order_id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {

      $row = mysqli_fetch_array($result);
      $product_id = $row[0];
    }
    $sql = "INSERT INTO reviews VALUES('$order_id','$star','$comment','$product_id')";
    mysqli_query($conn, $sql);
    $sql = "UPDATE order_details SET review_status=1 WHERE orderId='$order_id'";
    mysqli_query($conn, $sql);
    echo "Review Added Successfully!";
  } else {
    echo "0";
  }
}

if ($_POST["functionname"] == 'get_seller_completed_orders') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT o.orderId,p.product_id,ord.review_status,p.pname FROM registered_sellers s JOIN products p on s.user_name=p.username JOIN orders o on p.product_id=o.productId JOIN order_details ord ON ord.orderId=o.orderId  WHERE s.user_name='$username' and ord.Status='recieved'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }

}

if ($_POST["functionname"] == 'get_reviews') {
  $order_id = $_POST["arguments"][0];
  $sql = "SELECT stars,comment FROM reviews WHERE orderId='$order_id'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'Admin_signup') {

  $username = $_POST["arguments"][0];
  $Password = $_POST["arguments"][1];
  if (!empty($username) && !empty($Password)) {
    try {
      $sql = "INSERT INTO admin VALUES('$username','$Password','moderator')";
      mysqli_query($conn, $sql);
      echo "Account Registered Successfully";

    } catch (Exception $e) {
      if ($e->getCode() == 1062) {
        echo "A user with this username already exists";
      }
    }

  } else {
    echo "One or more fields are empty!";
  }
}

if ($_POST["functionname"] == 'adminlogin') {
  $user = $_POST["arguments"][0];
  $pass = $_POST["arguments"][1];
  $sql = "SELECT * FROM admin WHERE username='$user' and password='$pass'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    $temp = $arr[0]["username"];
    echo $temp;
  } else {
    echo "yes";
  }
}

if ($_POST["functionname"] == 'SendMessage') {
  $email = $_POST["arguments"][0];
  $message = $_POST["arguments"][1];
  $date = date("Y-m-d");
  $time = date("H:i:s");
  if (!empty($email) && !empty($message)) {
    $sql = "INSERT INTO customermessages(email,message,date,time) VALUES('$email','$message','$date','$time')";
    mysqli_query($conn, $sql);
    echo "Thank You for you message.Our team will contact you shortly.";
  } else {
    echo "0";
  }

}

if ($_POST["functionname"] == 'GetCustomerQueries') {
  $sql = "SELECT * FROM customermessages ORDER BY date,time ";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }

}

if ($_POST["functionname"] == 'SendResponse') {
  $message_id = $_POST["arguments"][0];
  $response = $_POST["arguments"][1];
  if (!empty($response)) {
    $sql = "SELECT email FROM customermessages WHERE message_id='$message_id'";
    $result = mysqli_query($conn, $sql);
    if (mysqli_num_rows($result) > 0) {

      $row = mysqli_fetch_array($result);
      $reciever_mail = $row[0];
    }


    $mail = new PHPMailer(1);


    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'epharm10@gmail.com';
    $mail->Password = 'exhvejtzhhmqwsui';
    $mail->SMTPSecure = 'tls'; // Enable TLS encryption, `ssl` also accepted 
    $mail->Port = 587; // TCP port to connect to 


    // Sender info 
    $mail->setFrom('epharm10@gmail.com', 'epharm-customer-support');

    // Add a recipient 
    $mail->addAddress($reciever_mail);

    $mail->Subject = 'Query Response';
    $mail->Body = $response;

    // Send the email
    try {
      $mail->send();
      $sql = "DELETE FROM customermessages where message_id='$message_id'";
      mysqli_query($conn, $sql);
      echo 'Email sent successfully!';
    } catch (Exception $e) {
      echo 'Error: ' . $e->getMessage();
    }

  } else {
    echo "0";
  }
}

if ($_POST["functionname"] == 'GetSellers') {
  $sql = "SELECT PharmName,owner_name,user_name,Phone_no,City FROM  registered_sellers";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}
if ($_POST["functionname"] == 'VisitStore') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT product_id,pname,username FROM  products WHERE username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'GetSellerReviews') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT s.user_name,AVG(r.stars) FROM registered_sellers s JOIN products p ON p.username=s.user_name JOIN orders o ON o.productId=p.product_id JOIN reviews r ON r.orderId=o.orderId WHERE s.user_name='$username';";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  } else {
    echo "0";
  }
}
if ($_POST["functionname"] == 'GetProductReviews') {
  $product_id = $_POST["arguments"][0];
  $sql = "SELECT p.product_id,AVG(r.stars) FROM products p JOIN reviews r ON r.product_id=p.product_id WHERE p.product_id='$product_id';
  ;";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  } else {
    echo "0";
  }
}

if ($_POST["functionname"] == 'DeleteItem') {
  $product_id = $_POST["arguments"][0];
  $sql = "DELETE FROM products WHERE product_id='$product_id'";
  mysqli_query($conn, $sql);
  echo "Deleted Successfully";
}

if ($_POST["functionname"] == 'GetBuyers') {
  $sql = "SELECT FName,LName,username,PhoneNo,City FROM  registered_buyers";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'GetBadSellerReviews') {
  $sql = "SELECT s.PharmName,s.owner_name,s.City,s.user_name,(SELECT AVG(r.stars) FROM reviews r WHERE EXISTS( SELECT* FROM products p WHERE p.username=s.user_name AND EXISTS( SELECT * FROM orders o WHERE o.productId=p.product_id AND EXISTS( SELECT * FROM reviews r WHERE r.orderId=o.orderId HAVING AVG(r.stars)<3 ) ) ) )AS avg FROM registered_sellers s WHERE EXISTS( SELECT* FROM products p WHERE p.username=s.user_name AND EXISTS( SELECT * FROM orders o WHERE o.productId=p.product_id AND EXISTS( SELECT * FROM reviews r WHERE r.orderId=o.orderId HAVING AVG(r.stars)<3 ) ) )";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'SubmitBanRequest') {
  date_default_timezone_set('Asia/Karachi');
  $date = date("Y-m-d");
  $time = date("H:i:s");
  $seller = $_POST["arguments"][0];
  $reason = $_POST["arguments"][1];
  $moderator = $_POST["arguments"][2];
  $sql = "INSERT INTO ban_requests VALUES('$moderator','$seller','$reason','$date','$time')";
  if (!empty($reason)) {
    mysqli_query($conn, $sql);
    $sql = "UPDATE registered_sellers SET account_status=1 WHERE user_name='$seller'";
    mysqli_query($conn, $sql);
    echo "Ban Request Submitted!";
  } else {
    echo "0";
  }
}

if ($_POST["functionname"] == 'GetAccountStatus') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT account_status FROM registered_sellers  WHERE user_name='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'GetBuyerAccountStatus') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT status FROM registered_buyers  WHERE username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}


if ($_POST["functionname"] == 'GetBanRequests') {
  $sql = "SELECT s.PharmName,s.owner_name,s.City,s.user_name,b.ban_reason,s.Phone_no,b.date,b.time FROM registered_sellers s JOIN ban_requests b ON s.user_name=b.seller_username";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    echo json_encode($arr);
  }
}

if ($_POST["functionname"] == 'BanSeller') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT account_status FROM registered_sellers WHERE user_name='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    $status = $arr[0]["account_status"];
    if ($status == 2) {
      $sql = "UPDATE registered_sellers SET account_status=0 WHERE user_name='$username'";
      mysqli_query($conn, $sql);
    } else {
      $sql = "UPDATE registered_sellers SET account_status=2 WHERE user_name='$username'";
      mysqli_query($conn, $sql);

    }
  }

}

if ($_POST["functionname"] == 'DismissBanRequest') {
  $username = $_POST["arguments"][0];

  $sql = "UPDATE registered_sellers SET account_status=0 WHERE user_name='$username' ";
  mysqli_query($conn, $sql);
  $sql = "DELETE FROM ban_requests WHERE seller_username='$username'";
  mysqli_query($conn, $sql);
}

if ($_POST["functionname"] == 'UpdateBuyerInfo') {
  $username = $_POST["arguments"][0];
  $fname = $_POST["arguments"][1];
  $lname = $_POST["arguments"][2];
  $cnic = $_POST["arguments"][3];
  $dob = $_POST["arguments"][4];
  $phone = $_POST["arguments"][5];
  $gender = $_POST["arguments"][6];
  $address = $_POST["arguments"][7];
  $city = $_POST["arguments"][8];
  if (!empty($fname) || !empty($lname) || !empty($cnic) || !empty($dob) || !empty($phone) || !empty($gender) || !empty($address) || !empty($city)) {
    $sql = "UPDATE registered_buyers SET FName='$fname' ,LName='$lname',PhoneNo='$phone',CNIC='$cnic',Gender='$gender',Date_of_birth='$dob',City='$city',Address='$address' WHERE username='$username'";
    mysqli_query($conn, $sql);
    echo "Infomation Updated Successfully";

  } else {
    echo '0';
  }
}

if ($_POST["functionname"] == 'BanBuyer') {
  $username = $_POST["arguments"][0];
  $sql = "SELECT status FROM registered_buyers WHERE username='$username'";
  $result = mysqli_query($conn, $sql);
  if (mysqli_num_rows($result) > 0) {
    $arr = array();
    while ($value = mysqli_fetch_assoc($result)) {
      array_push($arr, $value);
    }
    $status = $arr[0]["status"];
    if ($status == 1) {
      $sql = "UPDATE registered_buyers SET status=0 WHERE username='$username'";
      mysqli_query($conn, $sql);
    } else {
      $sql = "UPDATE registered_buyers SET status=1 WHERE username='$username'";
      mysqli_query($conn, $sql);

    }
  }

}
?>