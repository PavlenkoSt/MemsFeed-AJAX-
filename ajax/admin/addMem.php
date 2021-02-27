<?php
    include '../elems/connect.php';
    
    $getQuery = "SELECT * FROM categories";
    $result = mysqli_query($link, $getQuery) or die(mysqli_error($link));
    for($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);

    if(!empty($_POST['category']) && !empty($_POST['url'])){
        $date = date('Y-m-d');
        $setQuery = "INSERT INTO mems (url, category_id, date, likes) 
        VALUES ('{$_POST['url']}', '{$_POST['category']}', '$date', '0')";
        mysqli_query($link, $setQuery) or die(mysqli_error($link));
    }
?>
<div class="border border-primary border-3 p-4 mb-5">
    <h2>Добавить мем</h2>
    <form id="addNewMem" method="POST" action="">
        <select name="category" class="form-select mb-3">
            <?php
                foreach($data as $category):
            ?>
            <option value="<?=$category['id']?>"><?=$category['category']?></option>
            <?php
                endforeach;
            ?>
        </select>
        <div class="form-floating mb-3">
            <input  name="url" type="text" class="form-control" id="url" placeholder="URL">
            <label for="floatingPassword">URL</label>
        </div>
        <input type="submit" class="btn btn-success" value="Добавить">
    </form>
</div>