<?php
    include 'elems/connect.php';
    if(!empty($_POST['newCategory'])){
        $setQuery = "INSERT INTO categories SET category='{$_POST['newCategory']}'";
        mysqli_query($link, $setQuery) or die(mysqli_error($link));
    }
    if(!empty($_GET['del'])){
        $deleteQuery = "DELETE FROM categories WHERE id='{$_GET['del']}'";
        mysqli_query($link, $deleteQuery) or die(mysqli_error($link));
        $deleteQuery = "DELETE FROM mems WHERE category_id='{$_GET['del']}'";
        mysqli_query($link, $deleteQuery) or die(mysqli_error($link));
    }
    $getQuery = "SELECT * FROM categories";
    $result = mysqli_query($link, $getQuery) or die(mysqli_error($link));
    for($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
?>

<ul class="list-group">
    <?php
        foreach($data as $category):
    ?>
        <li class="list-group-item  bg-warning d-flex justify-content-between">
            <div class="form-check">
                <input checked class="form-check-input" type="checkbox" id="<?=$category['id']?>">
                <label class="form-check-label" for="<?=$category['id']?>">
                    <?=$category['category']?>
                </label>
            </div>
            <?php
                if(isset($_GET['admin'])){
                    
            ?>
                <button type="button" class="btn-close delCatBtn" aria-label="Close" data-category="<?=$category['id']?>" data-bs-toggle="modal" data-bs-target="#catModal"></button>
            <?php
                    
                }
            ?>
        </li>
    <?php
        endforeach;
        if(isset($_GET['admin'])){
            ?>
                <li class="list-group-item bg-warning">
                    <form class="border border-primary border-3 p-4 bg-white" id="addCatForm" action="">
                        <div class="form-floating mb-2">
                            <input name="newCategory" type="text" class="form-control" placeholder="Название категории">
                            <label for="floatingPassword">Название категории</label>
                        </div>
                        <input type="submit" class="btn btn-success" value="+ Добавить категорию">
                    </form>
                </li>
            <?php
        }
    ?>
</ul>