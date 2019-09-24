<?php

/* @var $this yii\web\View */

$this->title = 'Todo Application';
?>
<div class="site-index">

    <div class="body-content">

        <div class="row">
            <div class="col-lg-12">
                <div class="todos">
                    <div>
                        <form method="post" action="/todo" data-success="updateTodo" data-status-code="201">
                            <input class="textfield" name="todo" data-type-empty=".newtodo" data-typing=".typing">
                            <button type="submit">Add Todo</button>
                        </form>
                    </div>
                    <div class="newtodo"> Type in a new todo... </div>
                    <div class="hide typing" data-init=" Typing: "> Typing: </div>
                    <form class="result" method="delete" action="/todos" data-success="updateTodo">
                    <ul>
                    </ul>
                    <div class="mtop20">
                        <button type="submit" data-status-code="204">Delete Selected</button>
                    </div>
                    </form>
                </div>
            </div>
        </div>

    </div>
</div>
