<?php
include 'elems/connect.php';
if(isset($_GET['likeId'])){
    $getQuery = "SELECT likes FROM mems WHERE id='{$_GET['likeId']}'";
    $result = mysqli_query($link, $getQuery) or die(mysqli_error($link));
    $likes = mysqli_fetch_assoc($result)['likes'];
    $likes = $likes + 1;

    $updateQuery = "UPDATE mems SET likes='$likes' WHERE id='{$_GET['likeId']}'";
    mysqli_query($link, $updateQuery) or die(mysqli_error($link));
}
if(isset($_GET['noCat'])){
    $noCat = json_decode($_GET['noCat']);
    if(count($noCat)==1){
        $notIn = " WHERE category_id!='{$noCat[0]}'";
    }elseif(count($noCat)>1){
        $str = implode("','", $noCat);
        $notIn = " WHERE category_id NOT IN ('$str')";
    }
}
if(isset($_GET['del'])){
    $deleteQuery = "DELETE FROM mems WHERE id='{$_GET['del']}'";
    mysqli_query($link, $deleteQuery) or die(mysqli_error($link));
}
if(isset($_GET['start'])){
    if(isset($_GET['noCat'])){
        $getQuery = "SELECT * FROM mems $notIn ORDER BY id DESC LIMIT {$_GET['start']}, 3";
    }else{
        $getQuery = "SELECT * FROM mems ORDER BY id DESC LIMIT {$_GET['start']}, 3";
    }
    $result = mysqli_query($link, $getQuery) or die(mysqli_error($link));
    for($data = []; $row = mysqli_fetch_assoc($result); $data[] = $row);
    if(!empty($data)){

        foreach($data as $meme):
    ?>
        <div class="mb-5">
            <div class="row d-flex justify-content-center small p-2 bg-dark text-light rounded-pill mb-2">
               <?=$meme['date']?>
            </div>
            <?php
                if(isset($_GET['admin'])){
                    ?>
                        <button id="deleteMem-btn" data-del="<?=$meme['id']?>" class="btn btn-danger mb-1">Удалить мем</button>
                    <?php
                }
            ?>
            <img class="img-fluid rounded mx-auto d-block" src="<?=$meme['url']?>" alt="mem">
            <div class="row d-flex justify-content-center fw-bold p-1">
                <button data-id="<?=$meme['id']?>" class="like-btn btn btn-info mt-2 fw-bold"><?=$meme['likes']?> <span><img style="width: 30px" src="ajax/elems/smiling.svg" alt=""></span></button>
            </div>
        <hr>
        </div>
    <?php
        endforeach;
    }else{
        echo '0';
    }
}
?>