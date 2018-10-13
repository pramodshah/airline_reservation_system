$(document).ready(function() {
    $(".btn-pref .btn").click(function () {
        $(".btn-pref .btn").removeClass("btn-primary").addClass("btn-default");
        // $(".tab").addClass("active"); // instead of this do the below 
        $(this).removeClass("btn-default").addClass("btn-primary");   
    });
    });
                .form-group.col-lg-6
                    input.form-control(name='', id='', value='', placeholder='From', type='text')
                .form-group.col-lg-6
                    input.form-control(name='', id='', value='', placeholder='To', type='text')
                