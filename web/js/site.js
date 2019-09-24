$(function(){

    window.updateTodo = function(result) {

        $.ajax({
            url: '/todo',
            method: 'get',
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
            success: function(result){
                var $result = $('<ul>');
                for(var index in result) {
                    var data = result[index];
                    $result.append($('<li>').html('<input class="checkbox" type="checkbox" name="id[]" value="' + data.id + '"> <span>' + data.todo + '</span> <a class="delete-icon" href="/todo/' + data.id + '" data-ajax-method="delete" data-ajax-success="updateTodo" data-status-code="204">[X]</a>'));
                }
                $('.result ul').replaceWith($result);
            }
        });
    };
    window.updateTodo('test');

    $('form').submit(function(e){
        var $this = $(this);
        var action = $this.attr('action');
        var method = $this.attr('method');
        var success = $this.data('success');
        var statusCode = {};

        if($this.data('status-code'))
            statusCode[$this.data('status-code')] = window[success];
        e.preventDefault();

        $.ajax({
            url: action?action:location.url,
            method: method?method:'post',
            data: $this.serialize(),
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
            success: window[success],
            statusCode: statusCode
        });
    });

    $(document).on('click', 'a', function(e) {
        var $this = $(this);
        var action = $this.attr('href');
        var method = $this.data('ajax-method');
        var data = $this.data('ajax-data');
        var success = $this.data('ajax-success');
        var statusCode = {};

        if($this.data('status-code'))
        statusCode[$this.data('status-code')] = window[success];
        e.preventDefault();

        $.ajax({
            url: action?action:location.url,
            method: method?method:'post',
            data: data,
            Accept: "application/json; charset=utf-8",
            "Content-Type": "application/json; charset=utf-8",
            success: window[success],
            statusCode: statusCode

        });
    });

    $('[data-type-empty]').keyup(function(){
        var $this = $(this);
        var val = $this.val();
        if (!val) {
            $($this.data('type-empty')).removeClass('hide');
            $($this.data('typing')).addClass('hide');
        }
    });
    $('[data-typing]').keyup(function(){
        var $this = $(this);
        var val = $this.val();
        if (val) {
            var destination = $($this.data('typing'));
            destination.removeClass('hide');
            destination.html(destination.data('init') + val);
            $($this.data('type-empty')).addClass('hide');
        }
    });
});